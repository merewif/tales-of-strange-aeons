/* Header, Background load */

function essentials() {
  let header = document.createElement("header");
  $(function () {
    $("header").load("./assets/elements/header.html");
  });

  let popup = document.createElement("div");
  popup.id = "popupwindow";

  let background = document.createElement("div");
  background.id = "bg-image";

  document.body.prepend(header, background);
}

window.addEventListener("load", essentials);

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

$(document).on("click", ".chapter", function (e) {
  // Title cards
  $(".chapter").not(this).removeClass("active-chapter");
  $(this).addClass("active-chapter");
  let id = $(this).attr("id");
  let idHTML = "./assets/books/beyond-mortal/" + id + ".html";

  //Close chapter div
  $("#chapter-open").slideUp("slow");

  //Fill and reopen
  setTimeout(function () {
    $("#chapter-open").load(idHTML).slideDown("slow");
  }, 500);
});

/* Book Cover Browser */

$(document).ready(function () {
  $("#blurb-container").load("./assets/blurbs/book1-blurb.html");
});

$(document).on("click", ".booktitle", function (e) {
  let id = this.id;
  let activeImg = $("#cover-image-1").attr("src");

  $(".booktitle").not(this).removeClass("active-title");
  $(this).addClass("active-title");

  $("#blurb").hide("slide");
  $("#section1-images").delay(250).hide("fade", "fast");

  setTimeout(function () {
    $(".cover-image").attr("src", "./assets/covers/" + id + ".jpg");
    $("#blurb-container").load("./assets/blurbs/" + id + "-blurb.html");
  }, 400);

  $("#section1-images").show("fade");
  $("#blurb").delay(250).show("slide");
});

/* Footer */

//Create 3 styled footer column divs

$(function () {
  let footer = document.createElement("footer");
  document.body.appendChild(footer);

  $("footer").load("./assets/elements/footer.html");
});

/* Blogroll */

function loadBlogposts() {
  fetch("blogposts.json")
    .then((r) => r.json())
    .then(displayBlogposts);
}

function displayBlogposts(posts) {
  for (let i = 0; i < posts.length; i++) {
    displayBlogpost(posts[i]);
  }
}

function displayBlogpost(post) {
  let link = document.createElement("a");
  link.href = post.link;
  link.target = "_blank";

  let title = document.createElement("h1");
  title.className = "postname";
  title.innerText = post.title.cdataSection;

  let subtitle = document.createElement("h2");
  subtitle.className = "subtitle";
  subtitle.innerText = post.description.cdataSection;

  let box = document.createElement("div");
  box.className = "blogcard";

  box.append(title, subtitle);
  link.append(box);

  document.getElementById("blog").append(link);
}

window.addEventListener("load", loadBlogposts);
