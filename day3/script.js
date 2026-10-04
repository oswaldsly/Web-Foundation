// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes by word
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter((note) => note.text.toLowerCase().includes(searchWord));
}

// Tests
console.log(searchNotes("day"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

console.log(searchNotes("python"));
// Expected: []

// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}

// Tests
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

let savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotes;

// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

// Tests
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

let notesBeforeEmptyTest = notes;
notes = [];
console.log(countByCategory());
// Expected: {}
notes = notesBeforeEmptyTest;

// 4. Get a summary of the notes
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;

  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${
    counts.work || 0
  } work, ${counts.study || 0} study.`;
}

// Tests
console.log(getSummary());
// Expected: 5 notes: 2 personal, 1 work, 2 study.

let notesBeforeSummaryTest = notes;
notes = [];
console.log(getSummary());
// Expected: 0 notes: 0 personal, 0 work, 0 study.
notes = notesBeforeSummaryTest;

// 5. Check whether a note is a duplicate
function isDuplicate(text) {
  const cleanedText = text.trim().toLowerCase();

  return notes.some((note) => note.text.trim().toLowerCase() === cleanedText);
}

// Tests
console.log(isDuplicate("  CALL MUM  "));
// Expected: true

console.log(isDuplicate("Go to the gym"));
// Expected: false

// 6. Add a new note
function addNote(text, category) {
  const cleanedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (cleanedText.length < 1 || cleanedText.length > 200) {
    console.log("❌ Note rejected: text must be 1-200 characters.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("❌ Note rejected: duplicate note.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("❌ Note rejected: invalid category.");
    return false;
  }

  const newNote = {
    id: Date.now(),
    text: cleanedText,
    category: category,
  };

  notes.push(newNote);

  console.log(`✅ Note added: "${newNote.text}"`);
  return true;
}

// Tests
console.log(addNote("Practice JavaScript functions", "study"));
// Expected: true

console.log(addNote("Call mum", "personal"));
// Expected: false - duplicate note

console.log(addNote("   ", "personal"));
// Expected: false - invalid text

console.log(addNote("Learn Git commands", "other"));
// Expected: false - invalid category
