from absl import logging

import tensorflow as tf

import tensorflow_hub as hub
import matplotlib.pyplot as plt
import numpy as np
import os
import pandas as pd
import re
import seaborn as sns

module_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
model = hub.load(module_url)
print("module %s loaded" % module_url)

def similarity(message1, message2):
  message_embeddings_ = model([message1,message2])
  return np.inner(message_embeddings_, message_embeddings_)[0][1]

print(similarity("programmer", "learn python in one hour"))
print(similarity("anime", "weeb"))
print(similarity("school", "beating minecraft with a steering wheel"))




