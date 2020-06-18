Utils.firstScreenStyle();

// Launch Game //
let game;

$('.start-btn').on('click', () => {
    $('.start-btn').off('click');
    game = new Game();
    $('.start-screen').removeClass('active');
})

$('.reload-btn').on('click', () => {
    $('.win-screen').removeClass('active');
    game.clearGame();
    game = new Game();
});
