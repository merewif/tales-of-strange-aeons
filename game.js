function fetchIntroJson() {
  fetch("./assets/elements/game-assets/chapter00.json")
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
      chapterSelection();
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
    fetchChapterJson("chapter01");
  });
}

function fetchChapterJson(chapter) {
  let urlConstructor = "./assets/elements/game-assets/" + chapter + ".json";
  fetch(urlConstructor)
    .then((response) => response.json())
    .then((data) => {
      displayChapter(data);
    });
}

function displayChapter(sentence) {
  let i = 0;
  $("#gametext").text(sentence[0]);

  $(document).on("click", "#game", function (e) {
    ++i;

    if (i >= sentence.length) {
      return;
    }

    if (typeof sentence[i] === "string" || sentence[i] instanceof String) {
      $("#gametext").css({ opacity: "0" });
      setTimeout(function () {
        $("#gametext").html(sentence[i]);
      }, 400);
      setTimeout(function () {
        $("#gametext").css({ opacity: "1" });
      }, 950);
    } else {
      const options = Object.values(sentence[i]);
      console.log(options);
      for (let i = 0; i < options.length; i++) {
        $("#gamebutton" + i).text(options[i]);
      }
    }
  });
}

function main() {
  fetchIntroJson();
}

window.addEventListener("load", main);
