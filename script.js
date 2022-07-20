const gameboard = (() => { 
  const playerOneEle = document.querySelector('#player_one');
  const playerTwoEle = document.querySelector('#player_two'); 
  const playerForm = document.querySelector('.form_container');
  const formTarget = document.querySelector('.player_form');
  const playerVsPlayer = document.querySelector('.pvpbtn')
  const gameBtns = document.querySelector('.game_type')
  const gameBox = document.querySelector('.game_wrapper')
  const turnDisplay = document.querySelector('.players_turn')
  const playOneScore = document.querySelector('.pOne');
  const platTwoScore = document.querySelector('.pTwo');
  const pOneScoreNum = document.querySelector('.pOneScore');
  const pTwoScoreNum = document.querySelector('.pTwoScore');  
  const pOneBox = document.querySelector('.player_one')
  const pTwoBox = document.querySelector('.player_two')
  const playAgain = document.querySelector('.new_game')
  
  
  let game = {
    gameBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    players: []
  }

  const PlayerMaker = (name) => {
    let score = 0;
    let marker = 'X';
    
    if (game.players.length > 0) {
      marker = 'O';
    } 
    
    return { name, score, marker };
  }

  const playerFormDisplay = function(form) {
    if (form.style.visibility === 'hidden') {
      form.style.visibility = 'visible';
    } else {
      form.style.visibility = 'hidden';
    }
  }

  const displayGameChoice = function() {
    if (gameBtns.style.display === 'none') {
      gameBtns.style.display = 'flex'
    } else {
      gameBtns.style.display = 'none'
    }
    
  }

  const showGame = function() {
    turnDisplay.style.visibility = 'visible';
    gameBox.style.visibility = 'visible';
    pOneBox.style.visibility = 'visible';
    pTwoBox.style.visibility = 'visible';
  }

  const playAgainFunc = function() {
    const gameEnd = document.querySelector('.game_ended')

    gameEnd.style.display = 'none';
  }

  
  playAgain.addEventListener('click', playAgainFunc)
  playAgain.addEventListener('click', displayGameChoice)
  
  playerVsPlayer.addEventListener('click', () => {playerFormDisplay(playerForm)})
  playerVsPlayer.addEventListener('click', displayGameChoice)

  const setPlayers = function () {     
    game.players = [];
    
    game.players.push(PlayerMaker(playerOneEle.value));
    game.players.push(PlayerMaker(playerTwoEle.value));

    playerTurn(gameboard.game.players[0].name);
    drawScore();
    playerFormDisplay(playerForm);
  }

  const gameOver = function() {
    turnDisplay.style.visibility = 'hidden';
    gameBox.style.visibility = 'hidden';
    pTwoBox.style.visibility = 'hidden';
    pOneBox.style.visibility = 'hidden';
  }

  function handleForm(e) {
    e.preventDefault();

    setPlayers();
    playGame();
    showGame();
    popUps.scoreBoxDisplayShow()
  }

  formTarget.addEventListener('submit', handleForm)


  const drawScore = function () {
    pOneScoreNum.textContent = `${game.players[0].score}`;
    pTwoScoreNum.textContent = `${game.players[1].score}`;

    playOneScore.textContent = `${game.players[0].name}\'s score.`;
    platTwoScore.textContent = `${game.players[1].name}\'s score.`;
  }

  const playerTurn = function (name) {
    const whosTurn = document.querySelector('.whos_turn');

    whosTurn.textContent = ` ${name} `;
  }

  const colorMarker = function() {    
      const selectedSquare = document.querySelectorAll('.game_box')
    
      selectedSquare.forEach(marker => {
        if (marker.textContent === "X") {
          marker.style.color = 'black';
        } else if (marker.textContent === "O") {
          marker.style.color = 'maroon';
        }
      })
  }

  const winnerScreen = function (name) {
    const gameEnd = document.querySelector('.game_ended')
    const winnerDraw = document.querySelector('.winner')

    winnerDraw.textContent = `${name} is the winner!`;

    gameEnd.style.display = 'flex';
  }

  return { game, playerOneEle, playerTwoEle,
           drawScore, playerTurn, displayGameChoice, colorMarker, gameOver, winnerScreen, playerFormDisplay, showGame };
})();

