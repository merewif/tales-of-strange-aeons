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
    padding: "0",
    top: "120px",
    height: "85vh",
    overflow: "scroll",
    "overflow-x": "hidden",
    width: "120px",
    "scrollbar-width": "none",
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
  $(".fullchapter").not("#prologue").slideUp("slow");
  //Open this
  $("#chapter0-card").addClass("active-chapter");
  $("#prologue").slideDown("slow");
});

// Chapter 1
$(document).on("click", "#chapter1-card", function (e) {
  //Close others
  $(".chapter").not("#chapter1-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-1").slideUp("slow");

  //Open this
  $("#chapter1-card").addClass("active-chapter");
  $("#chapter-1").slideDown("slow");
});

// Chapter 2
$(document).on("click", "#chapter2-card", function (e) {
  //Close others
  $(".chapter").not("#chapter2-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-2").slideUp("slow");

  //Open this
  $("#chapter2-card").addClass("active-chapter");
  $("#chapter-2").slideDown("slow");
});

// Chapter 3
$(document).on("click", "#chapter3-card", function (e) {
  //Close others
  $(".chapter").not("#chapter3-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-3").slideUp("slow");

  //Open this
  $("#chapter3-card").addClass("active-chapter");
  $("#chapter-3").slideDown("slow");
});

// Chapter 4
$(document).on("click", "#chapter4-card", function (e) {
  //Close others
  $(".chapter").not("#chapter4-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-4").slideUp("slow");

  //Open this
  $("#chapter4-card").addClass("active-chapter");
  $("#chapter-4").slideDown("slow");
});

// Chapter 5
$(document).on("click", "#chapter5-card", function (e) {
  //Close others
  $(".chapter").not("#chapter5-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-5").slideUp("slow");

  //Open this
  $("#chapter5-card").addClass("active-chapter");
  $("#chapter-5").slideDown("slow");
});

// Chapter 6
$(document).on("click", "#chapter6-card", function (e) {
  //Close others
  $(".chapter").not("#chapter6-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-6").slideUp("slow");

  //Open this
  $("#chapter6-card").addClass("active-chapter");
  $("#chapter-6").slideDown("slow");
});

// Chapter 7
$(document).on("click", "#chapter7-card", function (e) {
  //Close others
  $(".chapter").not("#chapter7-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-7").slideUp("slow");

  //Open this
  $("#chapter7-card").addClass("active-chapter");
  $("#chapter-7").slideDown("slow");
});

// Chapter 8
$(document).on("click", "#chapter8-card", function (e) {
  //Close others
  $(".chapter").not("#chapter8-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-8").slideUp("slow");

  //Open this
  $("#chapter8-card").addClass("active-chapter");
  $("#chapter-8").slideDown("slow");
});

// Chapter 9
$(document).on("click", "#chapter9-card", function (e) {
  //Close others
  $(".chapter").not("#chapter9-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-9").slideUp("slow");

  //Open this
  $("#chapter9-card").addClass("active-chapter");
  $("#chapter-9").slideDown("slow");
});

// Chapter 10
$(document).on("click", "#chapter10-card", function (e) {
  //Close others
  $(".chapter").not("#chapter10-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-10").slideUp("slow");

  //Open this
  $("#chapter10-card").addClass("active-chapter");
  $("#chapter-10").slideDown("slow");
});

// Chapter 11
$(document).on("click", "#chapter11-card", function (e) {
  //Close others
  $(".chapter").not("#chapter11-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-11").slideUp("slow");

  //Open this
  $("#chapter11-card").addClass("active-chapter");
  $("#chapter-11").slideDown("slow");
});

// Chapter 12
$(document).on("click", "#chapter12-card", function (e) {
  //Close others
  $(".chapter").not("#chapter12-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-12").slideUp("slow");

  //Open this
  $("#chapter12-card").addClass("active-chapter");
  $("#chapter-12").slideDown("slow");
});

// Chapter 13
$(document).on("click", "#chapter13-card", function (e) {
  //Close others
  $(".chapter").not("#chapter13-card").removeClass("active-chapter");
  $(".fullchapter").not("#chapter-13").slideUp("slow");

  //Open this
  $("#chapter13-card").addClass("active-chapter");
  $("#chapter-13").slideDown("slow");
});

// Epilogue
$(document).on("click", "#epilogue-card", function (e) {
  //Close others
  $(".chapter").not("#epilogue-card").removeClass("active-chapter");
  $(".fullchapter").not("#epilogue").slideUp("slow");

  //Open this
  $("#epilogue-card").addClass("active-chapter");
  $("#epilogue").slideDown("slow");
});
