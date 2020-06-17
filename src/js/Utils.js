class Utils {
    constructor() {

    }
    static selectRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    static selectPlayer() {
        $(`body`).removeClass(`player2`);
        $(`body`).removeClass(`player1`);
        let player = game.arrOfPlayers.filter(player => Data.currentPlayer !== player);
        Data.currentPlayer = player[0];

        return player[0];
    };

    static firstScreenStyle() {
        setInterval(function () {
            let randomWeapon = Utils.selectRandom(Data.weaponsValues);
            let randomAnimation = Utils.selectRandom(['weapons-rain-2', 'weapons-rain']);
            $('.weapon-decoration').css('background-image', `url('src/img/${randomWeapon.dataAttr}.png')`);
            $('.weapon-decoration').css('animation', `${randomAnimation} 2s infinite`);
        }, 2000);
    }
};