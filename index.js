//js file
v
ar buttoncolours = ['red','blue','green','yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level =0;

$(document).keypress(function(){
    if(!started){

    $('#level-tittle').text('Level '+level);

    nextsequence();
    started = true;

    }
});

$('.btn').click(function(){
    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    playsound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }else{
        // var audiow = new Audio('./sounds/wrong.mp3');
        // audiow.play(); instead use 
        playsound('wrong');

        $('body').addClass('game-over');
        $('#level-tittle').text('Game Over, Press Any Key to Restart');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        startOver();
    }
}

function nextsequence() {
    
    userClickedPattern = [];
    level++;
    $('#level-tittle').text('Level '+level);

    // var n = Math.random();
    // var n = n*4;
    // n = Math.floor(n);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttoncolours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

    
}


function animatePress(currentcolour){
    // $('.btn').click.addClass('Pressed');
    //the current colour gets picked up from the function above where we are getting
    //the btn id through press , all the elemets are taking parameter from it only.
    $('#' + currentcolour).addClass('pressed');
    
    setTimeout(function(){
        $('#' + currentcolour).removeClass('pressed');
    },100);
}

function playsound(name){
//taking the name parameter from the above function where we getting the id through the btn click,
//its the first function above.
    var audio = new Audio('sounds/'+ name +'.mp3');
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
