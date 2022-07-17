const gameboard = (() => { 
  const playerOneEle = document.querySelector('#player_one')
  const playerTwoEle = document.querySelector('#player_two')
  const startGame = document.querySelector('.start_game')
  const playerForm = document.querySelector('.form_container')
  
  let game = {
    gameBoard: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    players: []
  }

  const PlayerMaker = (name) => {
    let score = 0;
    let marker = 'X';
    
    if (game.players.length > 0) {
      marker = 'O'
    } 
    
    return { name, score, marker }
  }

  const playerFormDisplay = function () {    
    playerForm.style.visibility = 'hidden' 
  }

  const setPlayers = function (e) {
    playerFormDisplay()
    e.preventDefault(); 
    game.players = [];
    
    game.players.push(PlayerMaker(playerOneEle.value));
    game.players.push(PlayerMaker(playerTwoEle.value));

    playerTurn(gameboard.game.players[0].name)
    drawScore()
  }

  const drawScore = function () {
    const playOneScore = document.querySelector('.pOne')
    const platTwoScore = document.querySelector('.pTwo')

    playOneScore.textContent = `${game.players[0].name}\'s score is: ${game.players[0].score}`
    platTwoScore.textContent = `${game.players[1].name}\'s score is: ${game.players[1].score}`
  }

  const playerTurn = function (name) {
    const whosTurn = document.querySelector('.whos_turn')

    whosTurn.textContent = `It is now ${name}'s turn.`
  }

  startGame.addEventListener('click', setPlayers)

  return { game, playerOneEle, playerTwoEle, drawScore, playerTurn }
})();

function playGame() {
  const selectedSquare = document.querySelectorAll('.game_box')
  let turns = 0;
 
  // Handles populating gameboard values and placement based on user choice
  function placeSquare(e) {
    const arrIndex = Array.from(selectedSquare).indexOf(e.target);    

    if (turns % 2 === 0) {
      turns++;
      gameboard.playerTurn(gameboard.game.players[1].name)
      gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[0].marker);
      e.target.innerHTML = gameboard.game.players[0].marker;
      e.target.removeEventListener('click', placeSquare);
    } else if (turns % 2 === 1) {
      turns++;
      gameboard.playerTurn(gameboard.game.players[0].name)
      gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[1].marker);
      e.target.innerHTML = gameboard.game.players[1].marker;
      e.target.removeEventListener('click', placeSquare);
    } 

    // Checks who wins or if it's a tie
    setTimeout(() => {
      const gameString = gameboard.game.gameBoard.join("")
      const playOneWins = new RegExp(
        "^(XXX)|^.{3}(XXX)|(X.{2})(X.{2})(X.{2})|(XXX)$|(.{2}X)(.{2}X)(.{2}X)|(.X.)(.X.)(.X.)|(X.{2})(.X.)(.{2}X)|(.{2}X)(.X.)(X.{2})"
        )
      const playTwoWins = new RegExp (
        "^(OOO)|^.{3}(OOO)|(O.{2})(O.{2})(O.{2})|(OOO)$|(.{2}O)(.{2}O)(.{2}O)|(.O.)(.O.)(.O.)|(O.{2})(.O.)(.{2}O)|(.{2}O)(.O.)(O.{2})"
      )
      
      if (playOneWins.test(gameString)) {
        gameboard.game.players[0].score++
        gameboard.drawScore()
        gameboard.playerTurn(gameboard.game.players[0].name)
        gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        turns = 0

        for (let e of selectedSquare){
          e.innerHTML = " ";
        }

        selectedSquare.forEach(cell => {
          cell.addEventListener('click', placeSquare)
        })

        if (gameboard.game.players[0].score === 3) {
          gameboard.game.players[0].score = 0;
          gameboard.game.players[1].score = 0;
          gameboard.drawScore()

          setTimeout(() => {
            return alert(`${gameboard.game.players[0].name} has won! Congratulations.`)
          }, 20);
        } else {
          setTimeout(() => {
            return alert(`${gameboard.game.players[0].name} has won the round!`);
          }, 25);
        }                
        
      } else if (playTwoWins.test(gameString)) {
        gameboard.game.players[1].score++
        gameboard.drawScore()
        gameboard.playerTurn(gameboard.game.players[0].name)
        gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        turns = 0

        for (let e of selectedSquare){
          e.innerHTML = " ";
        }

        selectedSquare.forEach(cell => {
          cell.addEventListener('click', placeSquare)
        })     

        if (gameboard.game.players[1].score === 3) {
          gameboard.game.players[0].score = 0;
          gameboard.game.players[1].score = 0;
          gameboard.drawScore()

          setTimeout(() => {
            return alert(`${gameboard.game.players[1].name} has won! Congratulations.`)
          }, 20);
        } else {
          setTimeout(() => {
            return alert(`${gameboard.game.players[1].name} has won the round!`);
          }, 25);  
        }
        
      } else if (turns === 9) {
        gameboard.game.gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        gameboard.drawScore()
        turns = 0

        for (let e of selectedSquare){
          e.innerHTML = " ";
        }

        selectedSquare.forEach(cell => {
          cell.addEventListener('click', placeSquare)
        })

        gameboard.playerTurn(gameboard.game.players[0].name)

        return alert('It\'s a tie!');
      }
    }, 25)
  }  

  selectedSquare.forEach(cell => {
    cell.addEventListener('click', placeSquare)
  })
}

playGame()

/*
User goes to site
user is asked for 2 player names
  player starts the game    
      player one chooses a cell
      player two chooses a cell
      repeat until grid is full or line of 3 in arow
        if a line of 3 occurs
          player 'x' gets 1 point
        else 
          empty grid
        best of 5 wins
        ask to play again
*/
