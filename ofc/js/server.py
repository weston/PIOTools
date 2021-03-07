from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import time
import requests
import json

hostName = "localhost"
serverPort = 80
COOKIE_FILEPATH = "/home/ec2-user/cookie.txt"
PASSWORD_FILEPATH = "/home/ec2-user/passwords.txt"


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if "favicon.ico" in self.path:
            return
        params = {}
        if len(self.path.split("?")) > 1:
            params_string = self.path.split("?")[1]
            params_components = params_string.split("&")
            for component in params_components:
                parts = component.split("=")
                if len(parts) == 2:
                    params[parts[0]] = parts[1]
        base_path = self.path.split("&")[0]
        access_key = params.get("access_key")
        if not access_key or access_key not in get_passwords():
            response = json.dumps({"error": "Not authenticated"})
        else:
            response = handle_request(params)
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))


def handle_request(params):
    url = "https://www.playwarren.com/warren/hint"
    headers = {"Cookie": get_cookie()}
    return requests.get(
        url, headers=headers, params=params).text


def run_server():
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")


def get_cookie():
    f = open(COOKIE_FILEPATH, "r")
    cookie = f.read()
    f.close()
    return cookie.strip()


def get_passwords():
    f = open(PASSWORD_FILEPATH, "r")
    passwords = f.readlines()
    f.close()
    return [p.strip() for p in passwords]


if __name__ == "__main__":
    run_server()
