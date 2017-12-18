//Tekken RPG Game
//===========================================================
//1. Global Variables for each character with attack power, health, and counter
//No character is selected nor defender 
var playerSelected= false;
var defenderSelected= false;

//storing all characters
var character= {};
var defenders= {};

var gameOver = false;
var enemiesDefeated = 0;

//Created constructor function to define objects and their features; 
var Characters = {
    Bryanfury: {
        name: 'Bryanfury',
        baseAttackPower: 3,
        health: 120,
        attack: 10,
        },
    King: {
        name: 'King',
        baseAttackPower: 2,
        health: 100,
        attack: 11,
        },
    Kazuyamishima: {
        name: 'Kazuyamishima',
        baseAttackPower: 8,
        health: 90,
      	attack: 8,
        },
   Yoshimitsu: {
        name: 'Yoshimitsu',
        baseAttackPower: 1,
        health: 180,
        attack: 10,
        }
    };

// ----- Helper Functions ----- //


// This function will initialize the character value from the global object variables defined above
//Creating a function to render the selected character before player chooses player
function settingUpCharacter(chosenCharacter){
	character.name = chosenCharacter.name;
	character.health = chosenCharacter.health;
	character.baseAttackPower= chosenCharacter.baseAttackPower;
	character.attack= chosenCharacter.attack;
	character.counterAttack= chosenCharacter.counterAttack;
}
//Creating a function to render the selected defender before player chooses the player
function settingUpDefenders(chosenDefenders){
	console.log('looking at our chooice', chosenDefenders)
	defenders.name = chosenDefenders.name;
	defenders.health = chosenDefenders.health;
	defenders.baseAttackPower = chosenDefenders.baseAttackPower;
	defenders.attack = chosenDefenders.attack;
	character.counterAttack= chosenDefenders.counterAttack;
}

//moving other characters into enemy container grabbing their ID's/Class in html
function movingEnemiesToTheirContainer(){
	$('.character').removeClass('character').addClass("enemy-characters");
	$('#enemies-container').append($(".enemy-characters"));
	$('.enemy-characters').css("background-color", 'red');
}

//Now the game starts with this function
$(document).ready(function() {
	// $("#restart").hide();
	
	var audioElement = document.createElement("audio");
	audioElement.setAttribute("src", "Assets/moonlight.mp3");

	// Theme Button
	$(".theme-button").on("click", function () {
		audioElement.play();
	});
	    
//================ BRYAN FURY SECTION ======================\\
//Bryan Fury when clicked creates a function; console.log works :D
	$('#bryanfury-character').on('click', function(){
		console.log("Mwahahahahahahaha! Die!");

        //Player has not selected anything because we want to add more functionality to the character
		if(playerSelected === false){

            //When the player is established; grab the render variables to Bryan Fury
            //Now the character selected selected
			settingUpCharacter(Characters.Bryanfury);
			playerSelected = true;

            //display chosen player
            //Grabbing the ID character on HTML, then removing the ID and putting them into a container
			$("#bryanfury-character").removeClass("character").addClass("chosen-characters-container");
			$("#chosen-characters-container").append(this);
            
            //This is established earlier and calling back this function(line  61)
			movingEnemiesToTheirContainer()

        //If the playerSelected is selected and the defenderSelected has not than... 
		} else if(playerSelected === true && defenderSelected === false){
			if($("#bryanfury-character").hasClass("enemy-characters")){
				$('#message-container').empty();

                //Setting up the defenders against Bryan Furt
				settingUpDefenders(Characters.Bryanfury);
				defenderSelected = true;

                //Selecting Bryan Furt character, removing him and adding him into the defender zone
                $("#bryanfury-character").removeClass("enemy-characters").addClass("defender-character");
                //Grab all this information and put that into the defender zone
				$("#defender-container").append(this);
            	}
        }
    });

//================ KING SECTION ======================\\
//King when clicked creates a function; console.log works :D

	$('#king-character').on('click', function(){
		console.log("Hold on Marduk! After I'm through here, you're next!");

		if(playerSelected === false){

			settingUpCharacter(Characters.King);
			playerSelected = true;

			//display chosen player
			$('#king-character').removeClass('character').addClass('chosen-characters-container');
			$('#chosen-characters-container').append(this);

			movingEnemiesToTheirContainer()
		} else if(playerSelected === true && defenderSelected === false){
			if($('#king-character').hasClass('enemy-characters')){

				settingUpDefenders(Characters.King);
				defenderSelected = true;

				$('#king-character').removeClass('enemy-characters').addClass('defender-character');
				$('#defender-container').append(this);
			}
		}
	});

//================ KAZUYA MISHIMA SECTION ======================\\

	$('#kazuya-character').on('click', function () {
		console.log("Kisama ka.");

		if(playerSelected === false){

			settingUpCharacter(Characters.Kazuyamishima);
			playerSelected= true;

			$('#kazuya-character').removeClass('character').addClass('chosen-characters-container');
			$('#chosen-characters-container').append(this);

			movingEnemiesToTheirContainer()
		}else if(playerSelected === true && defenderSelected === false){
			if ($('#kazuya-character').hasClass('enemy-characters')) {

				settingUpDefenders(Characters.Kazuyamishima);
				defenderSelected = true;

				$('#kazuya-character').removeClass('enemy-characters').addClass('defender-character');
				$('#defender-container').append(this);
			}
		}
    });
    
//================ YOSHIMITISU SECTION ======================\\

	$("#yoshimitsu-character").on('click', function(){
		console.log("Shikisoku zekuu.");

		if(playerSelected === false){
			settingUpCharacter(Characters.Yoshimitsu)
			playerSelected= true;

			$('#yoshimitsu-character').removeClass('character').addClass('chosen-characters-container');
			$('#chosen-characters-container').append(this);

			movingEnemiesToTheirContainer()
		} else if (playerSelected === true && defenderSelected === false){
			if ($('#yoshimitsu-character').hasClass('enemy-characters')) {

				settingUpDefenders(Characters.Yoshimitsu);
				defenderSelected= true;

				$('#yoshimitsu-character').removeClass('enemy-characters').addClass('defender-character');
				$('#defender-container').append(this);
			}
		}
	});

	$('#attack-button').on("click", function(){
		console.log('You selected the attack button.');

		if(playerSelected && defenderSelected && gameOver === false){
			// if defender are being attacked by character chosen

			defenders.health = defenders.health - character.attack;
			$($(`#${defenders.name} p.health`)[0]).html(defenders.health);


			console.log(defenders.health);
			console.log(playerSelected);


			character.attack = character.attack + character.baseAttackPower;
			$('#message-container').html('You have attacked ' + character.name + ' with ' + character.attack + ' points.');
			console.log(character.health);

			character.health = character.health - defenders.attack;
			$($(`#${character.name} p.health`)[0]).html(character.health);
			console.log()


			if (character.health <= 0) {
				$('#message-container').html('You have died!');
			} else if (defenders.health <= 0) {
				enemiesDefeated++;
				defenderSelected = false;

				$('#defender-container').empty();

				//  		$('#enemies-container').removeClass('enemy-characters');
				// $('#defender-container').append(this);

				if (enemiesDefeated === 3) {
					gameOver = true;
					$('#message-container').html('You have won!');
					return;
				}
			}
		}
	});
});
