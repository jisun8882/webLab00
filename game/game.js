"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function(){
	//when green button is clicked
	$('start').observe('click',function(){
		
		$('state').innerHTML = "Ready!";
		$('score').innerHTML = "0";
		

		clearInterval(targetTimer);
		clearInterval(trapTimer);
		clearInterval(instantTimer);

		setTimeout(startGame, 3000);

	});
	//when red button is clicked
	$('stop').observe ('click',stopGame);
});

function startGame(){

	var bloc = $$(".block");

	targetBlocks.length = 0;
	trapBlock = null;

	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);

	for (var i = 0; i < numberOfBlocks; i++){
		if (bloc[i].hasClassName("target")) {
			bloc[i].removeClassName("target");
		}
		else if (bloc[i].hasClassName("trap")) {
			bloc[i].removeClassName("trap");
		}
	}

	startToCatch();

}

function stopGame(){

	var bloc = $$(".block");

	$('state').innerHTML = "Stop";

	targetBlocks.length = 0;
	trapBlock = null;

	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);

	for (var i = 0; i < numberOfBlocks; i++){
		if (bloc[i].hasClassName("target")) {
			bloc[i].removeClassName("target");
		}
		else if (bloc[i].hasClassName("trap")) {
			bloc[i].removeClassName("trap");
		}
	}

	for (var i = 0; i < numberOfBlocks; i++){
		bloc[i].stopObserving("click");
	}

}

function startToCatch(){

	var bloc = $$(".block");
	var score = 0;
	
	$('state').innerHTML = "Catch!";

	targetTimer = setInterval(showtargetblock,1000);
	trapTimer = setInterval(showtarpblock,3000);

	for (var i = 0; i < numberOfBlocks; i++) {
        bloc[i].observe("click", eventhandler);
    }

}
//Randomly pick target block
function showtargetblock(){

	var bloc = $$(".block");

	if(targetBlocks.length > 4){
		alert("you lose");
		stopGame();
	}
	else{
		var temp = Math.floor(Math.random() * 9);
		
		while (bloc[temp].hasClassName("target") || temp == trapBlock) {
			temp = Math.floor(Math.random() * 9);
		}

		targetBlocks.push(temp);
		
		bloc[temp].addClassName("target");
	}
	
}
//Randomly pick trap block
function showtarpblock(){

	var bloc = $$(".block");
	var temp = Math.floor(Math.random() * 9);

	while (bloc[temp].hasClassName("target")) {
		temp = Math.floor(Math.random() * 9);
	}

	trapBlock = temp;

	bloc[temp].addClassName("trap");

	instantTimer = setTimeout(function() {
		trapBlock = null;
		bloc[temp].removeClassName("trap");
	}, 2000);


}
//event handler for blocks and calculate score
function eventhandler() {

	var bloc = $$(".block");
	var sel = this.getAttribute("data-index");
	var sco = parseInt($('score').innerHTML);


	if (bloc[sel].hasClassName("target")) {
		sco += 20;
		bloc[sel].removeClassName("target");
		targetBlocks.splice(targetBlocks.indexOf(sel),1);
	}
	else if (bloc[sel].hasClassName("trap")) {
		sco -= 30;
		bloc[sel].removeClassName("trap");
		trapBlock = null;
	}
	else {
		sco -= 10;
		bloc[sel].addClassName("wrong");

		instantTimer = setTimeout(function() {
			bloc[sel].removeClassName("wrong");
		}, 100);
	}

	$("score").innerHTML = sco ;
}