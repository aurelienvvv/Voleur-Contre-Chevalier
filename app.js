let weapons = [
    {
        name: 'Pierre',
        damage: '1',
        visuel: 'img/pierre.jpg'
    },
    {
        name: 'Couteau',
        damage: '3',
        visuel: 'img/pierre.jpg'
    },
    {
        name: 'Sabre',
        damage: '6',
        visuel: 'img/pierre.jpg'
    },
    {
        name: 'Sabre Laser',
        damage: '10',
        visuel: 'img/sabre-laser.jpg'
    }
];


function generateRandom(array) {
    return Math.floor(Math.random() * array.length);
}


function generateCell() {
    let stateOfCell = ['vide', 'innacessible', 'vide', 'vide', 'vide'];
    let state = stateOfCell[generateRandom(stateOfCell)];

    return cell = {
        state: state,
        x: 0,
        y: 0,
        weapon: ''
    };
};


function generateAllCells() {
    let arrCells = [];

    for (let i = 0; i < 100; i++) {
        arrCells.push(generateCell());
    };

    return arrCells
};


function displayCells(arrOfCells) {
    for (let arrCell of arrOfCells) {
        let containerCells = document.querySelector('.cells-container ul');
        containerCells.insertAdjacentHTML('beforeend', `<div class="cell ${arrCell.state}" x="${arrCell.x}" y="${arrCell.y}"></div>`);
    };
};


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


function launchCells() {
    let arrCells = generateAllCells();
    let cellsWithXY = addCoordonates(arrCells);
    displayCells(cellsWithXY);
};


launchCells();