// global state trackers
let currentLineIndex = 0; // Variable to track the current line
let chapterJson = {};

// Function that loads the exposition lines.
function fetchIntroJson() {
  fetch("./assets/elements/game-assets/intro.json")
    .then((response) => response.json())
    .then((data) => {
      displayIntro(data);
    });
}

// Function that displays the intro & main menu
function displayIntro(introJson) {
  // Line display tracker
  let currentLine = 0;

  $("#introtext").text(introJson[0]);

  $(document).on("click keydown", "body", function (e) {
    // 13 is enter, if not that's the keydown it does nothing
    if (e.keyCode !== 13 && e.type !== "click") {
      return false;
    }
    // Incrementing the tracker with each click
    ++currentLine;

    // Loading the main menu after the intro ends
    if (currentLine >= introJson.length) {
      $("#introtext").css({ display: "none" });
      $("#intro").css({
        "background-image": "url(./assets/covers/book1transparent.png)",
      });
      $("#visualchapternav").css({ display: "block" });
      return;
    }

    // Loading the next line on click with style
    $("#introtext").css({ opacity: "0" });
    setTimeout(function () {
      $("#introtext").html(introJson[currentLine]);
    }, 400);
    setTimeout(function () {
      $("#introtext").css({ opacity: "1" });
    }, 950);
  });
}

// Clicking on a released chapter's div will trigger fetching it as json
$(document).on("click", ".released", function () {
  let clickedChapterId = this.id.toString();

  $("#intro").css({ display: "none" });
  $("#game").css({ opacity: "1" });

  fetchChapterJson(clickedChapterId);
});

// Function that loads the chapter the user clicked on into the game
function fetchChapterJson(chapter) {
  let urlConstructor = "./assets/elements/game-assets/" + chapter + ".json";
  fetch(urlConstructor)
    .then((response) => response.json())
    .then((data) => {
      chapterJson = data;

      // Initially hiding choice buttons, displayChapterLine shows them if needed
      $(".gamebutton").hide();

      // Loading the initial line of text
      displayChapterLine();
    });
}

// Click to load the next line of text
$(document).on("click", "#gametext", function (e) {
  displayChapterLine();
});

function displayChapterLine() {
  // Stops trying to load the next line if tracker reaches the length of the array
  if (currentLineIndex >= chapterJson.length) {
    return;
  }

  // Halting the narration until the user chooses an option
  if ($(".gamebutton").is(":visible")) {
    console.log("Awaiting user response.");
    return;
  }

  // If the next item of the chapter list is not a string
  if (
    !(
      typeof chapterJson[currentLineIndex] === "string" ||
      chapterJson[currentLineIndex] instanceof String
    )
  ) {
    // If the object has only one property, set the url of its value as background
    if (Object.values(chapterJson[currentLineIndex]).length == 1) {
      let imgUrl = Object.values(chapterJson[currentLineIndex])[0][0];
      document.getElementById("gamebox").style.backgroundImage =
        "url(" + imgUrl + ")";
      ++currentLineIndex;
    } else {
      // display option buttons
      let optionsObject = Object.values(chapterJson[currentLineIndex]);
      for (let i = 0; i < optionsObject.length; i++) {
        let evokedButton = $("#gamebuttons").children(
          ":nth-child(" + (i + 1) + ")"
        );
        evokedButton.show();
        evokedButton.text(optionsObject[i][0]);
      }

      $("#gametext").html(chapterJson[currentLineIndex - 1]);
    }
  } else {
    // show line in textbox
    $("#gametext").html(chapterJson[currentLineIndex]);

    // Tracker incrementation
    ++currentLineIndex;
  }
}

// Handling user choice
$(document).on("click", ".gamebutton", function (event) {
  event.stopPropagation();

  let optionsObject = Object.values(chapterJson[currentLineIndex]);
  let buttonNum = $(this).parent().children().index($(this));
  let linesToSkip = optionsObject[buttonNum][1];

  currentLineIndex += linesToSkip;

  // Tracker incrementation
  ++currentLineIndex;

  $(".gamebutton").hide();
  displayChapterLine();
});

function main() {
  fetchIntroJson();
}

window.addEventListener("load", main);
