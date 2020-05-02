from absl import logging

import tensorflow as tf

import tensorflow_hub as hub
import numpy as np

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(module_url)
print("module %s loaded" % module_url)

def similarity(message1, message2):
  message_embeddings_ = model([message1,message2])
  return np.inner(message_embeddings_, message_embeddings_)[0][1]

while True:
  msg1 = input("Enter String 1:")
  msg2 = input("Enter String 2:")
  print("Similarity: ", similarity(msg1, msg2))




