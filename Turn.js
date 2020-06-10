class Turn {
    constructor() {
        this.player = Data.currentPlayer.dataAttr;

        this.displayInfosPlayer()

        this.checkCellsAround();
        this.whereCanGo();
        this.checkWalls();

        $(".can-go").on('click', (e) => this.movePlayer(e));

    };

    displayInfosPlayer() {
        this.playerAttr = this.player;

        $(`[data-player]`).removeClass('current-player');
        $(`.players-wrapper .player`).removeClass('active');
        $(`.players-wrapper .player.${this.playerAttr}`).addClass('active');
        $(`[data-player = ${this.playerAttr}]`).addClass('current-player');
        Utils.startTurnPosition = $('.current-player');

    };

    checkCellsAround() {
        // variables pour les cellules et le joueur
        this.$obj = $(`[data-player=${this.player}]`);
        this.dataX = this.$obj.data('x')
        this.dataY = this.$obj.data('y')
        this.dataXMin = this.dataX - 3;
        this.dataXMax = this.dataX + 4;
        this.dataYMin = this.dataY - 3;
        this.dataYMax = this.dataY + 4;
    };

    whereCanGo() {
        // donne accès aux cases, 3 cases en y, 3 cases en x
        $(`[data-x = ${this.dataX}], [data-y = ${this.dataY}]`).addClass('can-go');
        $(`[data-x = ${this.dataX}][data-y = ${this.dataY}]`).removeClass('can-go');

        for (let i = 0; i < this.dataXMin; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
        for (let i = this.dataXMax; i < 10; i++) { $(`[data-x = ${i}]`).removeClass('can-go'); };
        for (let i = 0; i < this.dataYMin; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };
        for (let i = this.dataYMax; i < 10; i++) { $(`[data-y = ${i}]`).removeClass('can-go'); };
    }

    checkWalls() {
        // détecte les murs et empêche le joueur de passer à travers
        let wallsOnWay = $('.can-go.innacessible');

        wallsOnWay.each((index, elem) => {
            let dataWallX = $(elem).data('x');
            let dataWallY = $(elem).data('y');


            if (this.dataX < dataWallX) {
                for (let i = dataWallX; i < 10; i++) {
                    $(`[data-x = ${i}]`).removeClass('can-go');
                }
            }

            else if (this.dataX > dataWallX) {
                for (let i = dataWallX; i > -1; i--) {
                    $(`[data-x = ${i}]`).removeClass('can-go');
                }
            }

            else if (this.dataY < dataWallY) {
                for (let i = dataWallY; i < 10; i++) {
                    $(`[data-y = ${i}]`).removeClass('can-go');
                }
            }

            else if (this.dataY > dataWallY) {
                for (let i = dataWallY; i > -1; i--) {
                    $(`[data-y = ${i}]`).removeClass('can-go');
                }
            }
        })
    }

    movePlayer(e) {
        this.$obj = $(e.currentTarget);
        this.endPlayerDataX = this.$obj.data('x');
        this.endPlayerDataY = this.$obj.data('y');
        this.startPlayerDataX = Utils.startTurnPosition.data('x');
        this.startPlayerDataY = Utils.startTurnPosition.data('y');

        this.playerMoveUpdateDom();
        this.takeWeapon();

        // sélection du joueur pour le prochain tour
        Utils.selectPlayer();

        // lancement du tour suivant
        new Turn();
    };

    addWeaponsToDom(weapon) {
        if (weapon.length) {
            Data.currentPlayer.weapon = weapon[0];
            Data.currentPlayer.updatePlayerDom(Data.currentPlayer);
        };
    };

    takeWeapon() {
        // Si le joueur se déplace de la gauche vers la droite
        if (this.startPlayerDataY === this.endPlayerDataY && this.startPlayerDataX <= this.endPlayerDataX) {
            this.loopMoveX(this.startPlayerDataX, this.endPlayerDataX, this.endPlayerDataY);
        }
    };

    loopMoveX(startLoop, endLoop, dataY) {
        for (let i = startLoop; i <= endLoop; i++) {
            // récupération de l'attribut de l'arme
            let dataWeapon = $(`[data-x = ${i}][data-y = ${dataY}]`).data('weapon');
            console.log(dataWeapon);

            // récupération de l'instance de l'arme avec l'attribut
            let weapon = game.arrOfWeapons.filter(weapon => weapon.dataAttr === dataWeapon);
            console.log(weapon[0]);

            // Si il y a une arme sur son passage on la retire de la case
            $(`[data-x = ${i}][data-y = ${dataY}]`).removeClass('weapon').removeAttr('data-weapon');
            console.log($(`[data-x = ${i}][data-y = ${dataY}]`));

            // Si le joueur a déjà une arme on la place à l'endroit de l'arme récupérée
            if (dataWeapon && Data.currentPlayer.weapon !== 'Aucune') {
                this.dataCurrentWeapon = Data.currentPlayer.weapon.dataAttr;
                $(`[data-x = ${i}][data-y = ${dataY}]`).addClass('weapon').attr('data-weapon', this.dataCurrentWeapon);
            }

            // on affiche l'arme sur le DOM et on l'ajoute joueur
            this.addWeaponsToDom(weapon);
        };
    }

    playerMoveUpdateDom() {
        $(`.cell`).removeClass('can-go');
        $(`[data-player = ${Data.currentPlayer.dataAttr}]`).removeClass('player').removeAttr('data-player').removeClass('current-player');
        $(`[data-x = ${this.endPlayerDataX}][data-y = ${this.endPlayerDataY}]`).attr('data-player', Data.currentPlayer.dataAttr).addClass('player');
        $('.cell').off("click");
    }
};