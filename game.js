function fetchIntroJson() {
  fetch("./assets/elements/game-assets/intro.json")
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
  $(document).on("click", ".released", function () {
    let clickedChapterId = this.id.toString();
    $("#intro").css({ display: "none" });
    $("#game").css({ opacity: "1" });
    fetchChapterJson(clickedChapterId);
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
    if ($("#gamebutton1").text() !== "") {
      console.log("Awaiting user response.");
      return;
    }

    ++i;

    if (i >= sentence.length) {
      return;
    }

    if (typeof sentence[i] === "string" || sentence[i] instanceof String) {
      $("#gametext").html(sentence[i]);
    } else {
      const optionsObject = Object.values(sentence[i]);
      for (let i = 0; i < optionsObject.length; i++) {
        $("#gamebutton" + i).text(optionsObject[i][0]);
      }

      $(document).on("click", "#gamebutton0", function () {
        console.log(optionsObject[0][1]);
        $("#gametext").html(sentence[i + optionsObject[0][1]]);
        i = i + optionsObject[0][1];
        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });
      $(document).on("click", "#gamebutton1", function () {
        console.log(i + optionsObject[1][1]);
        $("#gametext").html(sentence[i + optionsObject[1][1]]);
        i = i + optionsObject[1][1];
        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });
      $(document).on("click", "#gamebutton2", function () {
        $("#gametext").html(sentence[i + optionsObject[2][1]]);
        i = i + optionsObject[2][1];
        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });
      $(document).on("click", "#gamebutton3", function () {
        $("#gametext").html(sentence[i + optionsObject[3][1]]);
        i = i + optionsObject[3][1];
        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });
    }
  });
}

function main() {
  fetchIntroJson();
}

window.addEventListener("load", main);
