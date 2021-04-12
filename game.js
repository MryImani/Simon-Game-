var buttonColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startGame = false;
$(document).keypress(function (event) {
    if (!startGame ) {
        $('#level-title').text("level " + level);
        nextSequence();
        startGame = true;
    }
})
$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern);
})
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);

}
function playSound(name) {
    var newSound = new Audio("sounds/" + name + ".mp3");
    newSound.play();
}
function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed');
    setTimeout(function () { $('#' + currentColour).removeClass('pressed') }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }

    } else {

        playSound("wrong");
        $('body').addClass('game-over');
        $('#level-title').text("Game Over, Press A Key to Restart");
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200)
        startOver();

    }
}
function startOver() {
    startGame = false;
    gamePattern = [];
    level = 0;
}



