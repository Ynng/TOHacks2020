
const HIGH_CONFIDENCE_THRESHOLD = 0.5;
const LOW_CONFIDENCE_THRESHOLD = 0.1;

console.log(document.title)


setTimeout(() => {
    title = document.title;
    title = title.replace(" ","%20");

    chrome.storage.sync.get(['area'], function(items) {
        fetch('http://104.198.76.79/?area=' + items.area + '&title='+title).then(r => r.text()).then(result => {
            console.log(Number(result))
            var iDiv = document.createElement('div');
            iDiv.id = 'block';
            iDiv.className = 'block';
            iDiv.innerHTML = result;
            document.getElementsByTagName('body')[0].appendChild(iDiv);
            iDiv.style.cssText = "position: fixed; top: 0px; background-color: #fff; color: #000; z-index: 100000; margin: 50px; font-size: 20px;"
        })
    });
}, 1000);

