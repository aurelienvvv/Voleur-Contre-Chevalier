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