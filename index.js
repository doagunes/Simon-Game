
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;


$(document).keypress(function(){
    if(!start){
        nextSequence();
    }
    start = true;
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("h1").text("Level" + " " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}
   
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length -1 === userClickedPattern.length -1){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        level = level - 1;
        var endSound = new Audio("./sounds/wrong.mp3");
        endSound.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);

        $("h1").text("Game Over, Your Score Is: " + level + " Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
    userClickedPattern = [];
}
