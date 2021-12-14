/* Popup Window */

$(function () {
  $("#popupwindow").load("./assets/elements/popup.html");
});

$(document).mouseup(function (e) {
  let container = $("#popupwindow");

  // If the target of the click isn't the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});

$(document).on("click", "#leave-site", function (e) {
  history.back();
});

$(document).on("click", "#enter-site", function (e) {
  let container = $("#popupwindow");
  container.hide();
  document.cookie = "popup=accepted; path=/";
});

/* Popup load */

function popup() {
  let popup = document.createElement("div");
  popup.id = "popupwindow";

  document.body.prepend(popup);
}

window.addEventListener("load", popup);
