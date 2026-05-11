/* Variablen */

const spaceshipName = "Space Banana";
let life = 5;
let gold = 5;
let repairKits = 0;
const inventar = [];

/* Funktionen */

const nameRef = document.getElementById("data-name");
const lifeRef = document.getElementById("data-life");
const goldRef = document.getElementById("data-gold");
const reparaturSetsdRef = document.getElementById("data-reparatursets");
const errorReporterRef = document.getElementById("error-reporter");
const schildRef = document.getElementById("schild");
const inventarRef = document.getElementById("data-inventar");

function rendereStatus() {
    nameRef.innerText = spaceshipName;
    lifeRef.innerText = life;
    goldRef.innerText = gold;
    reparaturSetsdRef.innerText = repairKits;
    inventarRef.innerHTML = "";

    for (let index = 0; index < inventar.length; index++) {

        inventarRef.innerHTML += inventar[index];
    }
}

function takeDamage() {
    const damageRef = document.getElementById("damage");
    if (damageRef.value < 0) {
        errorReporterRef.value = 'Ungültige Angabe.';
        return;
    }
    else {
        life = life - Number(damageRef.value);
        if (life <= 0) {
            lifeRef.classList.add("game-over");
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
    if (gold >= totalRef.value) {
        gold -= totalRef.value;
        repairKits += Number(totalRef.value);

        for (let index = Number(totalRef.value); index > 0; index--) {
            inventar.push("Reparaturset ");
        }

    }
    else {
        errorReporterRef.value = 'Du hast nicht genug Geld.';
    }
    rendereStatus();

}

function useRepairKit() {

    if (inventar.includes("Reparaturset ")) {
        repairKits -= 1;
        inventar.splice(inventar.indexOf("Reparaturset "), 1);
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
    if (gold >= amount) {
        for (let index = amount; index > 0; index--) {
            inventar.push("Schild ");
            gold -= 1;
        }
    }
    else {
        errorReporterRef.value = 'Du hast nicht genug Geld.';
    }

    rendereStatus();
}

