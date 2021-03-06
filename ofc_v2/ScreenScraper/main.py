import time
import win32gui
import sys
import json
import configs
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import requests


WINDOW_X = 0
WINDOW_Y = 0
WINDOW_WIDTH = 500		# This does nothing
WINDOW_HEIGHT = 1000
HOSTNAME = "localhost"
SERVER_PORT = 80

RED = (241, 24, 41)
BLUE = (23, 101, 203)
GREEN = (31, 152, 2)
BLACK = (51, 51, 51)
EMPTY = (39, 118, 80)
BACK = (198, 154, 77)
RGB_TO_SUIT = {
	RED: "h",
	BLUE: "d",
	GREEN: "c",
	BLACK: "s",
	EMPTY: "",
	BACK: "",
}


class Card(object):
	def __init__(self, hwnd, config):
		self.hwnd = hwnd
		self.x = config["x"]
		self.y = config["y"]
		self.parse_config = config["config"]
		self.type = config["type"]
		self.suit = None
		self.rank = None
		self.parse_suit()
		if self.suit:
			self.parse_rank()

	def parse_suit(self):
		if self.type == "hero_main":
			color_x = self.x + 11
			color_y = self.y + 40
		elif self.type == "villain_left" or self.type == "villain_right":
			# Villain cards are smaller, so we scale down
			color_x = self.x + 9
			color_y = self.y + 25
		elif self.type == "hero_new":
			color_x = self.x + 10
			color_y = self.y + 38
		elif self.type == "discard":
			color_x = self.x + 6
			color_y = self.y + 23
		r, g, b = get_pixel_color(self.hwnd, color_x, color_y)
		color = self._match_color((r, g, b))
		self.suit = RGB_TO_SUIT.get(color, "")

	def parse_rank(self):
		f = open("./artifacts.json", "r")
		configs = json.loads(f.read())
		f.close()
		config = configs[self.parse_config]
		found_artifacts = []
		dc = win32gui.GetWindowDC(self.hwnd)
		found = []
		for x_delta, y_delta in config["coordinates"]:
			x = self.x + x_delta
			y = self.y + y_delta
			rgb = get_pixel_color(self.hwnd, x, y, dc)
			color = self._match_color(rgb)
			if color in [RED, BLUE, GREEN, BLACK]:
				found.append(1)
			else:
				found.append(0)
		self.artifacts = found
		closest_match = None
		smallest_difference = 2**100
		for rank, artifact in config["artifacts"].items():
			difference = distance(found, artifact)
			if difference < smallest_difference:
				closest_match = rank
				smallest_difference = difference
		self.rank = closest_match

	def _match_color(self, to_match):
		best_score = 2**50
		best_color = None

		color_options = list(RGB_TO_SUIT.keys())
		for color in color_options:
			difference = distance(color, to_match)
			if difference < best_score:
				best_score = difference
				best_color = color
		return best_color

	def __str__(self):
		if not self.rank or not self.suit:
			return ""
		return "{}{}".format(self.rank, self.suit).capitalize()

	def dump(self):
		return {
			"card": str(self),
			"type": self.type,
		}


class MyServer(BaseHTTPRequestHandler):
	def do_GET(self):
		if "favicon.ico" in self.path:
			return
		response = json.dumps(handle_request())
		self.send_response(200)
		self.send_header("Access-Control-Allow-Origin", "*")
		self.end_headers()
		self.wfile.write(bytes(response, "utf-8"))


def main():
	if "test" in sys.argv[1:]:
		test()
		return
	if len(sys.argv) > 1:
		hwnd = get_hwnd_for_title("BlueStacks")
		for config in configs.ALL_CONFIGS:
			if config["type"] in sys.argv:
				print(Card(hwnd, config))
		return

	webServer = HTTPServer((HOSTNAME, SERVER_PORT), MyServer)
	print("Server started http://%s:%s" % (HOSTNAME, SERVER_PORT))
	hwnd = get_hwnd_for_title("BlueStacks")
	if not hwnd:
		return {
			"error": "Cannot find BlueStacks window",
		}
	resize_window(hwnd)
	try:
		webServer.serve_forever()
	except KeyboardInterrupt:
		pass

	webServer.server_close()
	print("Server stopped.")


def handle_request():
	hwnd = get_hwnd_for_title("BlueStacks")
	if not hwnd:
		return {
			"error": "Cannot find BlueStacks window",
		}
	resize_window(hwnd)
	response_data = []
	villain_cards = [Card(hwnd, c).dump() for c in configs.VILLAIN_LEFT]
	hero_cards = [Card(hwnd, c).dump() for c in configs.HERO]
	hero_new_cards = [Card(hwnd, c).dump() for c in configs.HERO_NEW]


	# pppoker has the behavior where the first set of new cards comes in on the bottom row.
	# instead of below the board like the rest of them
	hero_board_count = count_nonempty(hero_cards)
	hero_new_count = count_nonempty(hero_new_cards)
	if hero_new_count == 0 and hero_board_count == 5:
		hero_new_cards = []
		for card in hero_cards:
			if card["card"]:
				card["type"] = "hero_new"
				hero_new_cards.append(card)
		hero_cards = []
	response_data = villain_cards + hero_cards + hero_new_cards
	return response_data

def count_nonempty(card_dumps):
	count = 0
	for c in card_dumps:
		if c["card"]:
			count += 1
	return count

def distance(c1, c2):
	# Returns the difference between two vectors using 
	# pythagoras stuff. Omit square root because thats
	# unnecessary, since we care about relative distance.
	assert (len(c1) == len(c2))
	total = 0
	for i in range(len(c1)):
		component = c1[i] - c2[i]
		total += (component * component)
	return total


def test():
	while True:
		_, _, (x, y), = win32gui.GetCursorInfo()
		print(x, y)
		time.sleep(1)

def resize_window(hwnd):
	win32gui.MoveWindow(
		hwnd, WINDOW_X, WINDOW_Y, WINDOW_WIDTH, WINDOW_HEIGHT, 1)


def get_board(hwnd):
	print(get_pixel_color(hwnd, 100, 100))

def get_pixel_color(hwnd, x, y, window_dc=None):
	if window_dc == None:
		window_dc = win32gui.GetWindowDC(hwnd)
	long_colour = win32gui.GetPixel(window_dc, x, y)
	i_colour = int(long_colour)
	colors = {
		"r": (i_colour & 0xff), 
		"g": ((i_colour >> 8) & 0xff), 
		"b": ((i_colour >> 16) & 0xff),
	}
	return colors["r"], colors["g"], colors["b"]


def get_hwnd_for_title(title):
	for hwnd, window_title in get_open_windows().items():
		if title == window_title:
			return hwnd
	return None


def get_open_windows():
	hwnd_to_text = {}
	def handler(hwnd, _):
		if win32gui.IsWindowVisible(hwnd):
			hwnd_to_text[hwnd] = win32gui.GetWindowText(hwnd)
	win32gui.EnumWindows(handler, None)
	return hwnd_to_text

if __name__ == "__main__":
	main()
