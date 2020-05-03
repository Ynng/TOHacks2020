from absl import logging

from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse
import time
import tensorflow as tf

import tensorflow_hub as hub
import numpy as np

hostName = "localhost"
hostPort = 9000


module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(module_url)
print("module %s loaded" % module_url)

def similarity(message1, message2):
  message_embeddings_ = model([message1,message2])
  return np.inner(message_embeddings_, message_embeddings_)[0][1]


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        result = 0

        try:
          query_components = dict(qc.split("=") for qc in query.split("&"))
          valid = True
          title = query_components["title"].replace("%20", " ")
          area = query_components["area"].replace("%20", " ")
          result = similarity(area, title)
          print("title = ", title)
          print("area = ", title)
        except:
          print("Invalid request")

        # query_components = { "imsi" : "Hello" }
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(bytes("{\"similarity\":", "utf-8"))
        self.wfile.write(bytes(str(result), "utf-8"))
        self.wfile.write(bytes("}", "utf-8"))


myServer = HTTPServer((hostName, hostPort), MyServer)
print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))