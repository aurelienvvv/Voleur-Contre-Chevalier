class Turn {
    constructor() {
        this.player = currentPlayer.dataAttr;

        this.displayInfosPlayer()

        $(`[data-player=${this.player}]`).on('click', this.checkCellsAround);
        $(".cell").on('click', this.movePlayer);
    };

    displayInfosPlayer() {
        let playerAttr = this.player;

        $(`[data-player]`).removeClass('current-player');
        $(`.players-wrapper .player`).removeClass('active');
        $(`.players-wrapper .player.${playerAttr}`).addClass('active');
        $(`[data-player = ${playerAttr}]`).addClass('current-player');
    };

    checkCellsAround(e) {
        let $obj = $(e.currentTarget);
        let dataX = $obj.data('x')
        let dataY = $obj.data('y')
        let dataXMin = dataX - 3;
        let dataXMax = dataX + 4;
        let dataYMin = dataY - 3;
        let dataYMax = dataY + 4;

        $(`[data-x = ${dataX}], [data-y = ${dataY}]`).addClass('can-go');
        $(`[data-x = ${dataX}][data-y = ${dataY}]`).removeClass('can-go');

        for (let i = 0; i < dataXMin; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
        for (let i = dataXMax; i < 10; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
        for (let i = 0; i < dataYMin; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };
        for (let i = dataYMax; i < 10; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };

        $('.can-go.innacessible').removeClass('can-go');
    };

    movePlayer(e) {
        let $obj = $(e.currentTarget);
        let dataX = $obj.data('x')
        let dataY = $obj.data('y')


        if (($obj).hasClass('can-go')) {
            $(`.cell`).removeClass('can-go');
            $(`[data-player = ${currentPlayer.dataAttr}]`).removeClass('player').removeAttr('data-player').removeClass('current-player');
            $(`[data-x = ${dataX}][data-y = ${dataY}]`).attr('data-player', currentPlayer.dataAttr).addClass('player');
            $('.cell').off("click");
            // debugger
            selectPlayer();
            new Turn();
        };
    };
};