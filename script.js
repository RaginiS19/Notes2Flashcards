let flashcardData = [];

function generateFlashcards() {
  const notes = document.getElementById("notesInput").value;
  const subject = document.getElementById("subjectInput").value.trim();
  const theme = document.getElementById("themeSelect").value;
  const container = document.getElementById("flashcardsContainer");
  container.innerHTML = "";
  flashcardData = [];

  const cards = notes.split(/\n\s*\n/);

  cards.forEach((card, index) => {
    const parts = card.split(/[:\-–]/);
    const question = parts[0] ? parts[0].trim() : `Card ${index + 1}`;
    const answer = parts[1] ? parts[1].trim() : "(No answer found)";
    flashcardData.push({ question, answer, subject, theme });
  });

  renderFlashcards();
}

function renderFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  container.innerHTML = "";

  flashcardData.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "flashcard";
    cardElement.setAttribute("data-theme", card.theme);

    cardElement.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div><strong>${card.subject}</strong></div>
          <div>Q: ${card.question}</div>
        </div>
        <div class="flashcard-back">A: ${card.answer}</div>
      </div>
    `;

    // Flip on click
    cardElement.addEventListener("click", () => {
      cardElement.classList.toggle("flipped");
    });

    container.appendChild(cardElement);
  });
}

function shuffleFlashcards() {
  flashcardData.sort(() => Math.random() - 0.5);
  renderFlashcards();
}

function clearFlashcards() {
  document.getElementById("flashcardsContainer").innerHTML = "";
  document.getElementById("notesInput").value = "";
  document.getElementById("subjectInput").value = "";
  flashcardData = [];
}

function downloadCSV() {
  if (flashcardData.length === 0) return alert("No flashcards to download.");

  const csvContent = "data:text/csv;charset=utf-8," +
    "Subject,Question,Answer\n" +
    flashcardData.map(card => `"${card.subject}","${card.question}","${card.answer}"`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "flashcards.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
