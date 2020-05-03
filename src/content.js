const HIGH_CONFIDENCE_THRESHOLD = 0.5;
const LOW_CONFIDENCE_THRESHOLD = 0.1;

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log("Ayyeeee");
  console.log(tabs[0]);
});