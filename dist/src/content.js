
const HIGH_CONFIDENCE_THRESHOLD = 0.5;
const LOW_CONFIDENCE_THRESHOLD = 0.1;

var currentTitle = "there's no way a website's gonna have this as their title right";

var iDiv = document.createElement('div');
iDiv.id = 'block';
iDiv.className = 'block';
document.getElementsByTagName('body')[0].appendChild(iDiv);
iDiv.style.cssText = "position: fixed; top: 0px; background-color: rgba(0,0,0,0); color: #000; z-index: 100000; font-size: 20px; height: 100%; width: 100%; pointer-events: none;";


String.prototype.replaceAll = function (toReplace, replaceWith)
{
    return this.split(toReplace).join(replaceWith);
}

// listen for changes
setInterval(function()
{
    if(currentTitle != document.title){
        currentTitle = document.title;
        title = document.title;
        title = title.replace("Amazon.ca : ", "")
        title = title.replace(" - Youtube", "")

        title = title.replace(/[^a-zA-Z ]/g, "").replaceAll(" ", "%20");
        console.log(title)

        chrome.storage.sync.get('area', function(items) {
            var area = items.area;
            chrome.storage.sync.get('strictness', function(items) {
                fetch('http://35.222.34.192/?area=' + area + '&title='+title).then(r => r.text()).then(result => {
                    console.log(Number(result))
    
                    distractionValue = 1-(Number(result)*items['strictness'])
                    iDiv.innerHTML = ((1-distractionValue)*100).toFixed(0).concat("% \"").concat(area).concat("\" Related");
                    
                    iDiv.style["background-color"] = "rgba(255,255,255,".concat(String(distractionValue));
                    console.log(distractionValue)
                })
            });
        });
    }
}, 1000);




