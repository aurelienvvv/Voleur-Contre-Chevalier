class Game {
    constructor() {
        this.weapon1 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon2 = new Weapon('Baton', 3, 'baton');
        this.weapon3 = new Weapon('Lance', 6, 'lance');
        this.weapon4 = new Weapon('Epee', 10, 'epee');
        this.arrOfWeapons = [this.weapon1, this.weapon2, this.weapon3, this.weapon4]

        this.playerOne = new Player('Voleur d\'or', 100, 'player1');
        this.playerTwo = new Player('Chevalier', 100, 'player2');
        this.arrOfPlayers = [this.playerOne, this.playerTwo];
        currentPlayer = selectRandom(this.arrOfPlayers);
        this.arrOfPlayers.map(player => player.updatePlayerDom(player));

        new Board(this.arrOfPlayers, this.arrOfWeapons);
        new Turn();
    };
};