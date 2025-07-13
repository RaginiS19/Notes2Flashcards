let flashcardData = [];

function generateFlashcards() {
  const notes = document.getElementById("notesInput").value;
  const flashcardsContainer = document.getElementById("flashcardsContainer");
  flashcardsContainer.innerHTML = "";
  flashcardData = [];

  const cards = notes.split(/\n\s*\n/);

  cards.forEach((card, index) => {
    const parts = card.split(/[:\-–]/);
    const question = parts[0] ? parts[0].trim() : `Card ${index + 1}`;
    const answer = parts[1] ? parts[1].trim() : "(No answer found)";

    flashcardData.push({ question, answer });

    const cardElement = document.createElement("div");
    cardElement.className = "flashcard";
    cardElement.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">Q: ${question}</div>
        <div class="flashcard-back">A: ${answer}</div>
      </div>
    `;
    flashcardsContainer.appendChild(cardElement);
  });
}

function downloadCSV() {
  if (flashcardData.length === 0) return alert("No flashcards to download.");

  const csvContent = "data:text/csv;charset=utf-8," +
    "Question,Answer\n" +
    flashcardData.map(card => `"${card.question}","${card.answer}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "flashcards.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
