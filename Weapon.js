class Weapon {
    constructor(name, damage, dataAttr) {
        this.name = name;
        this.damage = damage;
        this.dataAttr = dataAttr;
    };

    generateWeapon(numberOfWeapons) {
        let arrOfWeapons = [];

        while (arrOfWeapons.length < numberOfWeapons) {
            for (let weaponsValue of Data.weaponsValues) {
                arrOfWeapons.push(new Weapon(weaponsValue.name, weaponsValue.damage, weaponsValue.dataAttr));
            }
        }

        while (arrOfWeapons.length !== numberOfWeapons) {
            arrOfWeapons.pop();
        }

        return arrOfWeapons;
    }
};