


 const deck = document.querySelector(".deck");
 const cards = deck.querySelectorAll(".card");
 const moves = document.querySelector(".moves");
 const stars = document.querySelector(".stars");
 const timer = document.querySelector(".timer");
 const restart = document.querySelector(".restart");

 var open = [];
 var movesCounter = 0;
 var matchCounter = 0;

 var interval;
 var firstClick = true; // to start the timer when the user starts playing


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Restart by resetting the game to its initial state.
function inital(){

    open = [];
    deck.innerHTML = "";
    
    var arr = Array.from(cards); //Convert the "NodeList" to "List"
    arr = shuffle(arr);

    var frag = document.createDocumentFragment();
    arr.forEach( card => {

        card.className = "card"; //resetting the card.
        card.style.animation = "";
        frag.appendChild(card);
    });
    deck.appendChild(frag);


    movesCounter = 0;
    moves.innerHTML = 0;

    matchCounter = 0;

    frag = document.createDocumentFragment();
    for(var i = stars.children.length ; i < 3 ; i++){
        var element = document.createElement("li");
        element.innerHTML = "<i class=\"fa fa-star\"></i>"
        frag.appendChild(element);
    }
    stars.appendChild(frag);


    timer.innerHTML = "00:00";
    clearInterval(interval);
    firstClick = true; 

}


inital();

// Main event listener that contains the game logic.
deck.addEventListener("click" , function(e){

    let target = e.target;

    if(target.className == "card" && open.length < 2){

        if(firstClick){
            interval = setInterval(startTimer , 1000)
            firstClick = false;
        }
        incCounter(); // increment the moves counter and update the star rating if needed.

        if(open.length == 0){

            displayCard(target);
            open.push(target);

        }else{

            displayCard(target);
            open.push(target);
            var matched = matchCards();

            if(matched){

                matchCounter++;

                open[0].classList.remove("open" , "show");
                open[1].classList.remove("open" , "show");

                open[0].classList.add("match");
                open[1].classList.add("match");

                open[0].style.animation = "shake-vertical 0.8s";
                open[1].style.animation = "shake-vertical 0.8s";

                clearOpenList();


                if (matchCounter == 8) {
                    endGame();
                }

            }
            else{
                open[0].style.animation = "shake-horizontal 0.8s";
                open[1].style.animation = "shake-horizontal 0.8s";
                setTimeout(hideCards , 800); // Wait 800 ms before hiding unmatched cards.
            }


        }



    }

});

//EventListener for the restart button.
restart.addEventListener("click" , inital);



 function displayCard(card){

    card.classList.add("open" , "show");

 }

 function hideCards(){

    open[0].classList.remove("open" , "show");
    open[1].classList.remove("open" , "show");

    open[0].style.animation = "";
    open[1].style.animation = "";
    
    clearOpenList();
 }

 function matchCards(){

    return open[0].firstElementChild.className === open[1].firstElementChild.className;
    

 }

 function clearOpenList(){
     open = [];
 }

 function incCounter(){

    moves.innerHTML = ++movesCounter;

    if (movesCounter == 35) {
        stars.removeChild(stars.lastElementChild);
    }
    else if(movesCounter == 50){
        stars.removeChild(stars.lastElementChild);
    }

 }


// Custom Alert Box from (http://www.developphp.com/video/JavaScript/Custom-Alert-Box-Programming-Tutorial)
 function CustomAlert(){
    this.render = function(time , numOfStars){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = winH/2;
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Congratulations!!!";
        document.getElementById('dialogboxbody').innerHTML = `You finished the game in ${time}, and your rating is ${numOfStars + (numOfStars > 1 ? " stars" : " star")}`;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button> <button onclick="Alert.reStart()">Play again</button>';
    }
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
    }
    this.reStart = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        inital();
    }
}

var Alert = new CustomAlert();
 

 function endGame(){

    clearInterval(interval);
    Alert.render(timer.textContent , stars.children.length);

 }

 function startTimer(){
     
    var s = timer.textContent.slice(3,5);
    var m = timer.textContent.slice(0,2);


    if(s < 59){
        s++;
        if (s < 10) { s = '0' + s;}
    }
    else{
        s = 0;
        m++;
        if (m < 10) {m = '0' + m;}
        if (s < 10) { s = '0' + s;}
    }


    timer.textContent = `${m}:${s}`;
 }

 

 


