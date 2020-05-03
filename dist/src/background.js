console.log("It's working!");
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  console.log("Ayyeeee");
  console.log(tabs[0]);
});


// Save it using the Chrome extension storage API.
chrome.storage.sync.set({ 'area': 'programmer' }, function () {
  console.log('Settings saved');
});

// Read it using the storage API
chrome.storage.sync.get(['area'], function (items) {
  console.log('Settings retrieved', items.area);
});