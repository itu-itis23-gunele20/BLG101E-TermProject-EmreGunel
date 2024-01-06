document.addEventListener('DOMContentLoaded', () => {
    // Define the cards and other game variables.
    const cards = ['G', 'U', 'N', 'E', 'L'];
    let score = 0;
    let cardSequence = [];
    let playerSequence = [];
    let gameStarted = false;

    // Function to reload the page. Used for restarting the game.
    function reloadPage() {
        window.location.reload();
    }

    // Function to shuffle the array of cards. This ensures that each game has a random order of cards.
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    

    // Function to create card elements and add them to the DOM.
    // Each card is an image element, which gets added to the card container.
    function createCards() {
        shuffleArray(cards);
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            const imgElement = document.createElement('img');
            imgElement.src = `images/${card}.png`;
            imgElement.alt = `Card ${card}`;
            imgElement.style.visibility = 'visible';

            cardElement.appendChild(imgElement);
            cardElement.addEventListener('click', function() {
                if (gameStarted) {
                    checkCard(card, imgElement);
                }
            });

            cardsContainer.appendChild(cardElement);
        });
    }

    // Function to enable or disable clicking on the cards.
    // When cards are not clickable, it prevents the user from interacting with the game.
    function setCardsClickable(isClickable) {
        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach(card => {
            card.style.pointerEvents = isClickable ? 'auto' : 'none';
        });
    }

    // Function to check the selected card against the sequence.
    // It updates the score and game state based on the player's choice.
    function checkCard(card, imgElement) {
        imgElement.style.visibility = 'visible';
        playerSequence.push(card);
        // Check if the current player sequence matches the required card sequence.
        if (playerSequence.join('') === cardSequence.join('').substring(0, playerSequence.length)) {
            score += 20; // Increase score for each correct selection.
            document.getElementById('score').innerText = score; // Update score display.

            // Check if the entire sequence is correct.
            if (playerSequence.length === cardSequence.length) {
                alert('Correct Order! Score: ' + score); // Show success message.
                setCardsClickable(false); // Disable further card clicks.
                document.getElementById('restart-button').style.display = 'block'; // Show the restart button.
                setTimeout(reloadPage, 2000); // Reload the page after 2 seconds.
            }
        } else {
            // If the player's selection is wrong, end the game.
            alert('Wrong Order! Game Over. Score: ' + score); // Show failure message.
            setCardsClickable(false); // Disable further card clicks.
            document.getElementById('restart-button').style.display = 'block'; // Show the restart button.
        }
    }

    // Event listener for the 'Start Game' button.
    // Initializes the game sequence and hides the start button.
    document.getElementById('start-button').addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true; // Mark the game as started.
            cardSequence = [...cards]; // Prepare the sequence of cards.
            playerSequence = []; // Reset any previous player sequence.
            document.getElementById('start-button').style.display = 'none'; // Hide the start button.
            document.getElementById('restart-button').style.display = 'block'; // Show the restart button.
            createCards(); // Create and display the cards.

            setCardsClickable(false); // Initially, make cards unclickable.

            // Make the cards clickable after 2 seconds, starting the game.
            setTimeout(() => {
                const cardImages = document.querySelectorAll('#cards-container img');
                cardImages.forEach(img => img.style.visibility = 'hidden');
                setCardsClickable(true); // Now, make cards clickable.
            }, 2000);
        }
    });
});
