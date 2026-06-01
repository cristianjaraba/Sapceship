/* Variablen */

let spaceShip = {
    "spaceshipName": "Space Banana",
    "life": 5,
    "gold": 5,
    "repairKits": 0,
    "inventar": []
}

let enemy = {
    "enemyName": "Bananen Mixer",
    "life": 5
}

/* Funktionen */

const nameRef = document.getElementById("data-name");
const lifeRef = document.getElementById("data-life");
const goldRef = document.getElementById("data-gold");
const reparaturSetsdRef = document.getElementById("data-reparatursets");
const reporterRef = document.getElementById("reporter");
const schildRef = document.getElementById("schild");
const inventarRef = document.getElementById("data-inventar");

const enemyNameRef = document.getElementById("data-enemy-name");
const enemyLifeRef = document.getElementById("data-enemy-life");

function saveToLocalStorage() {
    localStorage.setItem("mySpaceship", JSON.stringify(spaceShip));
    reporterRef.value = "Spaceship im LocalStorage gespeichert.";
}

function getFromLocalStorage() {
    spaceShip = JSON.parse(localStorage.getItem("mySpaceship"));
    reporterRef.value = "Spaceship aus dem LocalStorage geladen.";
}

function rendereStatus() {
    nameRef.innerText = spaceShip.spaceshipName;
    lifeRef.innerText = spaceShip.life;
    goldRef.innerText = spaceShip.gold;
    reparaturSetsdRef.innerText = spaceShip.repairKits;
    if (spaceShip.inventar.length > 0) {
        inventarRef.innerHTML = spaceShip.inventar.join(", ") + ".";
    }
    rendereEnemyStatus();
}
function rendereEnemyStatus() {
    enemyNameRef.innerText = enemy.enemyName;
    enemyLifeRef.innerText = enemy.life;
}

function getProtections() {
    let protections = 0;
    for (let index = 0; index < spaceShip.inventar.length; index++) {
        if (spaceShip.inventar[index] == "Schild") {
            protections++;
        }
    }
    return protections;
}

function getProtectionsUsages(spaceshipDamageBeforeSchild, protections) {
    let protectionUsages = 0;
    if (spaceshipDamageBeforeSchild >= protections) {
        protectionUsages = protections;
    }
    else {
        protectionUsages = spaceshipDamageBeforeSchild;
    }
    if (protectionUsages > 0) {
        for (let index = protectionUsages; index > 0; index--) {
            spaceShip.inventar.splice(spaceShip.inventar.indexOf("Schild"), 1);
        }
    }
    return protectionUsages;
}

function createNewEnemy() {
    let enemyNames = ["Mr X", "Banenen Mixer II", "The Enemy"];
    if (enemy.life <= 0) {
        let enemyRandomName = enemyNames[Math.floor((Math.random() * enemyNames.length))];
        enemy= {
            "enemyName": enemyRandomName,
            "life": 5
        }
        reporterRef.value = `Neuer Gegner erstellt:

Name: ${enemy.enemyName}

Leben: ${enemy.life}`;
    rendereEnemyStatus();
    enemyLifeRef.classList.remove("game-over");
    }
    else{
        reporterRef.value = `Dein Gegner ${enemy.enemyName} hat noch ${enemy.life} Leben.`
    }
}

function generateRandomGoldAmount() {
    let randomGold = Math.floor(Math.random() * 10 + 1);
    spaceShip.gold = randomGold;
    rendereStatus();
}

function showMessageAfterDamage(spaceshipDamageBeforeSchild, protections, spaceshipDamageAfterSchild, protectionUsages, enemyDamage) {
    reporterRef.value += `${enemy.enemyName} wollte ${spaceShip.spaceshipName} erstmal ${spaceshipDamageBeforeSchild} Leben nehmmen. 

${spaceShip.spaceshipName} hatte ${protections} Schild(er) und deswegen wurden ihm ${spaceshipDamageAfterSchild} Leben genommen.

${spaceShip.spaceshipName} hat ${protectionUsages} Schild(er) benutzt.`;
    reporterRef.value += `\n\n${enemy.enemyName} wurde(n) ${enemyDamage} Leben genommen.`;
    if (enemy.life <= 0) {
        enemy.life = 0;
        enemyLifeRef.classList.add("game-over");
        reporterRef.value += '\n\nGAME OVER für den Genger.';
        generateRandomGoldAmount();

    }
    if (spaceShip.life <= 0) {
        spaceShip.life = 0;
        lifeRef.classList.add("game-over");
        reporterRef.value += '\n\nGAME OVER für das Spacheship.';
        disableButtons();
    }
}

function takeDamage() {
    reporterRef.value = '';
    const damageRef = document.getElementById("damage");
    if (damageRef.value < 0) {
        reporterRef.value = 'Ungültige Angabe.';
        return;
    }
    else {
        let enemyDamage = Number(damageRef.value);
        let spaceshipDamageBeforeSchild = Math.floor((Math.random() * 4) + 1);
        let protections = getProtections();//prüft ob das Spaceshift Schilder hat
        let protectionUsages = getProtectionsUsages(spaceshipDamageBeforeSchild, protections);//berechnet die Schilder, die benutzt werden sollen und
        //substrahiert die Menge aus dem Inventar
        let spaceshipDamageAfterSchild = spaceshipDamageBeforeSchild - protections;
        if (spaceshipDamageAfterSchild < 0) {
            spaceshipDamageAfterSchild = 0;
        }
        enemy.life = enemy.life - enemyDamage;
        spaceShip.life = spaceShip.life - spaceshipDamageAfterSchild;
        showMessageAfterDamage(spaceshipDamageBeforeSchild, protections, spaceshipDamageAfterSchild, protectionUsages, enemyDamage);
    }
    rendereEnemyStatus();
    rendereStatus();
}

function buyRepairKit() {
    const totalRef = document.getElementById("total");
    if (totalRef.value < 0) {
        reporterRef.value = 'Ungültige Angabe.';
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
        reporterRef.value = 'Du hast nicht genug Geld.';
    }
    rendereStatus();

}

function useRepairKit() {

    if (spaceShip.inventar.includes("Reparaturset")) {
        spaceShip.repairKits -= 1;
        spaceShip.inventar.splice(spaceShip.inventar.indexOf("Reparaturset"), 1);
    } else {
        reporterRef.value = 'Du hast nicht genug Reparaturset.';
    }
    rendereStatus();
}

function buySchild() {
    let amount = schildRef.value;
    if (schildRef.value < 0) {
        reporterRef.value = 'Ungültige Angabe.';
        return;
    }
    if (spaceShip.gold >= amount) {
        for (let index = amount; index > 0; index--) {
            spaceShip.inventar.push("Schild");
            spaceShip.gold -= 1;
        }
    }
    else {
        reporterRef.value = 'Du hast nicht genug Geld.';
    }

    rendereStatus();
}

function disableButtons() {
    const buttons = document.querySelectorAll("button");
    for (let button of buttons) {
        button.onclick = null;
    }
}
