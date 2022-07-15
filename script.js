const gameboard = (() => { 
  const playerOneEle = document.querySelector('#player_one')
  const playerTwoEle = document.querySelector('#player_two')
  const addPlayers = document.querySelector('#add_players')
  
  let game = {
    gameBoard: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
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

  return { game }
})();

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
