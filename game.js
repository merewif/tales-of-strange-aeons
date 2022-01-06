function fetchIntroJson() {
  fetch("/assets/elements/game-assets/chapter00.json")
    .then((response) => response.json())
    .then((data) => {
      displayIntro(data);
    });
}

function displayIntro(chapterSentences) {
  let i = 0;
  $("#introtext").text(chapterSentences[0]);

  $(document).on("click", "body", function (e) {
    ++i;

    if (i >= chapterSentences.length) {
      $("#introtext").css({ display: "none" });
      $("#intro").css({
        "background-image": "url(./assets/covers/book1transparent.png)",
      });
      $("#visualchapternav").css({ display: "block" });
      return;
    }

    $("#introtext").css({ opacity: "0" });

    setTimeout(function () {
      $("#introtext").html(chapterSentences[i]);
    }, 400);

    setTimeout(function () {
      $("#introtext").css({ opacity: "1" });
    }, 950);
  });
}

function chapterSelection() {
  $(document).on("click", "#visualchapternav", function () {
    $("#intro").css({ display: "none" });
    $("#game").css({ opacity: "1" });
  });
}

function fetchChapterJson(chapter) {
  let urlConstructor = "/assets/elements/game-assets/" + chapter + ".json";
  fetch(urlConstructor)
    .then((response) => response.json())
    .then((data) => {
      displayChapter(data);
    });
}

function main() {
  fetchIntroJson();
  chapterSelection();
}

window.addEventListener("load", main);
