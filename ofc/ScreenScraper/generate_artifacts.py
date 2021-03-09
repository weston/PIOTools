import sys 
import win32gui
import uuid
import json
import configs
from main import (
	get_pixel_color,
	get_hwnd_for_title,
	distance,
	resize_window,
)

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

OUTPUT_FILE = "artifacts.json"

COORDS = {
	"hero_main": configs.HERO,
	"hero_new": configs.HERO_NEW,
	"villain_left": configs.VILLAIN_LEFT,
	"villain_right": configs.VILLAIN_RIGHT,
}
"""
{
	"coordinates": [(0,0), (0,1), ...],
	"artifacts": {
		"2": [0, 1, 1, 1, 0, 1, 1, 0 ...],
		"3": [0, 1, 1, 1, 0, 1, 1, 0 ...],
	},
	python generate_artifacts.py hero_main 22 28
	python generate_artifacts.py hero_new 18 28
	python generate_artifacts.py villain_left 14 21
		We actually have to special case columns 1 and 3
		(zero indexed) since those have slightly different
		left borders.
	python generate_artifacts.py discard 12 18
}

Hero: Bottom 1, 2
	  Middle 0, 1, 2
	  top 1
      
"""
def main():
	hwnd = get_hwnd_for_title("BlueStacks")
	if not hwnd:
		print("It looks like BlueStacks is not open. Exiting.")
		return
	resize_window(hwnd)
	if "delete" in sys.argv[1:]:
		to_delete = sys.argv[2]
		f = open(OUTPUT_FILE, "r")
		data = json.loads(f.read())
		f.close()
		data.pop(to_delete, None)
		f = open(OUTPUT_FILE, "w")
		f.write(json.dumps(data))
		f.close()
		return
	_type, x_len, y_len = sys.argv[1:]
	x_len = int(x_len)
	y_len = int(y_len)
	keys = {"2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k", "a"}
	artifacts = {}
	parse_configs = COORDS[_type]
	while keys:
		card_ranks = input("remaining " + str(sorted(keys)) + ": ")
		for i, card_rank in enumerate(card_ranks.split(" ")):
			if card_rank == "." or card_rank not in keys:
				continue
			keys.remove(card_rank)
			parse_config = parse_configs[i]
			x_start = parse_config["x"]
			y_start = parse_config["y"]
			coordinates = []
			found = []
			
			for x in range(x_start, x_start + x_len, 1):
				for y in range(y_start, y_start + y_len, 1):
					rgb = get_pixel_color(hwnd, x, y)
					color = match_color(rgb)
					if color in [RED, BLUE, GREEN, BLACK]:
						found.append(1)
					else:
						found.append(0)
					coordinates.append([x - x_start, y - y_start])
			artifacts[card_rank] = found
	f = open(OUTPUT_FILE, "r")
	data = json.loads(f.read())
	key = str(uuid.uuid4())

	indices = []
	for i in range(len(artifacts["2"])):
		found_markings = set()
		for k in artifacts:
			found_markings.add(artifacts[k][i])
		if len(found_markings) > 1:
			indices.append(i)

	coordinates = filter_indices(coordinates, indices)
	filtered_artifacts = {}
	for k, v in artifacts.items():
		filtered_artifacts[k] = filter_indices(v, indices)
	data[key] = {
		"artifacts": filtered_artifacts,
		"coordinates": coordinates,
	}
	f.close()
	f = open(OUTPUT_FILE, "w")
	f.write(json.dumps(data))
	f.close()
	print(key)


def filter_indices(data, indices):
	new_data = []
	for index in indices:
		new_data.append(data[index])
	return new_data


def match_color(to_match):
	best_score = 2**50
	best_color = None

	for color in RGB_TO_SUIT.keys():
		difference = distance(color, to_match)
		if difference < best_score:
			best_score = difference
			best_color = color
	return best_color 


if __name__ == "__main__":
	main()