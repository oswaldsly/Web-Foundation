// ---------- 1. Select the elements we need ----------
const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "quicknotes-day4-draft";
const THEME_KEY = "quicknotes-day4-theme";

// ---------- 2. Update character and word counts ----------
function updateCounts() {
  const text = noteText.value;

  // Count characters
  const characters = text.length;

  // Count words
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Update counters
  charCount.textContent = `${characters} / 200 characters`;
  wordCount.textContent = `${words} words`;

  // Remove old warning classes
  charCount.classList.remove("warning", "over");

  // Add the correct warning class
  if (characters > 200) {
    charCount.classList.add("over");
  } else if (characters > 180) {
    charCount.classList.add("warning");
  }
}

// ---------- 3. Save the draft ----------
function saveDraft() {
  localStorage.setItem(DRAFT_KEY, noteText.value);
}

// ---------- 4. Clear everything ----------
function clearNote() {
  noteText.value = "";

  localStorage.removeItem(DRAFT_KEY);

  updateCounts();
  noteText.focus();
}

// ---------- 5. Listen for typing ----------
noteText.addEventListener("input", () => {
  updateCounts();
  saveDraft();
});

// ---------- 6. Clear button ----------
clearBtn.addEventListener("click", () => {
  clearNote();
});

// ---------- 7. Escape key clears the note ----------
noteText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    clearNote();
  }
});

// ---------- 8. Theme toggle ----------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "Light mode";
    localStorage.setItem(THEME_KEY, "dark");
  } else {
    themeToggle.textContent = "Dark mode";
    localStorage.setItem(THEME_KEY, "light");
  }
});

// ---------- 9. Restore saved data when page loads ----------
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft) {
  noteText.value = savedDraft;
}

// Restore saved theme
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "Light mode";
} else {
  themeToggle.textContent = "Dark mode";
}

// Update counters when page first loads
updateCounts();
