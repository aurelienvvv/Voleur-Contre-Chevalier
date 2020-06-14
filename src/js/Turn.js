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

        // met à jour dom des joueurs
        this.displayInfosPlayer();

        // ajoute les classes can-go aux axes x et y
        this.whereCanGo();

        // limites can-go à 3 cases en x et en y
        this.loopCanGo(0, this.dataXMin, 'data-x');
        this.loopCanGo(this.dataXMax, 10, 'data-x');
        this.loopCanGo(0, this.dataYMin, 'data-y');
        this.loopCanGo(this.dataYMax, 10, 'data-y');


        // empêche de traverser les murs
        this.checkWalls();

        // check si les joueurs sont face à face
        this.checkEnemyForFight('x', this.dataX - 1, 'y', this.dataY);
        this.checkEnemyForFight('x', this.dataX + 1, 'y', this.dataY);
        this.checkEnemyForFight('y', this.dataY - 1, 'x', this.dataX);
        this.checkEnemyForFight('y', this.dataY + 1, 'x', this.dataX);

        // si duel : affichage des options d'attaque
        if ($('.fight-time').length) {
            $('.cell').removeClass('can-go');
            $(`.players-wrapper .${this.player.dataAttr} .fight-options`).addClass('active');
        };

        // au click sur le bouton de défense
        $(`.players-wrapper .${this.player.dataAttr} .btn-defense`).unbind().on('click', () => {
            this.openFightOptions();
            $('.cell').removeClass('attack-now');

            // ajoute true à protect du joueur en cours
            this.player.protect = true;
            $(`[data-player = ${this.player.dataAttr}]`).addClass('protect');

            this.fightCondition();
        });

        // au click sur le bouton d'attaque
        $(`.players-wrapper .${this.player.dataAttr} .btn-attack`).unbind().on('click', () => {
            this.openFightOptions();
            $('.cell').removeClass('attack-now');

            // dégat selon l'arme possédée
            if (this.currentPlayerWeapon.damage) {
                this.enemy[0].protect ? this.enemy[0].life -= this.currentPlayerWeapon.damage / 2 : this.enemy[0].life -= this.currentPlayerWeapon.damage;
            } else {
                this.enemy[0].protect ? this.enemy[0].life -= 1 : this.enemy[0].life -= 2;
            }

            $(`[data-player = ${this.enemy[0].dataAttr}]`).removeClass('protect');

            // classe qui ajoute une animation visuelle
            $('.current-player').addClass('attack-now');

            // retire true à protect de l'ennemie
            this.enemy[0].protect = false;
            this.fightCondition();
        });

        // au click sur une case accessible
        $(".can-go").on('click', (e) => {
            this.$obj = $(e.currentTarget);
            this.endPlayerDataX = this.$obj.data('x');
            this.endPlayerDataY = this.$obj.data('y');
            this.startPlayerDataX = Data.startTurnPosition.data('x');
            this.startPlayerDataY = Data.startTurnPosition.data('y');
            this.startOrientation;

            // met à jour la position du joueur sur la case
            this.playerMoveUpdateDom();

            // boucles de récupération des armes :
            // si le joueur se déplace de la gauche vers la droite
            if (this.startPlayerDataY === this.endPlayerDataY && this.startPlayerDataX <= this.endPlayerDataX) {
                $(`[data-player=${this.player.dataAttr}]`).removeClass('to-left');
                this.startOrientation = true;
                this.loopMove(this.startPlayerDataX, this.endPlayerDataX, this.endPlayerDataY, 'data-x', 'data-y');
            }

            // si le joueur se déplace de la droite vers la gauche
            else if (this.startPlayerDataY === this.endPlayerDataY && this.startPlayerDataX >= this.endPlayerDataX) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('to-left');
                this.startOrientation = false;
                this.loopMove(this.endPlayerDataX, this.startPlayerDataX, this.endPlayerDataY, 'data-x', 'data-y');
            }

            // si le joueur se déplace de haut en bas
            else if (this.startPlayerDataX === this.endPlayerDataX && this.startPlayerDataY <= this.endPlayerDataY) {
                this.startOrientation = true;
                this.loopMove(this.startPlayerDataY, this.endPlayerDataY, this.endPlayerDataX, 'data-y', 'data-x');
            }

            // si le joueur se déplace de bas en haut
            else if (this.startPlayerDataX === this.endPlayerDataX && this.startPlayerDataY >= this.endPlayerDataY) {
                this.startOrientation = false;
                this.loopMove(this.endPlayerDataY, this.startPlayerDataY, this.endPlayerDataX, 'data-y', 'data-x');
            };

            // sélectionne l'autre joueur
            Utils.selectPlayer();

            // relance un tour
            new Turn();
        });
    };

    displayInfosPlayer() {
        // met à jour l'ecran d'affichage du joueur
        this.playerAttr = this.player.dataAttr;

        $(`[data-player]`).removeClass('current-player');
        $(`.players-wrapper .player`).removeClass('active');
        $(`.players-wrapper .player.${this.playerAttr}`).addClass('active');
        $(`[data-player = ${this.playerAttr}]`).addClass('current-player');
        $(`body`).addClass(`${this.playerAttr}`);
        Data.startTurnPosition = $('.current-player');
    };

    whereCanGo() {
        // donne accès aux cases, 3 cases en y, 3 cases en x
        $(`[data-x = ${this.dataX}], [data-y = ${this.dataY}]`).addClass('can-go');
        $(`[data-x = ${this.dataX}][data-y = ${this.dataY}]`).removeClass('can-go');
        $('.can-go.player').removeClass('can-go');
    };

    loopCanGo(startLoop, endLoop, dataAttr) {
        for (let i = startLoop; i < endLoop; i++) {
            $(`[${dataAttr} = ${i}]`).removeClass('can-go');
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

    loopMove(startLoop, endLoop, staticDataYX, incrementAttribute, staticAttribute) {
        for (let i = startLoop; i <= endLoop; i++) {
            let $currentCell = $(`[${incrementAttribute}=${i}][${staticAttribute}=${staticDataYX}]`);
            let cellWeapon = $currentCell.attr('data-weapon');
            let weapon = game.arrOfWeapons.filter(weapon => weapon.dataAttr === cellWeapon);
            let canTakeWeapon = true;

            // quand un joueur passe sur une arme
            if (cellWeapon) {
                // quand un joueur arrive sur une case avec une arme, rien ne se passe
                // permet d'empecher que le joueur pose une arme en arrivant sur une case et la reprenne en partant
                if (this.player.weapon !== 'Aucune') {
                    if (($currentCell).hasClass('weapon player')) {
                        canTakeWeapon = false;
                    }
                }

                if (canTakeWeapon) {
                    // si il a déjà une arme : la remplace par celle qu'il a
                    if (this.player.weapon !== 'Aucune') {
                        $currentCell.addClass('weapon');
                        $currentCell.attr('data-weapon', this.player.weapon.dataAttr).removeClass('vide');
                        // sinon récupère l'arme
                    } else {
                        $currentCell.removeAttr('data-weapon').removeClass('weapon').addClass('vide');
                    }

                    // met à jour l'arme et le tableau du joueur
                    this.player.weapon = weapon[0];
                    $(`[data-x = ${this.endPlayerDataX}][data-y = ${this.endPlayerDataY}]`).attr('data-player-weapon', this.player.weapon.dataAttr);
                    this.player.updatePlayerDom(this.player);
                };
            };
        };
    };

    playerMoveUpdateDom() {
        $(`.cell`).removeClass('can-go');
        $(`.cell`).removeClass('attack-enemy');
        $(`[data-player = ${Data.currentPlayer.dataAttr}]`).removeClass(`player to-left`).removeAttr('data-player data-player-weapon').removeClass('current-player');
        $(`[data-x = ${this.endPlayerDataX}][data-y = ${this.endPlayerDataY}]`).attr('data-player', Data.currentPlayer.dataAttr).addClass('player');

        if (`${this.player.weapon}`) {
            $(`[data-x = ${this.endPlayerDataX}][data-y = ${this.endPlayerDataY}]`).attr('data-player-weapon', this.player.weapon.dataAttr);
        }

        $('.cell').off("click");
    };


    checkEnemyForFight(attrEnemy, positionEnemy, attr, position) {
        if ($(`[data-${attrEnemy} = ${positionEnemy}][data-${attr} = ${position}]`).hasClass('player')) {
            $(`[data-${attrEnemy} = ${positionEnemy}][data-${attr} = ${position}]`).addClass('attack-enemy');
            $('body').addClass('fight-time');

            // detecte la position de l'ennemi et ajoute une classe correspondante
            if (attrEnemy === "y" && positionEnemy === this.dataY - 1) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('top-enemy');

            } else if (attrEnemy === "y" && positionEnemy === this.dataY + 1) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('bottom-enemy');

            } else if (attrEnemy === "x" && positionEnemy === this.dataX + 1) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('right-enemy');
                $(`[data-player=${this.player.dataAttr}]`).removeClass('to-left');

            } else if (attrEnemy === "x" && positionEnemy === this.dataX - 1) {
                $(`[data-player=${this.player.dataAttr}]`).addClass('left-enemy');
                $(`[data-player=${this.player.dataAttr}]`).addClass('to-left');
            }
        };
    };

    fightCondition() {
        if (this.enemy[0].life <= 0) {
            // si l'ennemi n'a plus de vie, affiche l'écran de fin
            $('.win-screen').addClass('active');
            $('.img-winner').addClass(this.player.dataAttr);
            $('.winner-win-text').text(`${this.player.name}`)

        } else {
            // sinon met à jour les classes du DOM
            $(`[data-player = ${this.player.dataAttr}]`).removeClass('current-player');

            // met les données du tableau du joueur
            this.enemy[0].updatePlayerDom(this.enemy[0]);


            // sélectionne l'autre joueur
            Utils.selectPlayer();

            // relance un tour
            new Turn();
        };
    };

    openFightOptions() {
        this.enemy = game.arrOfPlayers.filter(player => this.player.dataAttr !== player.dataAttr);
        $(`.players-wrapper .fight-options`).removeClass('active');
    }
};