const popUps = (() => {
  const winDiv = document.createElement('div')
  const winP = document.createElement('p')
  const containerElem = document.querySelector('.container')
  const scoreBox = document.querySelectorAll('.score_box');

  winDiv.appendChild(winP);
  winDiv.classList.add('winner_popup')
  winDiv.style.display = 'none';

  const turnWinner = function(name) {
    containerElem.appendChild(winDiv)    
    winP.textContent = `${name}`;

    winDiv.style = "position: absolute; display: flex; height: inherit; width: 100%; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.25);"

    setTimeout(() => {
      winDiv.style.display = 'none'
    }, 2000)
  }

  const scoreBoxDisplayShow = function() {
    scoreBox.forEach( box => box.style.display = 'flex' );
  }

  const scoreBoxDisplayHide = function () {
    scoreBox.forEach( box => box.style.display = 'none')
  }

  return { turnWinner, scoreBoxDisplayShow, scoreBoxDisplayHide }
})();

const versusComputer = (() => {
  const cpuFormDisplay = document.querySelector('.form_container_cpu')
  const cpuFormSubmit = document.querySelector('.cpu_form')
  const cpuPlayerOne = document.querySelector('#player_one_cpu')
  const playVsCpu = document.querySelector('.fairAI')  

  const handleForm = function(e) {
    e.preventDefault()
    popUps.scoreBoxDisplayHide();

    setPlayersCpu()
    playGame();
    gameboard.displayGameChoice();
    gameboard.showGame();
  }

  const CpuPlayerMaker = (name) => {
    let score = 0;
    let marker = 'X';
    
    if (gameboard.game.players.length > 0) {
      marker = 'O';
    } 
    
    return { name, score, marker };
  }

  const setPlayersCpu = function () {
    gameboard.playerFormDisplay(cpuFormDisplay);
     
    gameboard.game.players = [];
    
    gameboard.game.players.push(CpuPlayerMaker(cpuPlayerOne.value));
    gameboard.game.players.push(CpuPlayerMaker('Computer'));

    gameboard.playerTurn(gameboard.game.players[0].name);
  }

  cpuFormSubmit.addEventListener('submit', handleForm)
  playVsCpu.addEventListener('click', () => {gameboard.playerFormDisplay(cpuFormDisplay)})

})();

