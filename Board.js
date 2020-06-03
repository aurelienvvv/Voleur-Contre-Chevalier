// Global functions //
function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
};


// Class Player //
class Player {
    constructor(name, life, dataAttr) {
        this.name = name;
        this.life = life;
        this.dataAttr = dataAttr;
    };

    updatePlayerDom(player) {
        $(`.${player.dataAttr} .wrapper-infos .name`).html(`${player.name}`);
        $(`.${player.dataAttr} .wrapper-infos .life`).html(`Vie : ${player.life} %`);
    }
};


// Class Weapon //
class Weapon {
    constructor(name, damage, dataAttr) {
        this.name = name;
        this.damage = damage;
        this.dataAttr = dataAttr;
    };
};


// Class Board //
class Board {
    constructor(arrOfPlayers, arrOfWeapons) {
        this.allCells = this.generateAllCells();
        this.addCoordonates(this.allCells);
        this.players = arrOfPlayers;
        this.weapons = arrOfWeapons;
        this.addWeapons(this.allCells, arrOfWeapons);
        this.addPlayers(this.allCells, arrOfPlayers);
        this.displayCells(this.allCells);
        this.cells = this.allCells;
    };

    // Création d'une case avec une état
    generateCell() {
        let stateOfCell = ['vide', 'innacessible', 'vide', 'vide', 'vide'];
        let state = selectRandom(stateOfCell);

        return {
            state: state,
            x: 0,
            y: 0
        };
    };

    // Génération de 100 cases
    generateAllCells() {
        let arrCells = [];

        for (let i = 0; i < 100; i++) {
            arrCells.push(this.generateCell());
        };

        return arrCells
    };


    // Ajout des coordonnées X et Y aux cases
    addCoordonates(allCells) {
        let cellsWithCoordonates = [];
        let x = -1;
        let y = 0;

        for (let i = 0; i < allCells.length; i++) {
            x += 1;

            if (x > 9) {
                y += 1;
                x = 0;
            };

            allCells[i].x = x;
            allCells[i].y = y;

            cellsWithCoordonates.push(allCells[i]);
        };

        return cellsWithCoordonates;
    };

    // Ajout des armes aux cases
    addWeapons(cells, weapons) {
        // retourne tableau des cases vides
        let emptyCells = cells.filter(cell => cell.state === 'vide');

        // ajoute les armes aux cases vides au hasard
        weapons.map(weapon => selectRandom(emptyCells).weapon = weapon);

        // vérifie les armes présentes dans l'objet cells
        let weaponsCheck = cells.filter(cell => cell.weapon);

        // si il n'y a pas assez d'armes, réajout des armes dans cells
        if (weaponsCheck.length !== weapons.length) {
            cells.map(cell => delete cell.weapon);
            weapons.map(weapon => selectRandom(emptyCells).weapon = weapon);
        };

        // retire la clé 'statut' aux cases avec une arme
        cells.filter(cell => cell.weapon).map(cell => delete cell.state);

        return cells;
    };

    // Ajout des joueurs
    addPlayers(cells, players) {
        // retourne tableau des cases vides
        let emptyCells = cells.filter(cell => cell.state === 'vide');

        // ajoute les 2 joueurs sur les cases vides au hasard
        players.map(player => selectRandom(emptyCells).player = player);

        // vérifie les armes présentes dans l'objet cells
        let playersCheck = cells.filter(cell => cell.player);

        // si il n'y a pas assez de joueurs, réajout des joueurs dans cells
        if (playersCheck.length !== players.length) {
            cells.map(cell => delete cell.player);
            players.map(player => selectRandom(emptyCells).player = player);
        };

        return cells
    };

    displayCells(cells) {
        let containerCells = document.querySelector('.cells-container ul');

        for (let cell of cells) {
            if (cell.weapon) {
                containerCells.insertAdjacentHTML('beforeend', `<li class="cell weapon" data-weapon=${cell.weapon.dataAttr} data-x="${cell.x}" data-y="${cell.y}"></li>`);
            } else if (cell.player) {
                containerCells.insertAdjacentHTML('beforeend', `<li class="cell player ${cell.state}" data-player=${cell.player.dataAttr} data-x="${cell.x}" data-y="${cell.y}"></li>`);
            } else {
                containerCells.insertAdjacentHTML('beforeend', `<li class="cell ${cell.state}" data-x="${cell.x}" data-y="${cell.y}"></li>`);
            };
        };
    };
};


// Class Turn
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

class Game {
    constructor() {
        this.weapon1 = new Weapon('Poing Américain', 1, 'poing');
        this.weapon2 = new Weapon('Baton', 3, 'baton');
        this.weapon3 = new Weapon('Lance', 6, 'lance');
        this.weapon4 = new Weapon('Epee', 10, 'epee');
        this.arrOfWeapons = [this.weapon1, this.weapon2, this.weapon3, this.weapon4]

        this.playerOne = new Player('Voleur d\'or', 100, 'player1');
        this.playerTwo = new Player('Chevalier', 100, 'player2');
        this.arrOfPlayers = [this.playerOne, this.playerTwo];

        this.arrOfPlayers.map(player => player.updatePlayerDom(player));

        new Board(this.arrOfPlayers, this.arrOfWeapons);
    };
};






function selectPlayer() {
    let player = game.arrOfPlayers.filter(player => currentPlayer !== player);
    currentPlayer = player[0]
    return player[0];
};

let game = new Game();

let currentPlayer = selectRandom(game.arrOfPlayers);



new Turn();
