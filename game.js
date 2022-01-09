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

// Game saves
let saveState = {};
const loadSaveStateString = localStorage.getItem("saveState");
const loadSaveState = JSON.parse(loadSaveStateString);

let localStorageArray = [];

// Click on play button
$(document).on("click", "#start", function (e) {
  $("#bg-image").hide();
  $("#game").show();
  $("#headerlogo").show();
  $("#intro").css({ opacity: "1" });
  $("#start").hide();
  $("#install-game").hide();
  fetchIntroJson();

  document.body.requestFullscreen();
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
  $();

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

// Add uploaded save game file to local storage
let uploadedSaveFile = "saveState" + (localStorage.length + 1);
let reader = new FileReader();
reader.onload = handleFileRead;

function handleFileUpload(event) {
  let file = event.target.files[0];
  reader.readAsText(file);
  $("#successful-upload").show("fade");

  setTimeout(function () {
    $("#successful-upload").hide("fade");
  }, 1500);
}

function handleFileRead(event) {
  let save = JSON.parse(event.target.result);
  window.localStorage.setItem(uploadedSaveFile, JSON.stringify(save));

  for (let i = 0; i < localStorage.length; i++) {
    let fetchLocalStorageObject = localStorage.getItem("saveState" + (i + 1));
    let processResult = JSON.parse(fetchLocalStorageObject);
    localStorageArray.push(processResult);
  }
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
  for (let i = 1; i < localStorage.length + 1; i++) {
    let fetchLocalStorageObject = localStorage.getItem("saveState" + i);
    let processResult = JSON.parse(fetchLocalStorageObject);
    localStorageArray.push(processResult);
  }

  // Remove empty elements from local storage array
  for (let i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i] == null) {
      localStorageArray.push(localStorageArray.splice(i, 1)[0]);
      localStorageArray.pop();
    }
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
        achievementTitle.innerText = achievementsJson[i].name;

        let achievementDescription = document.createElement("p");
        achievementDescription.innerText = achievementsJson[i].description;

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

// Variable for preventing fast clicking
let clickDisabledChapter = false;
// Click to load the next line of text
$(document).on("click", "#gametext", function (e) {
  if (clickDisabledChapter) return;

  displayChapterLine();

  // Preventing fast clicking
  clickDisabledChapter = true;
  setTimeout(function () {
    clickDisabledChapter = false;
  }, 1000);
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
  saveState["line" + currentLineIndex] = buttonNum;

  // Store object in localstorage
  const saveStateString = JSON.stringify(saveState);
  localStorage.setItem("saveState" + localStorageLength, saveStateString);

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
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    $("#install-game").show();
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

  /*
  $("#install-game").on("click", function (e) {
    // hide our user interface that shows our A2HS button
    $("#install-game").hide();
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });*/

  window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    hideInstallPromotion();
    // $("#install-game").hide();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  });
}

window.addEventListener("load", installAsPWA);
