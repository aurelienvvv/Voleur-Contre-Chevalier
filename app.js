// Global variables
let currentPlayer;


// Global functions //
function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function selectPlayer() {
    let player = game.arrOfPlayers.filter(player => currentPlayer !== player);
    currentPlayer = player[0]
    return player[0];
};

// Launch Game //
let game = new Game();