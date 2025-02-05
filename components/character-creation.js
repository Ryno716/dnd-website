document.addEventListener("DOMContentLoaded", function () {
  const characterForm = document.getElementById("character-form");
  const characterClassSelect = document.getElementById("character-class");
  const characterRaceSelect = document.getElementById("character-race");
  const randomizeButton = document.getElementById("randomize-character");
  const saveButton = document.getElementById("save-character");

  // Fetch character options from JSON
  fetch("data/character-options.json")
    .then((response) => response.json())
    .then((data) => {
      populateSelect(characterClassSelect, data.classes);
      populateSelect(characterRaceSelect, data.races);

      // Pre-fill the form with the user's current input values
      document.getElementById("character-name").value = "Ron";
      characterClassSelect.value = "warrior";
      characterRaceSelect.value = "human";
    });

  // Handle form submission
  characterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const character = {
      name: characterForm["character-name"].value,
      class: characterForm["character-class"].value,
      race: characterForm["character-race"].value,
      background: characterForm["character-background"].value,
    };
    console.log("Character Created:", character);
    displayCharacterSheet(character);
    drawCharacterVisual(character);
  });

  // Randomize character
  randomizeButton.addEventListener("click", function () {
    const randomName = "RandomName"; // Implement a function to generate random names
    const randomClass = getRandomOption(characterClassSelect);
    const randomRace = getRandomOption(characterRaceSelect);
    const randomBackground = getRandomOption(
      document.getElementById("character-background")
    );

    document.getElementById("character-name").value = randomName;
    characterClassSelect.value = randomClass;
    characterRaceSelect.value = randomRace;
    document.getElementById("character-background").value = randomBackground;
  });

  // Save character
  saveButton.addEventListener("click", function () {
    const character = {
      name: characterForm["character-name"].value,
      class: characterForm["character-class"].value,
      race: characterForm["character-race"].value,
      background: characterForm["character-background"].value,
    };
    saveCharacter(character);
  });

  // Create character customization options
  createCharacterCustomization();

  // Implement drag-and-drop functionality
  implementDragAndDrop();
});

// Function to populate select element with options
function populateSelect(selectElement, options) {
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    selectElement.appendChild(opt);
  });
}

// Create a function to allow users to select and customize their character's race, class, and background
function createCharacterCustomization() {
  const characterBackgroundSelect = document.createElement("select");
  characterBackgroundSelect.id = "character-background";
  characterBackgroundSelect.name = "character-background";
  characterBackgroundSelect.required = true;

  const backgrounds = [
    { value: "noble", label: "Noble" },
    { value: "soldier", label: "Soldier" },
    { value: "outlander", label: "Outlander" },
    // Add more backgrounds as needed
  ];

  populateSelect(characterBackgroundSelect, backgrounds);

  const backgroundDiv = document.createElement("div");
  const backgroundLabel = document.createElement("label");
  backgroundLabel.setAttribute("for", "character-background");
  backgroundLabel.textContent = "Background:";
  backgroundDiv.appendChild(backgroundLabel);
  backgroundDiv.appendChild(characterBackgroundSelect);

  const characterForm = document.getElementById("character-form");
  characterForm.insertBefore(
    backgroundDiv,
    characterForm.querySelector("button")
  );
}

// Implement drag-and-drop functionality for character equipment and abilities
function implementDragAndDrop() {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  dropzones.forEach((dropzone) => {
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      dropzone.appendChild(dragging);
    });
  });
}

// Function to get a random option from a select element
function getRandomOption(selectElement) {
  const options = selectElement.options;
  if (options.length === 0) return ""; // Handle case where there are no options
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex].value;
}

// Function to display character sheet
function displayCharacterSheet(character) {
  const characterSheetContent = document.getElementById(
    "character-sheet-content"
  );
  characterSheetContent.textContent = `
      Name: ${character.name}
      Class: ${character.class}
      Race: ${character.race}
      Background: ${character.background}
    `;
}

// Function to draw character visual representation
function drawCharacterVisual(character) {
  const canvas = document.getElementById("character-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw character representation (simplified example)
  ctx.fillStyle = "blue";
  ctx.fillRect(150, 150, 100, 100);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(character.name, 160, 180);
}

// Function to save character
function saveCharacter(character) {
  const characterData = JSON.stringify(character);
  const blob = new Blob([characterData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${character.name}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
