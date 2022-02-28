//variables

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

var ul = phrase.querySelector('ul');
const heartLost = document.querySelectorAll('.tries img');
const show = document.getElementsByClassName('show');
const letters = document.getElementsByClassName('letter');
const title = document.querySelector('.title');

//RESET BUTTON
const resetButton = document.createElement('button');
resetButton.type = 'button';
resetButton.textContent = 'PLAY AGAIN';
resetButton.className = 'btn__reset';

let missed = 0;


//PHRASES
let phrases =  [
  'Live every moment',
  'Never Give Up',
  'The amazing rainbow',
  'Sally owns a hampster',
  'Isnt she lovely',
];


//START THE GAME CLICK
startButton.addEventListener('click', () => {
    //  const overlay_start = document.getElementById('overlay');
      overlay.style.display = 'none';
});

//RETURN RANDOM PHRASE FROM AN ARRAY
function getRandomPhraseAsArray(arr) {
    let randomNumber =  Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNumber].toLowerCase();
    let phraseSplit = randomPhrase.split('');
    console.log(phraseSplit);
    return phraseSplit;
};


//CALL SELECTED PHRASE ARRAY
const phraseArray = getRandomPhraseAsArray(phrases);


//ADDS LETTERS FROM THE STRING TO THE CREATED LIST (LI)
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    console.log(li.textContent = arr[i]);
    phrase.appendChild(li);
    if (arr[i] !== ' ') {
      li.classList.add('letter');
    } else {
      li.classList.add('space');
    }
  }
};

addPhraseToDisplay(phraseArray);



//CHECKS IF SELECTED LETTER WAS IN THE SELECTED PHRASE THEN STORED TO A VAR
function checkLetter(button)  {
  let liElements = document.querySelectorAll('li');
  let match = null;
  for (let i = 0; i < liElements.length; i++) {
    if (button.innerText === liElements[i].innerText)  {
      liElements[i].classList.add('show');
      match = button.innerText;
    }
  }

  return match;
};

//LISTEN FOR ONSCREEN QWERTY IF CLICKED
qwerty.addEventListener('click', (e) => {
  const button = e.target;
  if (button.tagName === 'BUTTON' || button.className === 'chosen') {
    button.className = 'chosen';
    button.disabled = true;
    const letterFound = checkLetter(button);
    if (letterFound === null) {
      heartLost[missed].src ='images/lostHeart.png';
      missed++;
    }
    checkWin();
  }
});


  //CHECKS IF USER WON OR LOST
  function checkWin ()  {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const title = overlay.firstElementChild
    if (letter.length === show.length) {
        overlay.className = 'win';
        overlay.style.display = 'flex';
        title.textContent = `Well done you guessed it, the answer was ${getRandomPhraseAsArray(phrases)}`;



        overlay.insertBefore(resetButton, startButton);
        startButton.style.display = 'none';
    } else if (missed > 4 ) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        title.textContent = `User fails - the random phrase was ${getRandomPhraseAsArray(phrases)}`;

        overlay.insertBefore(resetButton, startButton);
        startButton.style.display = 'none';
    }
  };


  //RESTART THE GAME
  function clearTheGame() {
      ul.textContent = "";
      phrase.textContent = "";
      missed = 0;
      overlay.classList = "start"

      const keyrows = document.getElementsByTagName('button');
      const li = document.createElement('li');
      for (let i = 0; i < keyrows.length; i++) {
          let li  = keyrows[i];
          if (li.className === 'chosen') {
              li.classList.remove('chosen');
              li.disabled = false;
          }
      };

      for (let i = 0; i < 5; i++) {
          const lives = document.querySelectorAll('.tries img')[i]
          lives.src = 'images/liveHeart.png';
      }
  };

  // LISTEN FOR RESET BUTTON
  resetButton.addEventListener('click', () => {
      const overlay_start = document.getElementById('overlay');
      overlay_start.style.display = 'none';
      clearTheGame();
      const phraseArray = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(phraseArray);
    });
