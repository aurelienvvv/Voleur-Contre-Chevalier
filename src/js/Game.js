class Game {
    constructor() {
        this.weapon = new Weapon;
        this.arrOfWeapons = this.weapon.generateWeapon(Data.nbOfWeapons);

        this.playerOne = new Player('Voleur', 100, 'player1', 'Aucune');
        this.playerTwo = new Player('Chevalier', 100, 'player2', 'Aucune');
        this.arrOfPlayers = [this.playerOne, this.playerTwo];
        Data.currentPlayer = Utils.selectRandom(this.arrOfPlayers);
        this.arrOfPlayers.map(player => player.updatePlayerDom(player));

        new Board(this.arrOfPlayers, this.arrOfWeapons);
        new Turn();
    };

    clearGame() {
        $('li').remove('.cell');

        $('.win-screen').removeClass('active');
        $('.img-winner').removeClass('player1');
        $('.img-winner').removeClass('player2');
        $('.winner-win-text').text(``);
        $('body').removeClass('fight-time');
    };
};