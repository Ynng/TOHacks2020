

document.body.onload = function () {

  chrome.storage.sync.get('area', function (items) {
    document.getElementById("area").placeholder = "Saved: ".concat(items["area"]);
  });

}


$(document).ready(function () {
  $('form').on('submit', function(e) {
      e.preventDefault();
      save();
  });
});

var temp = 0;

function save(){
  console.log("saved")
  chrome.storage.sync.set({ 'area': document.getElementById("area").value }, function () {
    console.log("saved: ".concat(document.getElementById("area").value));
    document.getElementById("area").placeholder = "Saved: ".concat(document.getElementById("area").value);
    document.getElementById("area").value = "";

    document.getElementById("saved-tooltip").style.opacity = "1";
    temp++;
    setTimeout(function(){
      temp--;
      if(temp==0)
        document.getElementById("saved-tooltip").style.opacity = "0";
    }, 1000);
  });
};