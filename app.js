// Séléction au hasard dans un tableau
function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Création d'une case avec une état
function generateCell() {
    let stateOfCell = ['vide', 'innacessible', 'vide', 'vide', 'vide'];
    let state = selectRandom(stateOfCell);

    return cell = {
        state: state,
        x: 0,
        y: 0
    };
};

// Génération de 100 cases
function generateAllCells() {
    let arrCells = [];

    for (let i = 0; i < 100; i++) {
        arrCells.push(generateCell());
    };

    return arrCells
};

// Ajout des coordonnées aux cases
function addCoordonates(arrCells) {
    let cellsWithCoordonates = [];
    let x = -1;
    let y = 0;

    for (let i = 0; i < arrCells.length; i++) {
        x += 1;

        if (x > 9) {
            y += 1;
            x = 0;
        };

        arrCells[i].x = x;
        arrCells[i].y = y;

        cellsWithCoordonates.push(arrCells[i]);
    };

    return cellsWithCoordonates;
};

// Ajout des armes aux cases
function addWeapons(cells) {
    const weapons = [
        {
            name: 'Poing Américain',
            damage: '1',
            visuel: 'img/poing.png'
        },
        {
            name: 'Baton',
            damage: '3',
            visuel: 'img/baton.png'
        },
        {
            name: 'Lance',
            damage: '6',
            visuel: 'img/lance.png'
        },
        {
            name: 'Epee',
            damage: '10',
            visuel: 'img/epee.png'
        }
    ];

    // retourne tableau des cases vides
    let emptyCells = cells.filter(cell => cell.state === 'vide');

    // ajoute les armes aux cases vides au hasard
    weapons.map(weapon => selectRandom(emptyCells).weapon = weapon);

    // retire le statut 'vide' aux cases avec une arme
    cells.filter(cell => cell.weapon).map(cell => cell.state = "");

    return cells
}

function addPlayers(cells) {
    const players = [
        {
            name: 'Player 1',
            life: 100,
            visuel: 'img/player-1.png'
        },
        {
            name: 'Player 2',
            life: 100,
            visuel: 'img/player-2.png'
        }
    ]

    // retourne tableau des cases vides
    let emptyCells = cells.filter(cell => cell.state === 'vide');

    players.map(player => selectRandom(emptyCells).player = player);

    return cells
}

// Affichage des cases dans le DOM
function displayCells(arrOfCells) {
    let containerCells = document.querySelector('.cells-container ul');

    for (let arrCell of arrOfCells) {

        if (arrCell.weapon) {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell weapon ${arrCell.state}" data-x="${arrCell.x}" data-y="${arrCell.y}">
            <img src=${arrCell.weapon.visuel} alt="${arrCell.weapon.name}">
            </li>`);
        } else if (arrCell.player) {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell ${arrCell.state}" data-x="${arrCell.x}" data-y="${arrCell.y}">
            <img src=${arrCell.player.visuel} alt="${arrCell.player.name}">
            </li>`);
        } else {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell ${arrCell.state}" data-x="${arrCell.x}" data-y="${arrCell.y}"></li>`);
        }

    };
};

// Création du plateau de jeu
function createGame() {
    let arrCells = generateAllCells();
    let cellsWithXY = addCoordonates(arrCells);
    let cellsWithWeapons = addWeapons(cellsWithXY);
    let cellsWithPlayers = addPlayers(cellsWithWeapons);

    console.log(cellsWithPlayers);

    displayCells(cellsWithWeapons);
};


createGame();