$(document).ready(function() {

// ================== GLOBAL VARIABLES
// ===================================

// all dino objects
var julioDino = {
    id: "yellow",
    name: "Julio",
    healthPoints: 100,
	attackPower: 10,
    counterAttack: 13,
    baseAp: 10,
    isChosen: false,
    isActiveEnemy: false,
};

var diegoDino = {
    id: "orange",
    name: "Diego",
    healthPoints: 80,
    attackPower: 7,
    counterAttack: 15,
    baseAp: 7,
    isChosen: false,
    isActiveEnemy: false
};

var andresDino = {
    id: "blue",
    name: "Andrés",
    healthPoints: 120,
    attackPower: 5,
    counterAttack: 5,
    baseAp: 5,
    isChosen: false,
    isActiveEnemy: false
}

var belenDino = {
    id: "purple",
    name: "Belén",
    healthPoints: 90,
    attackPower: 12,
    counterAttack: 10,
    baseAp: 12,
    isChosen: false,
    isActiveEnemy: false
}

// chosen dinos updated outside their onclick functions
var ourDinoOut;
var enemyDinoOut;

// array for objects
var dinoArray = [julioDino, diegoDino, andresDino, belenDino];

// function that loops through objects
function getDinoWithId(matchId) {
    for (var i = 0; i < dinoArray.length; i++) {
        if (dinoArray[i].id === matchId) {

            return dinoArray[i];

        }
    }
}

// function that updates dino stats
function updateStats() {

    // player stats
    $("#player-stats .health-bar").css("width", ourDinoOut.healthPoints + "px");
    $("#player-stats .attack-bar").css("width", ourDinoOut.attackPower + "px");
    $("#player-stats .cattack-bar").css("width", ourDinoOut.counterAttack + "px");

    $("#player-stats .health .rs-label").text(ourDinoOut.healthPoints + " HP");
    $("#player-stats .attack .rs-label").text(ourDinoOut.attackPower + " AP");
    $("#player-stats .cattack .rs-label").text(ourDinoOut.counterAttack + " CP");


    // enemy stats
    $("#enemy-stats .health-bar").css("width", enemyDinoOut.healthPoints + "px");
    $("#enemy-stats .attack-bar").css("width", enemyDinoOut.attackPower + "px");
    $("#enemy-stats .cattack-bar").css("width", enemyDinoOut.counterAttack + "px");

    $("#enemy-stats .health .rs-label").text(enemyDinoOut.healthPoints + " HP");
    $("#enemy-stats .attack .rs-label").text(enemyDinoOut.attackPower + " AP");
    $("#enemy-stats .cattack .rs-label").text(enemyDinoOut.counterAttack + " CP");

};

// function that initiates battle sequence
var battleSequence = function(player, defender) {

    // enemy is hit for current AP
    defender.healthPoints = defender.healthPoints - player.attackPower;
    console.log("Enemy: " + defender.healthPoints);

    // current AP goes up
    player.attackPower = player.attackPower + player.baseAp;
    console.log("Player attack power increases! Oh baby!");
    console.log("Player: " + player.attackPower);

    // enemy counter attacks!
    player.healthPoints = player.healthPoints - defender.counterAttack

    updateStats();

}

// ======================== GAME START
// ===================================

// onclick that starts the game, ONLY PERFORMED ONCE
$(".dino-select").one("click", ".default-port", function() {

    console.log("Selected a dino!");

    // match HTML id to object id
    var chosenId = $(this).attr("id");
    var ourDino = getDinoWithId(chosenId);

    ourDino.isChosen = true;

    // remove blink animation on select
    $("#" + chosenId).removeClass("flipInY").addClass("flipInX");
    $(".dino-select h2").removeClass("opacityPulse-css");

    $(".dino-select h2").text("Player");

    // idle animation for chosen dino
    $("#" + chosenId + " img").attr("src", "assets/images/activedino.gif")
    console.log(ourDino);

    // remove unchosen dinos and add to enemy section
    for (var i = 0; i < dinoArray.length; i++) {
        if (dinoArray[i].isChosen === false) {

            var unchosenDino = dinoArray[i].id;

            $("#" + unchosenDino).detach().appendTo(".enemies");

        }
    }

    // add blink animation to direct user
    $(".enemies h2").addClass("opacityPulse-css");

    // update dino variable outside function
    ourDinoOut = ourDino;

});

// onclick that selects an enemy to fight, ONLY PERFORMED ONCE
$(".enemies").one("click", ".default-port", function() {

    // remove blink animation
    $(".enemies h2").removeClass("opacityPulse-css");
    console.log("Selected an enemy!");

    // match HTML id to object id
    var enemyId = $(this).attr("id");
    var enemyDino = getDinoWithId(enemyId);

    enemyDino.isActiveEnemy = true;
    console.log(enemyDino);

    // add new flip animation
    $("#" + enemyId).removeClass("flipInY").addClass("flipInX");

    // move selected enemy to defender section
    $("#" + enemyId).detach().appendTo("#active-enemy");

    // idle animation for chosen dino
    $("#" + enemyId + " img").attr("src", "assets/images/activedino.gif")

    // move up header
    $("header").css("height", "0px");

    // move in statbox
    $(".ready-stats").css("display", "block");

    // move in widget
    $(".widget").css("display", "block");

    // add blink animation to direct user
    $(".widget h2").addClass("opacityPulse-css");

    // update dino variable outside function
    enemyDinoOut = enemyDino;

    // display stats of dinos for battle; delayed for style
    setTimeout(function() {

        updateStats();

    }, 1000);

});

// onclick for ATTACK BUTTON that signals fight sequence. PERFORMED REPEATEDLY.
$(".widget").on("click", ".button", function() {

    //console.log("You clicked attack! Good boy!");
    //console.log(enemyDinoOut.healthPoints);

    if (enemyDinoOut.healthPoints > 0) {

        $(".widget #combat-text").text("Geez Julio! Use your words!");

        battleSequence(ourDinoOut, enemyDinoOut);
        console.log("You clicked attack! Good boy!");

    }

    else {

        console.log("You're dead!");
        $(".widget h2").removeClass("opacityPulse-css");
        $(".enemies h2").addClass("opacityPulse-css");

    }

});

// document ready closing tag
});