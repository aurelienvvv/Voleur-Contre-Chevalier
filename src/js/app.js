
setInterval(function () {
    let randomWeapon = Utils.selectRandom(Data.weaponsValues);
    let randomAnimation = Utils.selectRandom(['weapons-rain-2', 'weapons-rain']);
    $('.weapon-decoration').css('background-image', `url('src/img/${randomWeapon.dataAttr}.png')`);
    $('.weapon-decoration').css('animation', `${randomAnimation} 2s infinite`);
}, 2000);

// Launch Game //
let game;

$('.start-btn').on('click', () => {
    game = new Game();
    $('.start-screen').removeClass('active');
})

$('.reload-btn').on('click', () => {
    $('.win-screen').removeClass('active');
    game.clearGame();
    game = new Game();
});

