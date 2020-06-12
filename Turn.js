class Turn {
    constructor() {
        this.player = Data.currentPlayer;
        this.playerPosition = $(`[data-player=${this.player.dataAttr}]`);
        this.currentPlayerWeapon = this.player.weapon;

        // variables pour les déplacements
        this.dataX = this.playerPosition.data('x');
        this.dataY = this.playerPosition.data('y');
        this.dataXMin = this.dataX - 3;
        this.dataXMax = this.dataX + 4;
        this.dataYMin = this.dataY - 3;
        this.dataYMax = this.dataY + 4;

        this.displayInfosPlayer();

        // ajoute les classes can-go aux axes x et y
        this.whereCanGo();

        // limites can-go à 3 cases en x et en y
        this.loopCanGo(0, this.dataXMin, 'data-x');
        this.loopCanGo(this.dataXMax, 10, 'data-x');
        this.loopCanGo(0, this.dataYMin, 'data-y');
        this.loopCanGo(this.dataYMax, 10, 'data-y');

        // empeche de traverser les murs
        this.checkWalls();

        $(".can-go").on('click', (e) => {
            this.$obj = $(e.currentTarget);
            this.endPlayerDataX = this.$obj.data('x');
            this.endPlayerDataY = this.$obj.data('y');
            this.startPlayerDataX = Data.startTurnPosition.data('x');
            this.startPlayerDataY = Data.startTurnPosition.data('y');

            // met à jour la position du joueur sur la case
            this.playerMoveUpdateDom();

            // boucles de récupération des armes :
            // si le joueur se déplace de la gauche vers la droite
            if (this.startPlayerDataY === this.endPlayerDataY && this.startPlayerDataX <= this.endPlayerDataX) {
                $(`[data-player=${this.player.dataAttr}]`).removeClass('to-left');
                this.loopMove(this.startPlayerDataX, this.endPlayerDataX, this.endPlayerDataY, 'data-x', 'data-y');
            }

            // si le joueur se déplace de la droite vers la gauche
            else if (this.startPlayerDataY === this.endPlayerDataY && this.startPlayerDataX >= this.endPlayerDataX) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('to-left');
                this.loopMove(this.endPlayerDataX, this.startPlayerDataX, this.endPlayerDataY, 'data-x', 'data-y');
            }

            // si le joueur se déplace de haut en bas
            else if (this.startPlayerDataX === this.endPlayerDataX && this.startPlayerDataY <= this.endPlayerDataY) {
                this.loopMove(this.startPlayerDataY, this.endPlayerDataY, this.endPlayerDataX, 'data-y', 'data-x');
            }

            // si le joueur se déplace de bas en haut
            else if (this.startPlayerDataX === this.endPlayerDataX && this.startPlayerDataY >= this.endPlayerDataY) {
                this.loopMove(this.endPlayerDataY, this.startPlayerDataY, this.endPlayerDataX, 'data-y', 'data-x');
            };

            // sélectionne l'autre joueur
            Utils.selectPlayer();

            // relance un tour
            new Turn();
        });

        $('.attack-enemy').on('click', () => {
            this.enemy = game.arrOfPlayers.filter(player => this.player.dataAttr !== player.dataAttr);

            // dégat selon l'arme possédée
            if (this.currentPlayerWeapon.damage) {
                this.enemy[0].life -= this.currentPlayerWeapon.damage;
            } else {
                this.enemy[0].life -= 2;
            }

            if (this.enemy[0].life <= 0) {
                // si l'ennemi n'a plus de vie, affiche l'écran de fin
                $('.win-screen').addClass('active');
                $('.img-winner').addClass(this.player.dataAttr);
                $('.winner-win-text').text(`${this.player.name}`)

            } else {
                // sinon met à jour les classes du DOM
                this.playerAttackUpdateDom();

                // met les données du tableau du joueur
                this.enemy[0].updatePlayerDom(this.enemy[0]);

                // sélectionne l'autre joueur
                Utils.selectPlayer();

                // relance un tour
                new Turn();
            }
        })
    };

    displayInfosPlayer() {
        // met à jour l'ecran d'affichage du joueur
        this.playerAttr = this.player.dataAttr;

        $(`[data-player]`).removeClass('current-player');
        $(`.players-wrapper .player`).removeClass('active');
        $(`.players-wrapper .player.${this.playerAttr}`).addClass('active');
        $(`[data-player = ${this.playerAttr}]`).addClass('current-player');
        Data.startTurnPosition = $('.current-player');
    };

    whereCanGo() {
        // donne accès aux cases, 3 cases en y, 3 cases en x
        $(`[data-x = ${this.dataX}], [data-y = ${this.dataY}]`).addClass('can-go');
        $(`[data-x = ${this.dataX}][data-y = ${this.dataY}]`).removeClass('can-go');
        $('.player.can-go').addClass('attack-enemy').removeClass('can-go');
    };

    loopCanGo(startLoop, endLoop, dataAttr) {
        for (let i = startLoop; i < endLoop; i++) {
            $(`[${dataAttr} = ${i}]`).removeClass('can-go');
            $(`[${dataAttr} = ${i}]`).removeClass('attack-enemy');
        };
    };

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
    };

    loopMove(startLoop, endLoop, dataY, incrementAttribute, staticAttribute) {
        for (let i = startLoop; i <= endLoop; i++) {
            let $currentCell = $(`[${incrementAttribute}=${i}][${staticAttribute}=${dataY}]`);
            let cellWeapon = $currentCell.data('weapon');
            let weapon = game.arrOfWeapons.filter(weapon => weapon.dataAttr === cellWeapon);

            if (cellWeapon) {
                $currentCell.removeAttr('data-weapon').removeClass('weapon');

                $currentCell.attr('data-weapon', this.currentPlayerWeapon.dataAttr).addClass('weapon');

                this.player.weapon = weapon[0];
                this.player.updatePlayerDom(this.player);
            };
        };
    };

    playerMoveUpdateDom() {
        $(`.cell`).removeClass('can-go');
        $(`.cell`).removeClass('attack-enemy');
        $(`[data-player = ${Data.currentPlayer.dataAttr}]`).removeClass('player').removeAttr('data-player').removeClass('current-player');
        $(`[data-x = ${this.endPlayerDataX}][data-y = ${this.endPlayerDataY}]`).attr('data-player', Data.currentPlayer.dataAttr).addClass('player');
        $('.cell').off("click");
    };

    playerAttackUpdateDom() {
        $(`.cell`).removeClass('attack-enemy');
        $(`.cell`).removeClass('can-go');
        $(`[data-player = ${Data.currentPlayer.dataAttr}]`).removeClass('current-player');
        $('.cell').off("click");
    };
};
