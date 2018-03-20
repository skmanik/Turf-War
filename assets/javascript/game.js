$(document).ready(function() {

// ================== GLOBAL VARIABLES
// ===================================

// dino objects
var julioDino = {
    id: "yellow",
    healthPoints: 100,
	attackPower: 10,
    counterAttack: 5,
    isChosen: false,
    isActiveEnemy: false
};

var diegoDino = {
    id: "orange",
    healthPoints: 80,
    attackPower: 30,
    counterAttack: 3,
    isChosen: false,
    isActiveEnemy: false
};

var andresDino = {
    id: "blue",
    healthPoints: 120,
    attackPower: 5,
    counterAttack: 10,
    isChosen: false,
    isActiveEnemy: false
}

var belenDino = {
    id: "purple",
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

    // test animation
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

    // test animation
    $(".enemies h2").addClass("opacityPulse-css");

});

// onclick that selects an enemy to fight, ONLY PERFORMED ONCE
$(".enemies").one("click", ".default-port", function() {

    // test animation
    $(".enemies h2").removeClass("opacityPulse-css");
    console.log("Selected an enemy!");

    // match HTML id to object id
    var enemyId = $(this).attr("id");
    var enemyDino = getDinoWithId(enemyId);

    enemyDino.isActiveEnemy = true;
    console.log(enemyDino);

    // test animations
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

});


// document ready closing tag
});