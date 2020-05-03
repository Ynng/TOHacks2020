console.log("It's working!");
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log("Ayyeeee");
  console.log(tabs[0]);
});

chrome.storage.sync.set({ 'area': 'programmer' }, function () {
  console.log('Settings saved');
});

chrome.storage.sync.get(['area'], function (items) {
  console.log('Settings retrieved', items.area);
});