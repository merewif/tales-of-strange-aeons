// Function that loads the exposition lines.
function fetchIntroJson() {
  fetch("./assets/elements/game-assets/intro.json")
    .then((response) => response.json())
    .then((data) => {
      displayIntro(data);
    });
}

// Function that displays the intro & main menu
function displayIntro(chapterSentences) {
  // Line display tracker
  let i = 0;
  $("#introtext").text(chapterSentences[0]);

  $(document).on("click keydown", "body", function (e) {
    if (e.keyCode !== 13 && event.type !== "click") {
      // 13 az enter, ha nem az, akkor semmit ne csináljon
      return false;
    }
    // Incrementing the tracker with each click
    ++i;

    // Loading the main menu after the intro ends
    if (i >= chapterSentences.length) {
      $("#introtext").css({ display: "none" });
      $("#intro").css({
        "background-image": "url(./assets/covers/book1transparent.png)",
      });
      $("#visualchapternav").css({ display: "block" });
      chapterSelection();
      return;
    }

    // Loading the next line on click with style
    $("#introtext").css({ opacity: "0" });
    setTimeout(function () {
      $("#introtext").html(chapterSentences[i]);
    }, 400);
    setTimeout(function () {
      $("#introtext").css({ opacity: "1" });
    }, 950);
  });
}

// Function that hides the menu and loads the game interface
function chapterSelection() {
  $(document).on("click", ".released", function () {
    let clickedChapterId = this.id.toString();
    $("#intro").css({ display: "none" });
    $("#game").css({ opacity: "1" });
    fetchChapterJson(clickedChapterId);
  });
}

// Function that loads the chapter the user clicked on into the game
function fetchChapterJson(chapter) {
  let urlConstructor = "./assets/elements/game-assets/" + chapter + ".json";
  fetch(urlConstructor)
    .then((response) => response.json())
    .then((data) => {
      displayChapter(data);
    });
}

// The visual novel function
function displayChapter(chapterJson) {
  // Variable to track the current line
  let currentLine = 0;

  // Loading the initial line of text
  $("#gametext").text(chapterJson[0]);

  // Click to load the next line of text
  $(document).on("click", "#gametext", function (e) {
    // Halting the narration until the user chooses an option
    if ($("#gamebutton1").text() !== "") {
      console.log("Awaiting user response.");
      return;
    }

    // Tracker incrementation
    ++currentLine;

    // Stops trying to load the next line if tracker reaches the length of the array
    if (currentLine >= chapterJson.length) {
      return;
    }

    // If the next item of array is a string it is loaded into the textbox
    if (
      typeof chapterJson[currentLine] === "string" ||
      chapterJson[currentLine] instanceof String
    ) {
      $("#gametext").html(chapterJson[currentLine]);
    } else {
      // If the next item of array is an object it loads the value text into the buttons
      let optionsObject = Object.values(chapterJson[currentLine]);
      for (let i = 0; i < optionsObject.length; i++) {
        $("#gamebutton" + i).text(optionsObject[i][0]);
      }

      // Handling user choice

      // Option Button 1
      $(document).on("click", "#gamebutton0", function (event) {
        event.stopPropagation();
        let stepCounter = optionsObject[0][1];
        console.log(
          "Before: " +
            "Current line index: " +
            currentLine +
            ", How many lines to skip: " +
            stepCounter
        );

        // Bug happens here
        $("#gametext").html(chapterJson[currentLine + stepCounter]);
        currentLine = currentLine + stepCounter;

        console.log(
          "After: " +
            "Current line index: " +
            currentLine +
            ", How many lines to skip: " +
            stepCounter
        );

        // Removing all button text
        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });

      // Option Button 2
      $("#gamebutton1");
      $(document).on("click", "#gamebutton1", function (event) {
        event.stopPropagation();
        let stepCounter = optionsObject[1][1];

        console.log(
          "Before: " +
            "Current line index: " +
            currentLine +
            ", How many lines to skip: " +
            stepCounter
        );

        // Bug happens here
        $("#gametext").html(chapterJson[currentLine + stepCounter]);
        currentLine = currentLine + stepCounter;

        // Get the array index of gametext content and set it as the new index for the text display
        /* const findTextIndex = (element) =>
          element === chapterJson[currentLine + stepCounter];
        currentLine = chapterJson.findIndex(findTextIndex); */

        console.log(
          "After: " +
            "Current line index: " +
            currentLine +
            ", How many lines to skip: " +
            stepCounter
        );

        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });

      // Option Button 3
      $(document).on("click", "#gamebutton2", function (event) {
        event.stopPropagation();
        $("#gametext").html(chapterJson[currentLine + optionsObject[2][1]]);
        currentLine = currentLine + optionsObject[2][1];

        for (let i = 0; i < 3; i++) {
          $("#gamebutton" + i).text("");
        }
      });

      // Option Button 4
      $(document).on("click", "#gamebutton3", function (event) {
        event.stopPropagation();
        $("#gametext").html(chapterJson[currentLine + optionsObject[3][1]]);
        currentLine = currentLine + optionsObject[3][1];

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
