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
        let state = Utils.selectRandom(stateOfCell);

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
        weapons.map(weapon => Utils.selectRandom(emptyCells).weapon = weapon);

        // vérifie les armes présentes dans l'objet cells
        let weaponsCheck = cells.filter(cell => cell.weapon);

        // si il n'y a pas assez d'armes, réajout des armes dans cells
        if (weaponsCheck.length !== weapons.length) {
            cells.map(cell => delete cell.weapon);
            weapons.map(weapon => Utils.selectRandom(emptyCells).weapon = weapon);
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
        players.map(player => Utils.selectRandom(emptyCells).player = player);

        // vérifie les armes présentes dans l'objet cells
        let playersCheck = cells.filter(cell => cell.player);

        // si il n'y a pas assez de joueurs, réajout des joueurs dans cells
        if (playersCheck.length !== players.length) {
            cells.map(cell => delete cell.player);
            players.map(player => Utils.selectRandom(emptyCells).player = player);
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


