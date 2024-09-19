// Flashcards Data
const flashcards = [
    {latin: 'Femur', src="https://tse4.mm.bing.net/th?id=OIP.FWnPHKdkK_eSngZ6-2ME6QHaHz&pid=Api"},
    {latin: 'Cranium', src="https://image.jimcdn.com/app/cms/image/transf/none/path/s97cfb0343e1774e6/image/icc69a4db89a64ddc/version/1511023481/cranium-skull.jpg},
    {latin: 'Humerus', image: 'humerus.png'},
    {latin: 'Patella', image: 'patella.png'},
    {latin: 'Clavicula', image: 'clavicula.png'},
    {latin: 'Scapula', image: 'scapula.png'}
  ];
  
  let currentCardIndex = 0;
  let score = 0;
  let isFlipped = false;
  
  // Get DOM elements
  const flashcard = document.getElementById('flashcard');
  const cardFront = document.getElementById('card-front');
  const cardBackImage = document.getElementById('card-image');
  const scoreDisplay = document.getElementById('score');
  const feedback = $('#feedback');
  
  // Initialize first flashcard
  loadCard(currentCardIndex);
  
  // Load Flashcard Data
  function loadCard(index) {
    const card = flashcards[index];
    cardFront.textContent = card.latin;
    
    // Dynamically set image source (make sure the image path is correct)
    cardBackImage.src = `images/${card.image}`;
    cardBackImage.alt = card.latin;
  }
  
  // Flip card event
  document.getElementById('flip-btn').addEventListener('click', () => {
    flashcard.classList.toggle('flip');
    isFlipped = !isFlipped;
  });
  
  // Next Card
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentCardIndex < flashcards.length - 1) {
      currentCardIndex++;
    } else {
      currentCardIndex = 0; // Restart
    }
    loadCard(currentCardIndex);
    resetCard();
    resetFeedback();
  });
  
  // Previous Card
  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
    } else {
      currentCardIndex = flashcards.length - 1; // Go to the last card
    }
    loadCard(currentCardIndex);
    resetCard();
    resetFeedback();
  });
  
  // Reset card view (always show front first)
  function resetCard() {
    if (isFlipped) {
      flashcard.classList.remove('flip');
      isFlipped = false;
    }
  }
  
  // Reset feedback after moving to a new card
  function resetFeedback() {
    feedback.text('');
  }
  
  // Handle form submission for guessing the Latin name
  $('#guess-form').on('submit', function (event) {
    event.preventDefault();
  
    const userGuess = $('#guess-input').val().trim().toLowerCase();
    const correctAnswer = flashcards[currentCardIndex].latin.toLowerCase();
  
    if (userGuess === correctAnswer) {
      feedback.text('Correct!').removeClass('incorrect').addClass('correct');
      updateScore();
    } else {
      feedback.text(`Incorrect! The correct answer is ${correctAnswer}`).removeClass('correct').addClass('incorrect');
    }
  
    $('#guess-input').val(''); // Clear the input field
  });
  
  // Score Update
  function updateScore() {
    score++;
    scoreDisplay.textContent = score;
  }
  