/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import 'babel-polyfill';
import * as tf from '@tensorflow/tfjs';

// Where to load the model from.
const MOBILENET_MODEL_TFHUB_URL =
    'https://tfhub.dev/google/universal-sentence-encoder/4'

/**
 * Async loads a mobilenet on construction.  Subsequently handles
 * requests to classify images through the .analyzeImage API.
 * Successful requests will post a chrome message with
 * 'IMAGE_CLICK_PROCESSED' action, which the content.js can
 * hear and use to manipulate the DOM.
 */
class WebClassifier {
  constructor() {
    this.loadModel();
  }

  /**
   * Loads mobilenet from URL and keeps a reference to it in the object.
   */
  async loadModel() {
    console.log('Loading model...');
    const startTime = performance.now();
    // try {
      this.model =
          await tf.loadModel(MOBILENET_MODEL_TFHUB_URL, {fromTFHub: true});
      // Warms up the model by causing intermediate tensor values
      // to be built and pushed to GPU.
      tf.tidy(() => {
        const loadModeLTemp = this.model.predict(["programmer"]);
      });
      console.log(loadModeLTemp)
      const totalTime = Math.floor(performance.now() - startTime);
      console.log(`testing`)
      console.log(`Model loaded and initialized in ${totalTime} ms... Testing`);
    // } catch {
    //   console.error(
    //       `Unable to load model from URL: ${MOBILENET_MODEL_TFHUB_URL}`);
    // }
  }

  async predict(msg1, msg2) {
    console.log('Predicting...');
    // The first start time includes the time it takes to extract the image
    // from the HTML and preprocess it, in additon to the predict() call.
    const startTime1 = performance.now();
    // The second start time excludes the extraction and preprocessing and
    // includes only the predict() call.
    let startTime2;
    const logits = tf.tidy(() => {
      startTime2 = performance.now();
      const output = this.model.predict([msg1,msg2]);
    });

    // Convert logits to probabilities and class names.

    const totalTime1 = performance.now() - startTime1;
    const totalTime2 = performance.now() - startTime2;
    console.log(
        `Done in ${totalTime1.toFixed(1)} ms ` +
        `(not including preprocessing: ${Math.floor(totalTime2)} ms)`);
    return output;
  }
}

const classifier = new WebClassifier();
