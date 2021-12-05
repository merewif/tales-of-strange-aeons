/* Popup Window */

$(function(){
    $("#popupwindow").load("popup.html"); 
});

  $(document).mouseup(function(e) {
    var container = $("#popupwindow");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

/* Sidemenu */
function menuToggle() {
    let menuContent = document.getElementById("sidemenu-content");
    if (menuContent.style.display == "block") {
        menuContent.style.display = "none";
      } else {
        menuContent.style.display = "block";
      }      
}

