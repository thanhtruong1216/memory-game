// Create a list that holds all cards
const memory_cards = ['fa-diamond', 'fa-diamond','fa-paper-plane-o', 'fa-paper-plane-o','fa-anchor',
'fa-anchor','fa-bolt', 'fa-bolt','fa-cube', 'fa-cube','fa-leaf', 'fa-leaf','fa-bicycle', 'fa-bicycle',
'fa-bomb', 'fa-bomb'];

// Store unique values of card
const uniqueCardList = new Set(memory_cards);
const uniqueCardListSize = uniqueCardList.size;

// Declare variables to hold data when has event
let cards_opened = [];
let length_of_opened_list = 0;
let step = 0;
let pair_matched = 0;

// Create shuffle method
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle the list of cards via call "shuffle" function
let shuffleListOfCards = shuffle(memory_cards);

// Loop through each card and render its to HTML
function renderCardsToHTML() {
  shuffleListOfCards.forEach(function(card) {
    $('.deck').append('<li data-icon="'+card+'" class="card fa '+ card +'"></li>');
  })
}

// Create function to add card to cards opened list
function addCardToOpenedList(card) {
  cards_opened.push(card);
  length_of_opened_list = cards_opened.length;
}

// Check info about card and decide show pair of cards or hide them
function openOrHideCard() {
  // Open pair of cards when matched
  if(cards_opened[0].data('icon') === cards_opened[1].data('icon')) {
    cards_opened[0][0].classList.add('true', 'match')
    cards_opened[1][0].classList.add('true', 'match')
    pair_matched++
    step++
    delectCardFromOpenedList();
  } else {
  // Hide pair of cards when not matched
    cards_opened[0][0].classList.add('false', 'not_match');
    cards_opened[1][0].classList.add('false', 'not_match');
    step++
    setTimeToHideCard();
  }
  countMove(step);
  voteScore(step);
}

// Set waiting time to show or hide card when click on card
function setTimeToHideCard() {
  setTimeout(deleteClassFromElement, 500);
  setTimeout(delectCardFromOpenedList, 500);
}

// Delete card from cards open list when list's size equal 2
function delectCardFromOpenedList() {
  cards_opened = [];
}

// Delete somw class when has 2 cards not matched
function deleteClassFromElement() {
  $(".card").removeClass("show open flipInY true false not_match");
}

// Show pop-up alert game win 
function alertGameWin() {
  if(pair_matched === uniqueCardListSize) {
    alert("win");
  }
}

// Counting total of step
function countMove(move) {
  if(move === 1) {
    $('.moves').html(`1 move`)
  } else {
    $('.moves').html(`${move} moves`)
  }
}

// Rating star
function voteScore(moves) {
  if(moves > 15 && moves <= 20) {
    $('.stars').html(`
      <li><i class="first-star fa fa-star"></i></li>
      <li><i class="second-star fa fa-star"></i></li>
      <li><i class="third-star fa fa-star-o"></i></li>
    `)
  } else if(moves >= 20 && moves <= 25) {
    $('.stars').html(`
      <li><i class="first-star fa fa-star"></i></li>
      <li><i class="second-star fa fa-star-o"></i></li>
      <li><i class="third-star fa fa-star-o"></i></li>
    `)
  } 
}


// Add event listener and render card when has a pair matched.
function renderCardWhenClick() {
  $('.card').on('click', function() {
    if($(this).hasClass('open show')) {
      return;
    }
    $(this).toggleClass('flipInY open show');
    startGame = true;
    addCardToOpenedList($(this));
    if(length_of_opened_list === 2) {
      openOrHideCard();
      alertGameWin();
    }
  })
}

function restartGame() {
  $('.restart').on('click', function() {
    location.reload()
  })
}


// Call functions in document.ready function
$(document).ready(function() {
  $('.stars').html(`
    <li class="fa fa-star"></li>
    <li class="fa fa-star"></li>
    <li class="fa fa-star"></li>
  `)
  $('.moves').html(`0 move`)
  renderCardsToHTML();
  renderCardWhenClick();
  restartGame();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
