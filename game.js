// Global variables
let currentLineIndex = 0; // Variable to track the current line
let chapterJson = {};

// Sounds
let audioIntroSound = new Audio("./assets/elements/game-assets/intromusic.mp3");
audioIntroSound.loop = true;

let menuItemHoverSound = new Audio(
  "./assets/elements/game-assets/menuhover.wav"
);
menuItemHoverSound.volume = 1;

let chapterHoverSound = new Audio(
  "./assets/elements/game-assets/chapterclick.wav"
);
chapterHoverSound.volume = 0.1;

let backgroundMusic = "";
backgroundMusic.volume = 0.6;

let soundEffect = "";

// Game saves
let saveState = {};

// Click on play button
$(document).on("click", "#start", function (e) {
  $("#bg-image").hide();
  $("#game").show();
  $("#headerlogo").show();
  $("#intro").css({ opacity: "1" });
  $("#start").hide();
  fetchIntroJson();
});

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
  audioIntroSound.play();

  // Line display tracker
  let currentLine = 0;

  $("#introtext").html(introJson[0]);

  $(document).on("click keydown", "body", function (e) {
    // 13 is enter, if not that's the keydown it does nothing
    if (e.keyCode !== 13 && e.type !== "click") {
      return false;
    }
    // Incrementing the tracker with each click
    ++currentLine;

    // Menu button click sound
    $(".menu-button, #back-to-menu").on("click", function () {
      menuItemHoverSound.play();
    });

    // Chapter card hover sound
    $(".released").on("mouseenter", function () {
      chapterHoverSound.play();
    });

    // Loading the next line on click with style
    $("#introtext").css({ opacity: "0" });
    setTimeout(function () {
      $("#introtext").html(introJson[currentLine]);
    }, 1000);
    setTimeout(function () {
      $("#introtext").css({ opacity: "1" });
    }, 1250);
  });
}

// Loading the main menu after the intro ends
$(document).on("click keydown", "#beyond-mortal", function (e) {
  $("#introtext").css({ opacity: "0" }).delay(1000).hide("fade");
  setTimeout(function () {
    $("#menuimage").show("fade");
    $("#main-menu").show("fade");
  }, 1000);
  return;
});

// Return to main menu
$(document).on("click", "#back-to-menu", function (event) {
  event.stopPropagation();

  $("#visualchapternav").hide("fade");
  $("#back-to-menu").hide("fade");
  $("#game-loader").hide("fade");

  setTimeout(function () {
    $("#main-menu").show("fade");
  }, 1000);
});

// 'New Game' menu option
$(document).on("click", "#new-game", function (event) {
  event.stopPropagation();

  $("#main-menu").hide("fade");

  setTimeout(function () {
    $("#visualchapternav").show("fade");
    $("#back-to-menu").show("fade");
  }, 1000);
});

// 'Load Game' menu option
$(document).on("click", "#load-game", function (event) {
  event.stopPropagation();

  $("#main-menu").hide("fade");

  setTimeout(function () {
    if (localStorage.getItem("saveState") !== null) {
      $("#continue").show();
    }
    $("#game-loader").show("fade");
    $("#back-to-menu").show("fade");
  }, 1000);
});

// Clicking on a released chapter's div will trigger fetching it as json
$(document).on("click", ".released", function () {
  audioIntroSound.pause();
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
    // If the object key is "url", set its value as the background's url
    if (Object.keys(chapterJson[currentLineIndex])[0] == "url") {
      let imgUrl = Object.values(chapterJson[currentLineIndex])[0][0];
      document.getElementById("gamebox").style.backgroundImage =
        "url(" + imgUrl + ")";

      // Show next line
      $("#gametext").html(
        chapterJson[currentLineIndex + 1] + "&nbsp;<span id='blinker'>.</span>"
      );

      currentLineIndex += 2;
    }
    // If the object key is "audio", play the audio defined in its value
    else if (Object.keys(chapterJson[currentLineIndex])[0] == "audio") {
      // Stops the music if the first one was already loaded
      if (currentLineIndex > 1) {
        backgroundMusic.pause();
      }

      backgroundMusic = new Audio(
        Object.values(chapterJson[currentLineIndex])[0][0]
      );
      backgroundMusic.loop = true;
      backgroundMusic.play();

      // Show next line
      $("#gametext").html(
        chapterJson[currentLineIndex + 1] + "&nbsp;<span id='blinker'>.</span>"
      );
      currentLineIndex += 2;
    } // If the object key is "soundeffect", play the audio defined in its value
    else if (Object.keys(chapterJson[currentLineIndex])[0] == "soundeffect") {
      soundEffect = new Audio(
        Object.values(chapterJson[currentLineIndex])[0][0]
      );
      soundEffect.play();

      // Show next line
      $("#gametext").html(
        chapterJson[currentLineIndex + 1] + "&nbsp;<span id='blinker'>.</span>"
      );
      currentLineIndex += 2;
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
    // Show line in textbox
    $("#gametext").html(
      chapterJson[currentLineIndex] + "&nbsp;<span id='blinker'>.</span>"
    );

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

  // Push new property with line index as key and button number as value into object
  saveState[currentLineIndex] = buttonNum;
  console.log(saveState);

  // Store object in localstorage
  const saveStateString = JSON.stringify(saveState);
  localStorage.setItem("saveState", saveStateString);

  currentLineIndex += linesToSkip;

  // Tracker incrementation
  ++currentLineIndex;

  $(".gamebutton").hide();
  displayChapterLine();
});

// Download game save
function downloadGameSave(text, filename) {
  let a = document.createElement("a");
  a.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  a.setAttribute("download", filename);
  a.click();
}

// Download button
$(document).on("click", "#save-game", function () {
  downloadGameSave(JSON.stringify(saveState), "beyond-mortal-gamesave.tales");
});
