/* Popup Window */

$(function () {
  $("#popupwindow").load("popup.html");
});

$(document).mouseup(function (e) {
  let container = $("#popupwindow");

  // If the target of the click isn't the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.hide();
  }
});

/* Sidemenu with jQuery UI */

$(document).ready(function toggle() {
  $("#sidemenu-title").click(function () {
    let title = $("#sidemenu-title");

    $("#sidemenu-content").toggle("slide", { direction: "right" });

    title.toggleClass("expanded");

    if (title.hasClass("expanded")) {
      title.html("<h1>⮛ Explore the tales</h1>");
    } else {
      title.html("<h1>⮙ Explore the tales</h1>");
    }
  });
});

$(document).mouseup(function (e) {
  let sidemenu = $("#sidemenu");
  let content = $("#sidemenu-content");
  let title = $("#sidemenu-title");

  // If the target of the click isn't the container
  if (!sidemenu.is(e.target) && sidemenu.has(e.target).length === 0) {
    content.hide("slide", { direction: "right" });
    title.html("<h1>⮙ Explore the tales</h1>");
    title.removeClass("expanded");
  }
});

/* Chapters Page */
