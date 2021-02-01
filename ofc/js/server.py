from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import time
import requests

hostName = "0.0.0.0"
serverPort = 80

# hostName = "localhost"
# serverPort = 8080


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
                else:
                    print(parts)
        base_path = self.path.split("&")[0]
        response = handle_request(params)
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(bytes(response, "utf-8"))


def handle_request(params):
    url = "https://www.playwarren.com/warren/hint"
    headers = {"Cookie": COOKIE}
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



























COOKIE = "_ga=GA1.2.1440491648.1612048748; _gid=GA1.2.560027675.1612048748; mf_user=2c81d291145ff4b32033a6c26d817464|; __stripe_mid=5a2e2b19-2af7-4ec6-8ccd-574939e66f3bade568; connect.sid=s%3A-n2_QWduO9CpSIVqLPaIh5hE.dBUNj7YNFPk67xRFgabqzga%2FRfwZmzNamumWTJRdbWQ; __stripe_sid=a7a6d050-b419-4937-be0a-906ecd550d9272710f; _gat=1; mp_adfb714ab6f21207b692330a45c90403_mixpanel=%7B%22distinct_id%22%3A%20%2260154cb09bc9e64248000002%22%2C%22%24device_id%22%3A%20%221775597caa440b-0fc441220d0e74-6815237c-13c680-1775597caa51cb%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22mp_name_tag%22%3A%20%22themysteriouswigglytuff%40gmail.com%22%2C%22%24user_id%22%3A%20%2260154cb09bc9e64248000002%22%2C%22acct_type%22%3A%20%222%22%7D; mf_e794db03-3553-48ea-ae9d-52b81146dd05=cfaa988636c56ee1a3cdbd276d90f120|0130137825456e915efb13e576116da5f5653f3d.47.1612076293379$013017592eae0d09fb83140600b1c06334618dcc.47.1612076297760$01303325928cbbc909e0a74431aaff01f73ab821.1667434677.1612076313370$01302752cbdc844b12595c9868cde04c6eafbb88.47.1612077507354$0130371398b76f9b01a6115c98f5ab671f46624e.1667434677.1612077517178|1612077523877||5|||1|17.31|48.83644"
if __name__ == "__main__":
    run_server()
