class Player {
    constructor(name, life, dataAttr, weapon, protect) {
        this.name = name;
        this.life = life;
        this.dataAttr = dataAttr;
        this.weapon = weapon;
        this.protect = protect;
    };

    updatePlayerDom(player) {
        $(`.players-wrapper .${player.dataAttr} .wrapper-infos .name`).html(`${player.name}`);
        $(`.players-wrapper .${player.dataAttr} .wrapper-infos .life`).html(`Vie : ${player.life} %`);
        $(`.players-wrapper .${player.dataAttr} .wrapper-infos .weapon`).html(`Arme : ${player.weapon.name}`);


        if (!player.weapon.name) {
            $(`.${player.dataAttr} .wrapper-infos .weapon`).html(`Arme : Aucune`);
        };
    };
};