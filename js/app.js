// Make an array without having to type , and ' ' after every entry
let memory_cards = "fa-diamond fa-paper-plane-o fa-anchor fa-bolt fa-cube fa-leaf fa-bicycle fa-bomb".split(" ");

// Doubles the array elements
memory_cards = [...memory_cards, ...memory_cards] 

// Store unique values of card
const uniqueCardList = new Set(memory_cards);
const uniqueCardListSize = uniqueCardList.size;

// Declare variables to hold data when has event
let cards_opened = [];
let length_of_opened_list = 0;
let step = 0;
let pair_matched = 0;
let countInterval = 0;
let totalSeconds = 0;
let startTime = false;
let currentTime = 0;
let interval = null;

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
  $('.stars').html(voteScore(step));
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

// Delete some class when has 2 cards not matched
function deleteClassFromElement() {
  $(".card").removeClass("show open flipInY not_match");
}

// Show pop-up alert game win 
function alertGameWin() {
  $('.deck li').addClass('open matched show flipInY')
  $('.pop-up').addClass('opened').html(`
    <div class="pop-up-content">
      <span class="exit">&times;</span>
      <p class="win white-text">Game win<br>You used ${step} moves</p>
      <div class="pop-up-star">${voteScore(step)}</div>
      <p class="play_again white-text">Do you want to play again?</p><br>
      <div class="choice white-text">
        <span class="start-game-again">yes</span>
        <span class="stop-game">no</span>
      </div>
    </div>
  `);

  $('.exit, .stop-game').on('click', function(){
    $('.pop-up').removeClass('opened')
  });

  $('.start-game-again').on('click', function() {
    location.reload();
  })

  setTimeout(function() {
    clearInterval(interval);
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
  if(moves >= 0 && moves <= 16) {
    return (`
      <li><i class="first-star fa fa-star"></i></li>
      <li><i class="second-star fa fa-star"></i></li>
      <li><i class="third-star fa fa-star"></i></li>
    `)
  } else if(moves > 16 && moves <= 20) {
    return (`
      <li><i class="first-star fa fa-star"></i></li>
      <li><i class="second-star fa fa-star"></i></li>
      <li><i class="third-star fa fa-star-o"></i></li>
    `)
  } else {
    return (`
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

  $('.card').on('click.one', function() {
    // $('.card').off('click.one');
    if(!interval) {
      clearInterval(interval);
      startTime = new Date;
      interval = setInterval(function() {
        currentTime = new Date;
        totalSeconds = Math.floor((currentTime - startTime)/1000);
        setTime(totalSeconds);
      }, 500)
    }
  });
}

// Retart game
function restartGame() {
  $('.restart').on('click', function() {
    location.reload();
  })
}

// Call functions in document.ready function
$(document).ready(function() {
  renderCardsToHTML();
  renderCardWhenClick();
  restartGame();
})
