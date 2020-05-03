
const HIGH_CONFIDENCE_THRESHOLD = 0.5;
const LOW_CONFIDENCE_THRESHOLD = 0.1;

console.log(document.title)

title = document.title;
title = title.replace(" ","%20");

chrome.storage.sync.get(['area'], function(items) {
    fetch('http://192.168.1.3/?area=' + items.area + '&title='+title).then(r => r.text()).then(result => {
        console.log(Number(result))
    })
});