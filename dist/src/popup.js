

document.body.onload = function () {

  chrome.storage.sync.get('area', function (items) {
    document.getElementById("area").value = items["area"];
  });

}


$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    save();
  });
});

String.prototype.replaceAll = function (toReplace, replaceWith) {
  return this.split(toReplace).join(replaceWith);
}

var temp = 0;

function save() {
  console.log("saved")
  if (document.getElementById("area").value != "") {
    chrome.storage.sync.set({ 'area': document.getElementById("area").value }, function () {
      console.log("saved: ".concat(document.getElementById("area").value));
    });
  }

  chrome.storage.sync.set({ 'strictness': Number(document.querySelector('input[name="strictness"]:checked').value) }, function () {
    console.log('Settings saved');
  });
  
  document.getElementById("saved-tooltip").style.opacity = "1";
  temp++;
  setTimeout(function () {
    temp--;
    if (temp == 0)
      document.getElementById("saved-tooltip").style.opacity = "0";
  }, 1000);
};


chrome.storage.sync.get('strictness', function (items) {
  switch (items["strictness"]) {
    case 7:
      document.getElementById("normal").checked = true;
      break;
    case 8:
      document.getElementById("relaxed").checked = true;
      break;
    case 6:
      document.getElementById("strict").checked = true;
      break;
  }
});