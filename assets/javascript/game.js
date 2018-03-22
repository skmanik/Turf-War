$(document).ready(function() {

    // ================== GLOBAL VARIABLES
    // ===================================

    // contains all dino objects
    var julioDino = {
        id: "yellow",
        name: "Julio",
        healthPoints: 100,
        attackPower: 10,
        counterAttack: 20,
        baseAp: 10,
        isChosen: false
    };

    var diegoDino = {
        id: "orange",
        name: "Diego",
        healthPoints: 95,
        attackPower: 7,
        counterAttack: 30,
        baseAp: 7,
        isChosen: false
    };

    var andresDino = {
        id: "blue",
        name: "Andres",
        healthPoints: 120,
        attackPower: 9,
        counterAttack: 10,
        baseAp: 9,
        isChosen: false,
    };

    var belenDino = {
        id: "purple",
        name: "Belen",
        healthPoints: 90,
        attackPower: 12,
        counterAttack: 15,
        baseAp: 12,
        isChosen: false,
    };

    // kill tracker
    var killTrack = 0;

    // chosen dinos updated outside their onclick functions
    var ourDinoOut;
    var enemyDinoOut;

    // array for objects
    var dinoArray = [julioDino, diegoDino, andresDino, belenDino];

    // function that loops through dino objects
    function getDinoWithId(matchId) {
        for (var i = 0; i < dinoArray.length; i++) {
            if (dinoArray[i].id === matchId) {

                return dinoArray[i];

            }
        }
    };

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
    function battleSequence(player, defender) {

        // enemy is hit for current AP
        defender.healthPoints = Math.max(defender.healthPoints - player.attackPower, 0);
        console.log("Enemy: " + defender.healthPoints);

        // current AP goes up
        player.attackPower = player.attackPower + player.baseAp;
        console.log("Player attack power increases! Oh baby!");
        console.log("Player: " + player.attackPower);

        // enemy counter attacks!
        if (defender.healthPoints > 0) {

            player.healthPoints = Math.max(player.healthPoints - defender.counterAttack, 0);

        }

        updateStats();

    };

    // function that lets user retry game
    $("#retry").click(function() {

        location.reload();

    });

    // function that replaces attack button with retry button
    function retryButton() {

        $(".widget .button").detach();
        $(".widget #retry").css("display", "block");                

    };

    // tooltip bc i forgot to display stats and i'm lazy now
    function toolTip(id, dino) {

        $("#" + id).attr("title", dino.healthPoints + " HP, " + dino.attackPower + " AP, " + dino.counterAttack + " CP" );

    };

    toolTip(julioDino.id, julioDino);
    toolTip(diegoDino.id, diegoDino);
    toolTip(andresDino.id, andresDino);
    toolTip(belenDino.id, belenDino);

    // ======================== GAME START
    // ===================================

    // onclick that starts the game, ONLY PERFORMED ONCE
    $(".dino-select").one("click", ".default-port", function() {

        console.log("Selected a dino!");

        // matches HTML id to object id
        var chosenId = $(this).attr("id");
        var ourDino = getDinoWithId(chosenId);

        // remembers this dino as player
        ourDino.isChosen = true;

        // removes blink animation on select
        $("#" + chosenId).removeClass("flipInY").addClass("flipInX");
        $(".dino-select h2").removeClass("opacityPulse-css");

        $(".dino-select h2").text("Player");

        // adds idle animation for chosen dino
        $("#" + chosenId + " img").attr("src", "assets/images/activedino.gif");
        console.log(ourDino);

        // removes unchosen dinos to enemy section
        for (var i = 0; i < dinoArray.length; i++) {
            if (dinoArray[i].isChosen === false) {

                var unchosenDino = dinoArray[i].id;

                $("#" + unchosenDino).detach().appendTo(".enemies");

            }
        }

        // adds blink animation to direct user
        $(".enemies h2").addClass("opacityPulse-css");

        // updates dino variable outside function
        ourDinoOut = ourDino;

    });

    // onclick that selects an enemy to fight, ONLY PERFORMED ONCE PER BATTLE
    $(".enemies").on("click", ".default-port", enemySelected);

    // function that pertains to above onclick
    function enemySelected() {

        // turns click off after one performance
        $(".enemies").off("click", ".default-port", enemySelected);

        // permits statbox animation
        $("#enemy-stats").removeClass("bounceOutDown").addClass("bounceInUp");

        // removes blink animation
        $(".enemies h2").removeClass("opacityPulse-css");
        console.log("Selected an enemy!");

        // matchs HTML id to object id
        var enemyId = $(this).attr("id");
        var enemyDino = getDinoWithId(enemyId);
        console.log(enemyDino);

        // adds new flip animation for dinos
        $("#" + enemyId).removeClass("flipInY").addClass("flipInX");

        // moves selected enemy to defender section
        $("#" + enemyId).detach().appendTo("#active-enemy");

        // adds idle animation for selected enemy
        $("#" + enemyId + " img").attr("src", "assets/images/activedino.gif");

        // moves up header
        $("header").css("height", "0px");

        // moves in statbox and hide irrelevant data
        $(".ready-stats").css("display", "block");
        $("#player-stats .cattack").css("display", "none");
        $("#enemy-stats .attack").css("display", "none");

        // moves in widget and allows attack button to be clicked
        $(".widget").css("display", "block");
        $(".widget .button").removeClass("grayout");
        $(".widget").on("click", ".button", attackClicked);

        // adds blink animation to direct user
        $(".widget h2").addClass("opacityPulse-css");

        // updates dino variable outside function
        enemyDinoOut = enemyDino;

        // displays stats of dinos for battle; delayed for style
        setTimeout(function() {

            updateStats();

        }, 1000);

    };

    // function that pertains to attack onclick
    function attackClicked() {

        // runs battle sequence for current dinos
        battleSequence(ourDinoOut, enemyDinoOut);
        $(".widget #combat-text").html(ourDinoOut.name + " kicks " + enemyDinoOut.name + ", who retaliates swiftly!" + "<br>" + ourDinoOut.name + " has " + ourDinoOut.healthPoints + " HP and " + enemyDinoOut.name + " has " + enemyDinoOut.healthPoints + " HP.");

        // runs when player is dead
        if (ourDinoOut.healthPoints <=0) {
            
            // replaces attack with retry button
            retryButton();

            // adds player death animation sequence
            $("#" + ourDinoOut.id + " img").attr("src", "assets/images/stilldino.gif");
            $("#" + ourDinoOut.id).fadeOut(1000, function() {

                $(this).detach();

            });
            $("#player-stats").fadeOut(1000);
            $(".widget h2").removeClass("opacityPulse-css");
            $(".widget h2").text("Game Over");
            $(".widget #combat-text").text("You lost the Turf War! Try again?");

            return;

        }
        // runs when enemy is dead
        else if (enemyDinoOut.healthPoints <= 0) {

            // turns off attack so it can't be pressed further
            $(".widget").off("click", ".button");
            $(".widget .button").addClass("grayout");

            // adds to kill count
            killTrack++;
            console.log(killTrack);

            // adds enemy death animation sequence        
            $("#" + enemyDinoOut.id + " img").attr("src", "assets/images/stilldino.gif");
            $("#" + enemyDinoOut.id).fadeOut(1000, function() {

                $(this).detach();

            });
            $("#enemy-stats").fadeOut(1000);
            $(".widget h2").removeClass("opacityPulse-css");
            $(".widget #combat-text").text("You defeated " + enemyDinoOut.name + "! Select another enemy.");

            // checks if game is over
            if (killTrack === dinoArray.length - 1) {

                console.log("Game over!");
                $(".widget h2").text("Game Over");
                $(".widget #combat-text").text("You won the Turf War! The plot of grass is yours! Oh baby!");
                retryButton();
                
                return;

            }        

            // adds blink animation to direct user back to enemy selection
            $(".enemies h2").addClass("opacityPulse-css");

            // permits enemy selection onclick event with 1 second delay
            setTimeout(function() {

                $(".enemies").on("click", ".default-port", enemySelected);

            }, 1000);

        }

    };

// document ready closing tag
});