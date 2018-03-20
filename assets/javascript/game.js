$(document).ready(function() {

// ================== GLOBAL VARIABLES
// ===================================

// dino objects
var julioDino = {
    id: "yellow",
    name: "Julio",
    healthPoints: 100,
	attackPower: 10,
    counterAttack: 5,
    isChosen: false,
    isActiveEnemy: false
};

var diegoDino = {
    id: "orange",
    name: "Diego",
    healthPoints: 80,
    attackPower: 30,
    counterAttack: 3,
    isChosen: false,
    isActiveEnemy: false
};

var andresDino = {
    id: "blue",
    name: "Andrés",
    healthPoints: 120,
    attackPower: 5,
    counterAttack: 10,
    isChosen: false,
    isActiveEnemy: false
}

var belenDino = {
    id: "purple",
    name: "Belén",
    healthPoints: 90,
    attackpower: 20,
    counterAttack: 30,
    isChosen: false,
    isActiveEnemy: false
}

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

    return ourDino;

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

    // add blink animation to direct user: need to put a delay somehow before i add this
    // $(".widget h2").addClass("opacityPulse-css");

    return enemyDino;

});

// onclick for ATTACK BUTTON that signals fight sequence. PERFORMED REPEATEDLY.
$(".widget").on("click", ".button", function() {
    console.log("You clicked attack! Good boy!");

    $(".widget #combat-text").text("Enemy took damage from that hit! Ow.");
});

// document ready closing tag
});