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
let countInterval = null;
let totalSeconds = 0;

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

// Add card to cards opened list
function addCardToOpenedList(card) {
  cards_opened.push(card);
  length_of_opened_list = cards_opened.length;
}

// Hide or show pair of cards
function openOrHideCard() {
  // Open pair of cards when matched
  if($(cards_opened[0]).data('icon') === cards_opened[1].data('icon')) {
    $(cards_opened[0]).addClass('match');
    $(cards_opened[1]).addClass('match');
    pair_matched++;
    delectCardFromOpenedList();
  } else {
  // Hide pair of cards when not matched
    $(cards_opened[0]).addClass('not_match');
    $(cards_opened[1]).addClass('not_match');
    setTimeToHideCard();
  }
  step++;
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
  $(".card").removeClass("show open flipInY not_match");
}

// Show pop-up alert game win 
function alertGameWin() {
  $('.deck li').addClass('open matched show flipInY')
  $('.pop-up').addClass('opened').html(`
    <div class="pop-up-content">
      <span class="win">Game win</span>
      <span class="exit">&times;</span>
    </div>
  `);

  $('.exit').on('click', function(){
    $(this).closest('.pop-up').removeClass('opened')
  });

  setTimeout(function() {
    clearInterval(countInterval);
  }, 200);
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

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Set timer to second and minute when start game
function setTime(totalSeconds) {
  const minutesLabel = document.getElementById("minutes");
  const secondsLabel = document.getElementById("seconds");
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

// Check info about card and decide show pair of cards or hide them when click
function renderCardWhenClick() { 
  $('.card').on('click', function() {
    const $this = $(this);
    if($this.hasClass('open show')) {
      return;
    }
    $this.toggleClass('flipInY open show');
    addCardToOpenedList($this);
    if(length_of_opened_list === 2) {
      openOrHideCard();
      if(pair_matched === uniqueCardListSize) {
        alertGameWin();
        $('.card').off('click');
      }
    }
  }) 
  // Start timer when first click
  $('.card').on('click.one', function() {
    $('.card').off('click.one');
    countInterval = setInterval(function(){
      ++totalSeconds;
      setTime(totalSeconds)
    }, 500);
  }) 
}

// Retart game
function restartGame() {
  $('.restart').on('click', function() {
    location.reload()
  })
}

// Call functions in document.ready function
$(document).ready(function() {
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
