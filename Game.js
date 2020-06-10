class Game {
    constructor() {
        this.weapon1 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon2 = new Weapon('Baton', 3, 'baton');
        this.weapon3 = new Weapon('Lance', 6, 'lance');
        this.weapon4 = new Weapon('Epee', 10, 'epee');
        this.weapon5 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon6 = new Weapon('Baton', 3, 'baton');
        this.weapon7 = new Weapon('Lance', 6, 'lance');
        this.weapon8 = new Weapon('Epee', 10, 'epee');
        this.weapon9 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon10 = new Weapon('Baton', 3, 'baton');
        this.weapon11 = new Weapon('Lance', 6, 'lance');
        this.weapon12 = new Weapon('Epee', 10, 'epee');
        this.weapon13 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon14 = new Weapon('Baton', 3, 'baton');
        this.weapon15 = new Weapon('Lance', 6, 'lance');
        this.weapon16 = new Weapon('Epee', 10, 'epee');
        this.arrOfWeapons = [this.weapon1, this.weapon2, this.weapon3, this.weapon4, this.weapon5, this.weapon6, this.weapon7, this.weapon8, this.weapon9, this.weapon10, this.weapon11, this.weapon12, this.weapon13, this.weapon14, this.weapon15, this.weapon16]

        this.playerOne = new Player('Voleur d\'or', 100, 'player1', 'Aucune');
        this.playerTwo = new Player('Chevalier', 100, 'player2', 'Aucune');
        this.arrOfPlayers = [this.playerOne, this.playerTwo];
        Data.currentPlayer = Utils.selectRandom(this.arrOfPlayers);
        this.arrOfPlayers.map(player => player.updatePlayerDom(player));

        new Board(this.arrOfPlayers, this.arrOfWeapons);
        new Turn();
    };
};