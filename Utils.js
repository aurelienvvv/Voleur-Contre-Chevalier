class Utils {
    constructor() {

    }
    static selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    static selectPlayer() {
        let player = game.arrOfPlayers.filter(player => Data.currentPlayer !== player);
        Data.currentPlayer = player[0]
        return player[0];
    };
}