function playGame() {
  const selectedSquare = document.querySelectorAll('.game_box')
  let turns = 0;
  let round = 0;

  const once = {
    once: true
  }

  selectedSquare.forEach(cell => {
    cell.addEventListener('click', placeSquare, once);
  })
 
  // Handles populating gameboard values and placement based on user choice
  function placeSquare(e) {
    const arrIndex = Array.from(selectedSquare).indexOf(e.target);

    //Logic handling for AI
    const cpuPlace = function() {
      gameboard.playerTurn(gameboard.game.players[0].name);
      let track = 0;

      // Checks winner in AI game at max turns
      if (turns === 9) {
        setTimeout(() => {
        const gameString = gameboard.game.gameBoard.join("");
        const playOneWins = new RegExp(
          "^(XXX)|^.{3}(XXX)|(X.{2})(X.{2})(X.{2})|(XXX)$|(.{2}X)(.{2}X)(.{2}X)|(.X.)(.X.)(.X.)|(X.{2})(.X.)(.{2}X)|(.{2}X)(.X.)(X.{2})"
          );
        const playTwoWins = new RegExp (
          "^(OOO)|^.{3}(OOO)|(O.{2})(O.{2})(O.{2})|(OOO)$|(.{2}O)(.{2}O)(.{2}O)|(.O.)(.O.)(.O.)|(O.{2})(.O.)(.{2}O)|(.{2}O)(.O.)(O.{2})"
        );
        
        if (playOneWins.test(gameString)) {
          gameboard.game.players[0].score++;            
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
          turns = 0;
  
          for (let e of selectedSquare){
            e.innerHTML = " ";
          }

          selectedSquare.forEach(cell => {
            cell.removeEventListener('click', placeSquare)
          })

          if (gameboard.game.players[0].score === 1) {
            gameboard.game.players[0].score = 0;
            gameboard.game.players[1].score = 0;        
  
            setTimeout(() => {
              track++;
              gameboard.gameOver();
              return gameboard.winnerScreen(gameboard.game.players[0].name)
            }, 20);
          }
        } else if (playTwoWins.test(gameString)) {
          gameboard.game.players[1].score++;  
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
          turns = 0;
  
          for (let e of selectedSquare){
            e.innerHTML = " ";
          }

          selectedSquare.forEach(cell => {
            cell.removeEventListener('click', placeSquare)
          })

          if (gameboard.game.players[1].score === 1) {
            gameboard.game.players[0].score = 0;
            gameboard.game.players[1].score = 0;              
  
            setTimeout(() => {
              track++;
              gameboard.gameOver();    
              return gameboard.winnerScreen(gameboard.game.players[1].name);
            }, 20);
          }
        } else {
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        turns = 0;
        
        for (let e of selectedSquare){
          e.innerHTML = " ";
        }

        selectedSquare.forEach(cell => {
          cell.removeEventListener('click', placeSquare)
        })
        
        selectedSquare.forEach(cell => {
          cell.addEventListener('click', placeSquare, once);
        })

        return popUps.turnWinner('It\'s a tie!');
        }
      }, 25);        
      }

      //Finds empty value in the gameboard to place a marker
      while (track === 0 && turns != 9) {
        let randNum = Math.floor(Math.random() * 9);

        // Checks for a winner before max turns
        setTimeout(() => {
          const gameString = gameboard.game.gameBoard.join("");
          const playOneWins = new RegExp(
            "^(XXX)|^.{3}(XXX)|(X.{2})(X.{2})(X.{2})|(XXX)$|(.{2}X)(.{2}X)(.{2}X)|(.X.)(.X.)(.X.)|(X.{2})(.X.)(.{2}X)|(.{2}X)(.X.)(X.{2})"
            );
          const playTwoWins = new RegExp (
            "^(OOO)|^.{3}(OOO)|(O.{2})(O.{2})(O.{2})|(OOO)$|(.{2}O)(.{2}O)(.{2}O)|(.O.)(.O.)(.O.)|(O.{2})(.O.)(.{2}O)|(.{2}O)(.O.)(O.{2})"
          );
          
          if (playOneWins.test(gameString)) {
            gameboard.game.players[0].score++;            
            gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            turns = 0;
    
            for (let e of selectedSquare){
              e.innerHTML = " ";
            }

            selectedSquare.forEach(cell => {
              cell.removeEventListener('click', placeSquare)
            })

            if (gameboard.game.players[0].score === 1) {
              gameboard.game.players[0].score = 0;
              gameboard.game.players[1].score = 0;        
    
              setTimeout(() => {
                track++;
                gameboard.gameOver();
                return gameboard.winnerScreen(gameboard.game.players[0].name)
              }, 20);
            }
          } else if (playTwoWins.test(gameString)) {
            gameboard.game.players[1].score++;  
            gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
            turns = 0;
    
            for (let e of selectedSquare){
              e.innerHTML = " ";
            }

            selectedSquare.forEach(cell => {
              cell.removeEventListener('click', placeSquare)
            })

            if (gameboard.game.players[1].score === 1) {
              gameboard.game.players[0].score = 0;
              gameboard.game.players[1].score = 0;              
    
              setTimeout(() => {
                track++;
                gameboard.gameOver();    
                return gameboard.winnerScreen(gameboard.game.players[1].name);
              }, 20);
            }
          }
        }, 25);
        
        if (gameboard.game.gameBoard[randNum] != "X" && gameboard.game.gameBoard[randNum] != "O"){          
            gameboard.game.gameBoard.splice(randNum, 1, gameboard.game.players[1].marker);
            selectedSquare[randNum].innerHTML = gameboard.game.players[1].marker;
            selectedSquare[randNum].removeEventListener('click', placeSquare)
            gameboard.colorMarker();          
            turns++;
            track++;
            gameboard.playerTurn(gameboard.game.players[0].name);
        }         
      }
    }

     if (round % 2 === 0) {
      gameboard.playerTurn(gameboard.game.players[0].name);
      if (gameboard.game.players[1].name === 'Computer') {
        turns++;       
        gameboard.playerTurn(gameboard.game.players[0].name);
        gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[0].marker);
        e.target.innerHTML = gameboard.game.players[0].marker;
        e.target.removeEventListener('click', placeSquare);
        gameboard.colorMarker();
        gameboard.playerTurn(gameboard.game.players[1].name);
        popUps.turnWinner(`${gameboard.game.players[1].name} is thinking...`)
        setTimeout(() => {
          cpuPlace();        
        }, 2000)      
      } else if (turns % 2 === 0) {
        turns++;
        gameboard.playerTurn(gameboard.game.players[1].name);
        gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[0].marker);
        e.target.innerHTML = gameboard.game.players[0].marker;
        e.target.removeEventListener('click', placeSquare);
        gameboard.colorMarker();
      } else if (turns % 2 === 1) {
        turns++;
        gameboard.playerTurn(gameboard.game.players[0].name);
        gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[1].marker);
        e.target.innerHTML = gameboard.game.players[1].marker;
        e.target.removeEventListener('click', placeSquare);
        gameboard.colorMarker();
      }
    } else if (round % 2 === 1) {
      gameboard.playerTurn(gameboard.game.players[1].name);      
      if (turns % 2 === 0) {
        turns++;
        gameboard.playerTurn(gameboard.game.players[0].name);
        gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[1].marker);
        e.target.innerHTML = gameboard.game.players[1].marker;
        e.target.removeEventListener('click', placeSquare);
        gameboard.colorMarker();
      } else if (turns % 2 === 1) {
        turns++;
        gameboard.playerTurn(gameboard.game.players[1].name);
        gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[0].marker);
        e.target.innerHTML = gameboard.game.players[0].marker;
        e.target.removeEventListener('click', placeSquare);
        gameboard.colorMarker();
      } 
    }

    // Checks who wins or if it's a tie
    if (gameboard.game.players[1].name != 'Computer') {
      setTimeout(() => {
        const gameString = gameboard.game.gameBoard.join("");
        const playOneWins = new RegExp(
          "^(XXX)|^.{3}(XXX)|(X.{2})(X.{2})(X.{2})|(XXX)$|(.{2}X)(.{2}X)(.{2}X)|(.X.)(.X.)(.X.)|(X.{2})(.X.)(.{2}X)|(.{2}X)(.X.)(X.{2})"
          );
        const playTwoWins = new RegExp (
          "^(OOO)|^.{3}(OOO)|(O.{2})(O.{2})(O.{2})|(OOO)$|(.{2}O)(.{2}O)(.{2}O)|(.O.)(.O.)(.O.)|(O.{2})(.O.)(.{2}O)|(.{2}O)(.O.)(O.{2})"
        );
        
        if (playOneWins.test(gameString)) {
          gameboard.game.players[0].score++;
          gameboard.drawScore();
          
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
          turns = 0;
  
          for (let e of selectedSquare){
            e.innerHTML = " ";
          }
  
          selectedSquare.forEach(cell => {
            cell.removeEventListener('click', placeSquare)
          })
          
          selectedSquare.forEach(cell => {
            cell.addEventListener('click', placeSquare);
          })
  
          if (gameboard.game.players[0].score === 3) {
            gameboard.game.players[0].score = 0;
            gameboard.game.players[1].score = 0;
            gameboard.drawScore();
  
            setTimeout(() => {
              gameboard.gameOver();
              selectedSquare.forEach(cell => {
                cell.removeEventListener('click', placeSquare)
              })
              return gameboard.winnerScreen(gameboard.game.players[0].name)
            }, 20);
          } else {
            setTimeout(() => {
              round++;
              return popUps.turnWinner(`${gameboard.game.players[0].name} has won the round!`)
            }, 25);
          }                
        
        } else if (playTwoWins.test(gameString)) {
          gameboard.game.players[1].score++;
          gameboard.drawScore();
  
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
          turns = 0;
  
          for (let e of selectedSquare){
            e.innerHTML = " ";
          }
  
          selectedSquare.forEach(cell => {
            cell.removeEventListener('click', placeSquare)
          })
  
          selectedSquare.forEach(cell => {
            cell.addEventListener('click', placeSquare);
          })
  
          if (gameboard.game.players[1].score === 3) {
            gameboard.game.players[0].score = 0;
            gameboard.game.players[1].score = 0;
            gameboard.drawScore();
  
            setTimeout(() => {
              gameboard.gameOver();
              selectedSquare.forEach(cell => {
                cell.removeEventListener('click', placeSquare)
              })  
              return gameboard.winnerScreen(gameboard.game.players[1].name);
            }, 20);
          } else {
            setTimeout(() => {
              round++;            
              return popUps.turnWinner(`${gameboard.game.players[1].name} has won the round!`);
            }, 25);  
          }        
        } else if (turns === 9) {
          gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
          gameboard.drawScore();
          turns = 0;
  
          for (let e of selectedSquare){
            e.innerHTML = " ";
          }
  
          selectedSquare.forEach(cell => {
            cell.addEventListener('click', placeSquare, once);
          })
  
          return popUps.turnWinner('It\'s a tie!');
        }
      }, 25);
    }
  }  
}
