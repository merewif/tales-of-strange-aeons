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

let localStorageLength = localStorage.length + 1;

let currentChapterID = "";

// Game saves
let saveState = {};
const loadSaveStateString = localStorage.getItem("saveState");
const loadSaveState = JSON.parse(loadSaveStateString);

let localStorageArray = [];

$(document).on("click", "#install-instructions", function () {
  $("#popup").show();
});

$(document).on("click", "#hide-popup, #intro", function () {
  $("#popup").hide();
});

// Click on play button
$(document).on("click", "#start", function (e) {
  $("#bg-image").hide();
  $("#game").show();
  $("#headerlogo").show();
  $("#intro").css({ opacity: "1" });
  $("#start").hide();
  $("#install-game").hide();
  $("#install-instructions").hide();
  fetchIntroJson();

  document.body.requestFullscreen({ navigationUI: "hide" });
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

  // Variable for preventing fast clicking
  let clickDisabledIntro = false;
  $(document).on("click keydown", "body", function (e) {
    if (clickDisabledIntro) return;

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

    // Preventing fast clicking
    clickDisabledIntro = true;
    setTimeout(function () {
      clickDisabledIntro = false;
    }, 1000);
  });
}

// Loading the main menu after the intro ends
$(document).on("click keydown", "#beyond-mortal, #skipintro", function () {
  $("#skipintro").hide("fade");

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
  $("#achievements-container").hide("fade");
  $("#game").css({ cursor: "url('./assets/images/cursor.png'), pointer" });
  document.body.requestFullscreen({ navigationUI: "hide" });

  setTimeout(function () {
    $("#main-menu").show("fade");
    $("#achievements-container").html("");
  }, 1000);
});

// Exit game
$(document).on("click", "#exit-game", function () {
  window.location.reload();
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
    if (localStorage.length !== null) {
      $("#continue").show();
    }
    $("#game-loader").show("fade");
    $("#back-to-menu").show("fade");
  }, 1000);

  $("#file-upload").change(function (e) {
    handleFileUpload(e);
  });
});

// Read uploaded save game
function handleFileUpload(event) {
  let input = document.getElementById("file-upload");
  for (let i = 0; i < input.files.length; i++) {
    let reader = new FileReader();
    reader.readAsText(event.target.files[i]);
    reader.onload = handleFileRead;
  }

  input.value = "";
  $("#successful-upload").show("fade");
  setTimeout(function () {
    $("#successful-upload").hide("fade");
  }, 1500);
}

// Add uploaded save game file to local storage
function handleFileRead(event) {
  let save = JSON.parse(event.target.result);
  window.localStorage.setItem(
    "saveState" + (localStorage.length + 1),
    JSON.stringify(save)
  );
}

// Clear local storage
$(document).on("click", "#delete-stored-saves", function () {
  localStorage.clear();
  localStorageArray = [];
  $("#successful-delete").show("fade");

  setTimeout(function () {
    $("#successful-delete").hide("fade");
  }, 1500);
});

// 'Achievements' menu option
$(document).on("click", "#achievements", function (event) {
  event.stopPropagation();

  $("#main-menu").hide("fade");

  // Fetch local storage contents into array
  localStorageArray = [];
  for (let i = 1; i < localStorage.length + 1; i++) {
    let fetchLocalStorageObject = localStorage.getItem("saveState" + i);
    let processResult = JSON.parse(fetchLocalStorageObject);
    localStorageArray.push(processResult);
  }

  let urlConstructor = "./assets/elements/game-assets/achievements.json";
  fetch(urlConstructor)
    .then((response) => response.json())
    .then((achievementsJson) => {
      for (let i = 0; i < achievementsJson.length; i++) {
        let singleAchievement = document.createElement("div");
        singleAchievement.className = "achievement-box";
        singleAchievement.id = "achievement" + i;

        let achievementTitle = document.createElement("h1");
        achievementTitle.innerHTML = achievementsJson[i].name;

        let achievementDescription = document.createElement("p");
        achievementDescription.innerHTML = achievementsJson[i].description;

        let achievementIcon = document.createElement("img");
        achievementIcon.src = achievementsJson[i].iconIncomplete;

        $("#achievements-container").append(singleAchievement);
        $("#achievement" + i).append(
          achievementIcon,
          achievementTitle,
          achievementDescription
        );

        let requiredLineForCompletion = achievementsJson[i].requirementLine;
        let requiredChoiceForCompletion = achievementsJson[i].requirementChoice;

        //Checking if achievement requirement is met
        let isComplete = 0;
        if (localStorageArray.length > 0 && localStorageArray !== null) {
          for (let j = 0; j < localStorage.length; j++) {
            if (
              localStorageArray[j][requiredLineForCompletion] ==
              requiredChoiceForCompletion
            ) {
              isComplete = 1;
            } else {
              //pass
            }
          }
        }

        if (isComplete == 1) {
          achievementIcon.src = achievementsJson[i].iconComplete;
        }
      }
    });

  setTimeout(function () {
    $("#achievements-container").show("fade");
    $("#back-to-menu").show("fade");
  }, 1000);
});

$(document).on("click", "#exit", function () {
  document.exitFullscreen();
  // window.close();
  window.location.reload();
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
  currentChapterID = chapter;
  console.log(currentChapterID);
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

// Variable for preventing fast clicking
let clickDisabledChapter = false;

// Click to load the next line of text
$(document).on("click keyup", "body", function (e) {
  if (e.which === 32 || e.which === 1) {
    if (clickDisabledChapter) return;

    displayChapterLine();

    // Preventing fast clicking
    clickDisabledChapter = true;
    setTimeout(function () {
      clickDisabledChapter = false;
    }, 1000);
  }
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
    // Show line in textbox with fade-in-out
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
  saveState[currentChapterID + "line" + currentLineIndex] = buttonNum;

  // Store object in localstorage
  const saveStateString = JSON.stringify(saveState);
  localStorage.setItem(
    "saveState" + (localStorage.length + 1),
    saveStateString
  );

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
  document.body.requestFullscreen({ navigationUI: "hide" });
});

// PWA Requirements
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

function installAsPWA() {
  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    // e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    $("#install-instructions").hide();
    $("#install-game").show();
    showInstallPromotion();
  });

  const installApp = document.getElementById("install-game");
  installApp.addEventListener("click", async () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        deferredPrompt = null;
      }
    }
  });
}

window.addEventListener("load", installAsPWA);
