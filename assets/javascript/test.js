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

$("#player-stats .health-bar").css("width", testDino1.healthPoints);
$("#player-stats .cattack-bar").css("width", testDino1.counterAttack);
$("#player-stats .attack-bar").css("width", testDino1.attackPower);

$("#enemy-stats .health-bar").css("width", testDino2.healthPoints);
$("#enemy-stats .cattack-bar").css("width", testDino2.counterAttack);
$("#enemy-stats .attack-bar").css("width", testDino2.attackPower);
