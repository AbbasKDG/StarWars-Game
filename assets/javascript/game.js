var characterSelected = false;
var defenderSelected = false;
var character = {};
var defender = {};
var enemiesDefeated = 0;


gameOver = false;

// ----- Characters ----- //

var empire = {
  name: "Empire",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var resistance = {
  name: "Resistance",
  health: 100,
  baseAttack: 5,
  attack: 5
};



var clones = {
  name: "Clones",
  health: 180,
  baseAttack: 25,
  attack: 25
};



// initialize 
function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

// initialize enemy
function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

// 
function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}


function Reset() {
  
  $("#empire-char").children(".health").html(empire.health);
  $("#resistance-char").children(".health").html(resistance.health);
  $("#clones-char").children(".health").html(clones.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}


$(document).ready(function() {

  
  $("#restart").hide();

  //   Character Clicks //////////////////////
  $("#empire-char").on("click", function () {
   

    // choice
    if(characterSelected == false) {
      $("#game-message").empty();

      // character
      initializeCharacter(empire);
      characterSelected = true;

      
      $("#empire-char").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      
      if($("#empire-char").hasClass("enemy-character")) {
        $("#game-message").empty();

       
        initializeDefender(empire);
        defenderSelected = true;

        
        $("#empire-char").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#resistance-char").on("click", function () {
    

   
    if(characterSelected == false) {
      $("#game-message").empty();

     
      initializeCharacter(resistance);
      characterSelected = true;

      
      $("#resistance-char").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

     
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#resistance-char").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(resistance);
        defenderSelected = true;

        $("#resistance-char").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });



  $("#clones-char").on("click", function () {

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(clones);
      characterSelected = true;

      $("#clones-char").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {


      if($("#clones-char").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(clones);
        defenderSelected = true;

        $("#clones-char").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  // END Character Clicks ////////////////////

  // ATTACK BUTTON ////////////////////
  $("#attack").on("click", function() {

    

    // User is ready to attack the defender
    if (characterSelected && defenderSelected && !gameOver) {
      // User attacks the defender and decreases the defender's health points
      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked The " + defender.name + " for " + character.attack + " damage.<p>");

      // User's attack power increases
      character.attack = character.attack + character.baseAttack;

      // If defender is still alive, they counter attack the user
      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        // Attacked for ? or dead
        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>You were defeated :'( </p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        // Enemy Destroyed?
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

        // Win Condition?
        if (enemiesDefeated === 2) {
          gameOver = true;
          $("#game-message").html("<p>You have won the game!!!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>Select Player</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>Choose an enemy.</p>");
    }

    
  });

    // ATTACK BUTTON ////////////////////


  $("#restart").on("click", function() {
    

    Reset();
  });

}); 
