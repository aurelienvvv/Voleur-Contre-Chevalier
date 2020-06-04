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
        startTurnPosition = $('.current-player');

    };

    checkCellsAround(e) {
        let $obj = $(e.currentTarget);
        let dataX = $obj.data('x')
        let dataY = $obj.data('y')
        let dataXMin = dataX - 3;
        let dataXMax = dataX + 4;
        let dataYMin = dataY - 3;
        let dataYMax = dataY + 4;

        function whereCanGo() {
            $(`[data-x = ${dataX}], [data-y = ${dataY}]`).addClass('can-go');
            $(`[data-x = ${dataX}][data-y = ${dataY}]`).removeClass('can-go');

            for (let i = 0; i < dataXMin; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
            for (let i = dataXMax; i < 10; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
            for (let i = 0; i < dataYMin; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };
            for (let i = dataYMax; i < 10; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };
        }

        function checkWalls() {
            let wallsOnWay = $('.can-go.innacessible');

            wallsOnWay.each(function (index, elem) {
                let dataWallX = $(elem).data('x');
                let dataWallY = $(elem).data('y');


                if (dataX < dataWallX) {
                    for (let i = dataWallX; i < 10; i++) {
                        $(`[data-x = ${i}]`).removeClass('can-go');
                    }
                }

                else if (dataX > dataWallX) {
                    for (let i = dataWallX; i > -1; i--) {
                        $(`[data-x = ${i}]`).removeClass('can-go');
                    }
                }

                else if (dataY < dataWallY) {
                    for (let i = dataWallY; i < 10; i++) {
                        $(`[data-y = ${i}]`).removeClass('can-go');
                    }
                }

                else if (dataY > dataWallY) {
                    for (let i = dataWallY; i > -1; i--) {
                        $(`[data-y = ${i}]`).removeClass('can-go');
                    }
                }
            })
        }

        whereCanGo();
        checkWalls();

        $($obj).off("click");
    };

    movePlayer(e) {
        let $obj = $(e.currentTarget);
        let endPlayerDataX = $obj.data('x');
        let endPlayerDataY = $obj.data('y');
        let startPlayerDataX = startTurnPosition.data('x');
        let startPlayerDataY = startTurnPosition.data('y');

        function addWeaponsToDom(weapon) {
            if (weapon.length == true) {
                currentPlayer.weapon = weapon[0].name;
                currentPlayer.updatePlayerDom(currentPlayer)
            }
        }

        function takeWeapon() {
            // Si le joueur avant de la gauche vers la droite
            if (startPlayerDataY === endPlayerDataY && startPlayerDataX < endPlayerDataX) {
                for (let i = startPlayerDataX; i <= endPlayerDataX; i++) {
                    let dataWeapon = $(`[data-x = ${i}][data-y = ${endPlayerDataY}]`).data('weapon');
                    let weapon = game.arrOfWeapons.filter(weapon => weapon.dataAttr === dataWeapon);

                    // Si il y a une arme sur son passage on la retire de la case
                    $(`[data-x = ${i}][data-y = ${endPlayerDataY}]`).removeClass('weapon').removeAttr('data-weapon');

                    // on affiche l'arme sur le DOM
                    addWeaponsToDom(weapon)
                }
            }
            else if (startPlayerDataY === endPlayerDataY && endPlayerDataX < startPlayerDataX) {
                for (let i = endPlayerDataX; i <= startPlayerDataX; i++) {
                    let dataWeapon = $(`[data-x = ${i}][data-y = ${endPlayerDataY}]`).data('weapon');
                    let weapon = game.arrOfWeapons.filter(weapon => weapon.dataAttr === dataWeapon);

                    // Si il y a une arme sur son passage on la retire de la case
                    $(`[data-x = ${i}][data-y = ${endPlayerDataY}]`).removeClass('weapon').removeAttr('data-weapon');

                    // on affiche l'arme sur le DOM
                    addWeaponsToDom(weapon)
                }
            }
        }

        // Si la case cell à la classe 'can-go'
        if (($obj).hasClass('can-go')) {

            takeWeapon()

            // changements du DOM liés le déplacement du joueur
            $(`.cell`).removeClass('can-go');
            $(`[data-player = ${currentPlayer.dataAttr}]`).removeClass('player').removeAttr('data-player').removeClass('current-player');
            $(`[data-x = ${endPlayerDataX}][data-y = ${endPlayerDataY}]`).attr('data-player', currentPlayer.dataAttr).addClass('player');
            $('.cell').off("click");

            // sélection du joueur pour le prochain tour
            selectPlayer();

            // lancement du tour suivant
            new Turn();
        };
    };
};

let startTurnPosition;