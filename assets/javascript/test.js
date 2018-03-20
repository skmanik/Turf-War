// let's test corresponding stats to an object value

var testDino1 = {
    name: "Billiam",
    healthPoints: 50,
    attackPower: 20,
    counterAttack: 10
}

var testDino2 = {
    name: "Gilliam",
    healthPoints: 80,
    attackpower: 70,
    counterAttack: 5
}

function updateStats() {

    $("#player-stats .health-bar").css("width", ourDino.healthPoints);
    $("#player-stats .cattack-bar").css("width", ourDino.counterAttack);
    $("#player-stats .attack-bar").css("width", ourDino.attackPower);

    $("#enemy-stats .health-bar").css("width", enemyDino.healthPoints);
    $("#enemy-stats .cattack-bar").css("width", enemyDino.counterAttack);
    $("#enemy-stats .attack-bar").css("width", enemyDino.attackPower);

};
