const gameboard = (() => { 
  const playerOneEle = document.querySelector('#player_one')
  const playerTwoEle = document.querySelector('#player_two')
  const addPlayers = document.querySelector('#add_players')
  
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

  const setPlayers = function (e) {
    e.preventDefault(); 
    game.players = [];
    
    game.players.push(PlayerMaker(playerOneEle.value));
    game.players.push(PlayerMaker(playerTwoEle.value));
  }

  addPlayers.addEventListener('click', setPlayers)

  return { game, playerOneEle, playerTwoEle }
})();

function playGame() {
  const selectedSquare = document.querySelectorAll('.game_box')
  let turns = 0;

  // Handles populating gameboard values and cell placement
  function placeSquare(e) {
    const arrIndex = Array.from(selectedSquare).indexOf(e.target);

    if (turns % 2 === 0) {
      turns++;
      gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[0].marker);
      e.target.innerHTML = gameboard.game.players[0].marker;
      e.target.removeEventListener('click', placeSquare);
    } else if (turns % 2 === 1) {
      turns++;
      gameboard.game.gameBoard.splice(arrIndex, 1, gameboard.game.players[1].marker);
      e.target.innerHTML = gameboard.game.players[1].marker;
      e.target.removeEventListener('click', placeSquare);
    } 

    // Checks who wins or if it's a tie
    setTimeout(() => {
      const gameString = gameboard.game.gameBoard.join("")
      
      if (/^(XXX)|^.{3}(XXX)|(X.{2})(X.{2})(X.{2})|(XXX)$/.test(gameString) ||
          /(.{2}X)(.{2}X)(.{2}X)/.test(gameString) ||
          /(.X.)(.X.)(.X.)/.test(gameString) ||
          /(X.{2})(.X.)(.{2}X)/.test(gameString) ||
          /(.{2}X)(.X.)(X.{2})/.test(gameString)) {
        return alert('Player One Has Won!')
      } else if (/^(OOO)|^.{3}(OOO)|(O.{2})(O.{2})(O.{2})|(OOO)$/.test(gameString) ||
                /(.{2}O)(.{2}O)(.{2}O)/.test(gameString) ||
                /(.O.)(.O.)(.O.)/.test(gameString) ||
                /(O.{2})(.O.)(.{2}O)/.test(gameString) ||
                /(.{2}O)(.O.)(O.{2})/.test(gameString)) {
          return alert('Player Two Has Won!');
        } else if (turns === 9) {
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
  player starts the game
    user is asked for 2 player names
    a 3x3 grid is generated
    scores are initialized
      player one chooses a cell
      player two chooses a cell
      repeat until grid is full
        if a line of 3 occurs
          player 'x' gets 1 point
        else 
          empty grid
        best of 5 wins
        ask to play again
*/
