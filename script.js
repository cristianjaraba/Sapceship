/* Variablen */

let spaceShip = {
   spaceshipName : "Space Banana",
   life : 5,
   gold : 5,
   repairKits : 0,
   inventar : [] 
}

/* Funktionen */

const nameRef = document.getElementById("data-name");
const lifeRef = document.getElementById("data-life");
const goldRef = document.getElementById("data-gold");
const reparaturSetsdRef = document.getElementById("data-reparatursets");
const errorReporterRef = document.getElementById("error-reporter");
const schildRef = document.getElementById("schild");
const inventarRef = document.getElementById("data-inventar");

function rendereStatus() {
    nameRef.innerText = spaceShip.spaceshipName;
    lifeRef.innerText = spaceShip.life;
    goldRef.innerText = spaceShip.gold;
    reparaturSetsdRef.innerText = spaceShip.repairKits;
    inventarRef.innerHTML = spaceShip.inventar.join(", ") + ".";
}

function takeDamage() {
    const damageRef = document.getElementById("damage");
    if (damageRef.value < 0) {
        errorReporterRef.value = 'Ungültige Angabe.';
        return;
    }
    else {
        spaceShip.life = spaceShip.life - Number(damageRef.value);
        if (spaceShip.life <= 0) {
            spaceShip.lifeRef.classList.add("game-over");
            errorReporterRef.value = 'GAME OVER';
        }
    }
    rendereStatus();
}

function buyRepairKit() {
    const totalRef = document.getElementById("total");
    if (totalRef.value < 0) {
        errorReporterRef.value = 'Ungültige Angabe.';
        return;
    }
    if (spaceShip.gold >= totalRef.value) {
        spaceShip.gold -= totalRef.value;
        spaceShip.repairKits += Number(totalRef.value);

        for (let index = Number(totalRef.value); index > 0; index--) {
            spaceShip.inventar.push("Reparaturset");
        }

    }
    else {
        errorReporterRef.value = 'Du hast nicht genug Geld.';
    }
    rendereStatus();

}

function useRepairKit() {

    if (spaceShip.inventar.includes("Reparaturset")) {
        spaceShip.repairKits -= 1;
        spaceShip.inventar.splice(spaceShip.inventar.indexOf("Reparaturset"), 1);
    } else {
        errorReporterRef.value = 'Du hast nicht genug Reparaturset.';
    }
    rendereStatus();
}

function buySchild() {
    let amount = schildRef.value;
    if (schildRef.value < 0) {
        errorReporterRef.value = 'Ungültige Angabe.';
        return;
    }
    if (spaceShip.gold >= amount) {
        for (let index = amount; index > 0; index--) {
            spaceShip.inventar.push("Schild");
            spaceShip.gold -= 1;
        }
    }
    else {
        errorReporterRef.value = 'Du hast nicht genug Geld.';
    }

    rendereStatus();
}

