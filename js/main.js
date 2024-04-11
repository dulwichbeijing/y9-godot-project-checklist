// JSON data containing enhancements
const enhancements = {
    "enhancements": [
        {
        "category": "Art",
        "improvements": [
            "Replace the main character artwork with original art.",
            "Add animations to the main character (run, jump, idle).",
            "Add a custom background to the game."
        ]
        },
        {
        "category": "Sound Design",
        "improvements": [
            "Include background music.",
            "Add sound effects for player actions.",
            "Implement different soundtracks for different levels."
        ]
        },
        {
        "category": "User Interface (UI)",
        "improvements": [
            "Create a main menu with at least play and quit buttons.",
            "Implement a pause menu.",
            "Include visual indicators for player information (e.g. score)."
        ]
        },
        {
        "category": "Level Design",
        "improvements": [
            "Design and add one new level.",
            "Introduce a new type of obstacle.",
            "Create an enemy that can move around the level."
        ]
        },
        {
        "category": "Game Mechanics",
        "improvements": [
            "Add a double-jump to your game's character.",
            "Add an interactive element that affects the game world (e.g. a switch, a moving platform).",
            "Implement a time-based challenge (e.g. speed run)."
        ]
        },
        {
        "category": "Advanced Optional Features",
        "improvements": [
            "Add a credits page with information about who made the game.",
            "Include an options page for sound settings.",
            "Add controller support to your game."
        ]
        },
        {
        "category": "Documentation and Sharing",
        "improvements": [
            "Create README or in-game instructions.",
            "Share the game with classmates.",
            "Create a HTML5 build of the game for web play."
        ]
        }
    ]
};


// Function to create checklist items
function createChecklistItem(category, improvement, isChecked) {
  var checkedAttribute = isChecked ? 'checked' : '';
  return `<li>
    <label>
      <input type="checkbox" data-category="${category}" data-improvement="${improvement}" ${checkedAttribute}>
      ${improvement}
    </label>
  </li>`;
}

// Function to render the checklist
function renderChecklist() {
  var checklistDiv = document.getElementById('checklist');
  var checklistHTML = '';

  enhancements.enhancements.forEach(category => {
    checklistHTML += `<h2>${category.category}</h2><ul>`;
      category.improvements.forEach(improvement => {
      var isChecked = localStorage.getItem(`${category.category}_${improvement}`) === 'true';
      checklistHTML += createChecklistItem(category.category, improvement, isChecked);
    });
    checklistHTML += '</ul>';
  });

  checklistDiv.innerHTML = checklistHTML;

  // Add event listener for checkboxes
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });
}

// Function to update progress
function updateProgress(event) {
    var livescoreDiv = document.getElementById('livescore');
    var gradeDiv = document.getElementById('grade');

    // Update local storage when checkbox state changes
    if (event !== null) {
        var targetCheckbox = event.target;
        var category = targetCheckbox.getAttribute('data-category');
        var improvement = targetCheckbox.getAttribute('data-improvement');
        var isChecked = targetCheckbox.checked;
        localStorage.setItem(`${category}_${improvement}`, isChecked);
    }
    
    var total = document.querySelectorAll('input[type="checkbox"]').length;
    var completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
    var grade = getGradeName(completed);

    livescoreDiv.innerHTML = `<p>Progress: ${completed} out of ${total} completed.</p>`;
    gradeDiv.innerHTML = `<p>Current grade: ${grade}</p>`;
}

function getGradeName(completed_tasks) {
    var grade = "Incomplete submission";

    if (completed_tasks >= 20) {
        grade = "Expert";
    } else if (completed_tasks >= 16) {
        grade = "Proficient";
    } else if (completed_tasks >= 12) {
        grade = "Competent";
    } else if (completed_tasks >= 8) {
        grade = "Developing";
    } else if (completed_tasks >= 4) {
        grade = "Emerging";
    }

    return grade;
}

function init() {
    renderChecklist();
    updateProgress(null);
}

// Render the checklist when the page loads
window.onload = init;