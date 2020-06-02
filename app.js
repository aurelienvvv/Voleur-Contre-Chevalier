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
            dataAttr: 'poing'
        },
        {
            name: 'Baton',
            damage: '3',
            visuel: 'img/baton.png',
            dataAttr: 'baton'
        },
        {
            name: 'Lance',
            damage: '6',
            visuel: 'img/lance.png',
            dataAttr: 'lance'
        },
        {
            name: 'Epee',
            damage: '10',
            visuel: 'img/epee.png',
            dataAttr: 'epee'
        }
    ];

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
}

function addPlayers(cells) {
    const players = [
        {
            name: 'Player 1',
            life: 100,
            dataAttr: 'player1'
        },
        {
            name: 'Player 2',
            life: 100,
            dataAttr: 'player2'
        }
    ]

    // retourne tableau des cases vides
    let emptyCells = cells.filter(cell => cell.state === 'vide');

    // ajoute les 2 joueurs sur les cases vides au hasard
    players.map(player => selectRandom(emptyCells).player = player);

    return cells
}

// Affichage des cases dans le DOM
function displayCells(arrOfCells) {
    let containerCells = document.querySelector('.cells-container ul');
    for (let arrCell of arrOfCells) {
        if (arrCell.weapon) {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell weapon" data-weapon=${arrCell.weapon.dataAttr} data-x="${arrCell.x}" data-y="${arrCell.y}"></li>`);
        } else if (arrCell.player) {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell player ${arrCell.state}" data-player=${arrCell.player.dataAttr} data-x="${arrCell.x}" data-y="${arrCell.y}"></li>`);
        } else {
            containerCells.insertAdjacentHTML('beforeend', `<li class="cell ${arrCell.state}" data-x="${arrCell.x}" data-y="${arrCell.y}"></li>`);
        }

    };
};

// Création du plateau de jeu
function createGame() {
    let arrCells = generateAllCells();
    addCoordonates(arrCells);
    addWeapons(arrCells);
    addPlayers(arrCells);
    displayCells(arrCells);

    return arrCells;
};

createGame();

// au click sur une cellule, retourne les coordonées y, x
$('.cell').on("click", (e) => {
    let $obj = (e.currentTarget);
    let dataX = $obj.dataset.x;
    let dataY = $obj.dataset.y;

    // $('.cell').off("click");
});
