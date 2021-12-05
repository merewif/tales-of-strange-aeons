/* Popup Window */

$(function(){
    $("#popupwindow").load("/elements/popup.html"); 
});

  $(document).mouseup(function(e) {
    var container = $("#popupwindow");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

/* Sidemenu */

let menuTitle = document.getElementById("sidemenu-title");

function menuToggle() {

    let menuContent = document.getElementById("sidemenu-content");
    if (menuContent.style.display == "none") {
        menuContent.style.display = "block";
      } else {
        menuContent.style.display = "none";
      }
}

document.addEventListener("click", menuToggle);