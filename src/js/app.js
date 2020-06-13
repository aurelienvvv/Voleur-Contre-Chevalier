// Launch Game //
let game = new Game();

$('.reload-btn').on('click', () => {
    $('.win-screen').removeClass('active');
    game.clearGame();
    game = new Game();
});