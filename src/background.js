console.log("It's working!")

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log("Ayyeeee");
  console.log(tabs[0]);
});