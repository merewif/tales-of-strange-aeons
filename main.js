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

// Change position to side on click
$(document).on("click", ".chapter", function (event) {
  let chapterCard = $(".chapter");
  let chapterList = $("#chapterlist");
  let chapterText = $(".chaptertext");

  chapterList.css({
    "grid-template-columns": "1fr",
    position: "absolute",
    left: "10px",
    "padding-left": "0",
    "padding-top": "120px",
    width: "120px",
  });

  chapterCard.css({
    width: "120px",
    height: "120px",
  });

  chapterText.css({
    "font-size": "7px",
  });
});

// Chapter 0
$(document).on("click", "#chapter0-card", function (e) {
  //Close others
  $(".chapter").not("#chapter0-card").removeClass("active-chapter");
  $(".fullchapter").not("#prologue").hide("fade", "fast");

  //Open this
  $("#chapter0-card").addClass("active-chapter");
  $("#prologue").show("fade", "slow");
});

// Chapter 1
$(document).on("click", "#chapter1-card", function (e) {
  //Close others
  $(".chapter").not("#chapter1-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-1").hide("fade", "fast");

  //Open this
  $("#chapter1-card").addClass("active-chapter");
  $("#chapter-1").show("fade", "slow");
});
