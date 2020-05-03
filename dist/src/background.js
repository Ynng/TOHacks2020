// console.log("It's working!");
// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//   console.log("Ayyeeee");
//   console.log(tabs[0]);
// });

chrome.storage.sync.get('area', function (items) {
  if(items['area'] == undefined){
    chrome.storage.sync.set({ 'area': 'programmer' }, function () {
      console.log('Settings saved');
    });
  }
});

chrome.storage.sync.get('strictness', function (items) {
  console.log(items['strictness'])
  if(items['strictness'] !== items['strictness'] || items['strictness'] == undefined){
    chrome.storage.sync.set({ 'strictness': 7 }, function () {
      console.log('Settings saved');
    });
  }
});