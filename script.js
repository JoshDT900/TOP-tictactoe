const gameboard = (() => { 
  const playerOneEle = document.querySelector('#player_one')
  const playerTwoEle = document.querySelector('#player_two')
  const addPlayers = document.querySelector('#add_players')
  
  let game = {
    gameBoard: [],
    players: []
  } 

  return { game, playerOneEle, playerTwoEle, addPlayers }
})();

function setPlayers(e) {
  e.preventDefault(); 
  gameboard.game.players = [];
  
  gameboard.game.players.push(PlayerMaker(gameboard.playerOneEle.value));
  gameboard.game.players.push(PlayerMaker(gameboard.playerTwoEle.value));
}


const PlayerMaker = (name) => {
  let score = 0;
  let marker = 'X';
  
  if (gameboard.game.players.length > 0) {
    marker = 'O'
  } 
  
  return { name, score, marker }
}

gameboard.addPlayers.addEventListener('click', setPlayers)



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
