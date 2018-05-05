// - PODSTAWOWE INFO -
function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}
let totalScore = 0;
let playerPosition;
let chosenItem;
let keysPressed = {
    37: false,
    39: false
};
let savedScore = [0,0,0,0,0];
let activeElements = [];
let randomizingInterval;
let movingPlayerInterval;
let collisionsInterval;
let activeObjectFallingInterval;

// - OBIEKTY -

let playerNode = getElement('div.game-dude');
let playButton = getElement('.play');
let instructionButton = getElement('.instructions');
let instructionArea = getElement('.game-instruction');
let submitButton = document.querySelector(".sub-button");
let greyBackground = getElement('.grey-background');
let topScoresBoard = getElement('.top-score-board');


const gameItemsCollection = [
    {   name: "apple",
        height: 89,
        width: 75,
        radius: 45,
        image: "url('images/game_assets/apple.png')",
        points: -5,
        healthy: true
    },
    {   name: "carrot",
        height: 94,
        width: 100,
        radius: 47,
        image: "url('images/game_assets/carrot.png')",
        points: -5,
        healthy: true
    },
    {   name: "pear",
        height: 80,
        width: 80,
        radius: 40,
        image: "url('images/game_assets/pear.png')",
        points: -5,
        healthy: true
    },
    {   name: "aubergine",
        height: 83,
        width: 75,
        radius: 42,
        image: "url('images/game_assets/aubergine.png')",
        points: -5,
        healthy: true
    },
    {   name: "strawberry",
        height: 75,
        width: 75,
        radius: 37,
        image: "url('images/game_assets/strawberry.png')",
        points: -5,
        healthy: true
    },
    {   name: "fries",
        height: 92,
        width: 75,
        radius: 46,
        image: "url('images/game_assets/fries.png')",
        points: 5,
        healthy: false
    },
    {   name: "cupcake",
        height: 83,
        width: 85,
        radius: 42,
        image: "url('images/game_assets/cupcake.png')",
        points: 5,
        healthy: false
    },
    {   name: "pizza",
        height: 92,
        width: 95,
        radius: 46,
        image: "url('images/game_assets/pizza.png')",
        points: 10,
        healthy: false
    },
    {   name: "icecream",
        height: 90,
        width: 95,
        radius: 45,
        image: "url('images/game_assets/icecream.png')",
        points: 5,
        healthy: false
    },
    {   name: "burger",
        height: 87,
        width: 90,
        radius: 44,
        image: "url('images/game_assets/burger.png')",
        points: 15,
        healthy: false
    },
    {   name: "cake",
        height: 81,
        width: 85,
        radius: 41,
        image: "url('images/game_assets/cake.png')",
        points: 10,
        healthy: false
    },
    {   name: "hotdog",
        height: 76,
        width: 100,
        radius: 38,
        image: "url('images/game_assets/hotdog.png')",
        points: 10,
        healthy: false
    },
    {   name: "sprite",
        height: 75,
        width: 45,
        radius: 37,
        image: "url('images/game_assets/sprite.png')",
        points: 5,
        healthy: false
    },
    {   name: "donut",
        height: 73,
        width: 80,
        radius: 37,
        image: "url('images/game_assets/donut.png')",
        points: 10,
        healthy: false
    },
    {   name: "steak",
        height: 74,
        width: 95,
        radius: 37,
        image: "url('images/game_assets/steak.png')",
        points: 10,
        healthy: false
    },
    {   name: "whiskey",
        height: 109,
        width: 35,
        radius:54,
        image: "url('images/game_assets/whiskey.png')",
        points: 50,
        healthy: false
    },
    {   name: "chocolate",
        height: 120,
        width: 69,
        radius: 60,
        image: "url('images/game_assets/chocolate.png')",
        points: 20,
        healthy: false
    }
];

const gameCorridors = [
    {   name: "corridor1",
        middleFromLeft: 50
    },
    {   name: "corridor2",
        middleFromLeft: 150
    },
    {   name: "corridor3",
        middleFromLeft: 250
    },
    {   name: "corridor4",
        middleFromLeft: 350
    },
    {   name: "corridor5",
        middleFromLeft: 450
    },
    {   name: "corridor6",
        middleFromLeft: 550
    },
    {   name: "corridor7",
        middleFromLeft: 650
    },
    {   name: "corridor8",
        middleFromLeft: 750
    }
];



// - STARTOWANIE GRY -

function initializingGame () {
    if (screen.width>800) {
        submitButton.addEventListener('click', showGame);
    }
}

function timeStart (time) {
    let lenghtOfGame = time;
    if (lenghtOfGame>0) {
        setTimeout(function(){
            timeStart(time-1);
            --lenghtOfGame
        },1000)
    }
    else {
        stopGame()
    }
}

function stopGame () {
    setStyleDisplayNone(playerNode);
    clearInterval(randomizingInterval);
    clearInterval(movingPlayerInterval);
    clearInterval(collisionsInterval);
    clearInterval(activeObjectFallingInterval);
    document.removeEventListener('keydown', onKeyDown);
    setStyleDisplayBlock(greyBackground);
    removeAllActiveElements ();
    saveAndPresentScore(totalScore);
    presentTopScores ();
    setStyleDisplayBlock(topScoresBoard);
    playButton.style.top = 375 + 'px';
    instructionButton.style.top = 375 + 'px';
    playButton.style.left = 108 + 'px';
    instructionButton.style.left = 366 + 'px';
    setStyleDisplayBlock(instructionButton);
    setStyleDisplayBlock(playButton);
    playButton.addEventListener('click',startGame);
    instructionButton.addEventListener('click',showInstruction);

}

function showGame () {
    let game = document.querySelector(".game-box");
    setStyleDisplayBlock(game);
    playButtonEvent();
    instructionButtonEvent ();
    submitButton.removeEventListener('click',showGame);
}

function playButtonEvent () {
    playButton.addEventListener('click', startGame);
}

// - WYŚWIETLANIE INSTRUKCJI -

function instructionButtonEvent () {
    instructionButton.addEventListener('click',showInstruction);
}

function showInstruction () {
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(topScoresBoard);
    playButton.addEventListener('click',startGame);
    setStyleDisplayBlock(instructionArea);
    setStyleDisplayBlock(playButton);
    playButton.style.top = 320 + 'px';
    playButton.style.left = 325 + 'px';
}

// - WYŚWIETLANIE - WYNIKOW -




// - RANDOMIZOWANIE OWOCÓW -

function randomizeAndReturnItems(tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random() * tableOfItems.length)];
    return chosenItem;
}

function randomizeAndReturnMiddleOfRandomCorridor (gameCorridor) {
    let randomCorridor =  gameCorridor[Math.floor(Math.random() * gameCorridor.length)];
    return randomCorridor.middleFromLeft
}


// - AKTYWNE ELEMENTY -

function createNewActiveItems () {
    randomizingInterval = setInterval(function () {
        createElement();
        },500
    );
}



function createElement() {
    let randomizedGameObject = randomizeAndReturnItems(gameItemsCollection);
    let createdObject = returnObjectElement (randomizedGameObject);
    pushActiveElementToArray(createdObject);
}

function returnObjectElement (chosenItem) {
    let objectNode = createItemNodeForFallingItemsInsideGame ();
    let possitionFromLeft = randomizeAndReturnMiddleOfRandomCorridor(gameCorridors);
    let possitionFromTop = 2;
    let activeObject = {
        type: chosenItem,
        top: possitionFromTop,
        left: possitionFromLeft - (chosenItem.width)/2,
        posX: possitionFromLeft,
        posY: possitionFromTop + chosenItem.height/2,
        ref: objectNode
    };
    setStylesForItemNode(activeObject);
    return activeObject
}

function pushActiveElementToArray (activeElement) {
    activeElements.push(activeElement);
}

function setStylesForItemNode(object){
    addActiveElementClass (object);
    addStyleWidth (object);
    addStyleHeight (object);
    setStylePositionAbsolute (object);
    addStyleLeft (object);
    addStyleTop (object);
    addBackgroundImage (object);
    addStyleOpacity (object);
}

// - SPADANIE OWOCÓW -

function setStyleDisplayNone (item) {
    item.style.display = "none";
}

function setStyleDisplayBlock (item) {
    item.style.display = "block";
}

function setStylePositionAbsolute (object) {
    object.ref.style.position = "absolute";
}

function addStyleHeight (object) {
    object.ref.style.height = object.type.height + 'px';
}

function addStyleWidth (object) {
    object.ref.style.width = object.type.width + 'px';
}

function addBackgroundImage (object) {
    object.ref.style.backgroundImage = object.type.image;
}

function addStyleLeft (object) {
    object.ref.style.left = object.left + 'px';
}

function addStyleOpacity (object) {
    object.ref.style.opacity = 1;
}

function addStyleTop (object) {
    object.ref.style.top = object.top + 'px';
}



function createItemNodeForFallingItemsInsideGame () {
    let randomizedItemNode = document.createElement("div");
    playerNode.parentNode.insertBefore(randomizedItemNode,playerNode);
    return randomizedItemNode
}

function addActiveElementClass (object) {
    object.ref.classList.add('active-game-element');
}

function removeAllActiveElements() {
    let collection = document.getElementsByClassName("active-game-element");
    let collectionLenght = collection.length;
    for (let i = 0; i < collectionLenght; i++) {
        collection[0].remove();
    }
}

// - RUCH LUDZIKA -

function positionPlayer() {
    playerNode.style.left = '400px';
    playerPosition = parseInt(playerNode.style.left);
}

function movePlayerLeft() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-left.png')";
    if (playerPosition > 0) {
        playerNode.style.left = (playerPosition - 20).toString() + 'px';
        playerPosition -= 20;
    }
}

function movePlayerRight() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-right.png')";
    if (playerPosition < 719) {
        playerNode.style.left = (playerPosition + 20).toString() + 'px';
        playerPosition += 20;
    }
}

function onKeyDown(event) {
    event.preventDefault();
    keysPressed[event.which] = true;

}

function onKeyUp(event) {
    keysPressed[event.which] = false;
}


function playerMoving () {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    movingPlayerInterval = setInterval(function(){
    if (keysPressed[37]) {movePlayerLeft()}
        else
    if (keysPressed[39]) {movePlayerRight()}
    },50)
}

function startGame () {
    playButton.removeEventListener('click', startGame);
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(playButton);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(instructionArea);
    setStyleDisplayNone(topScoresBoard);
    setStyleDisplayNone(greyBackground);
    setStyleDisplayBlock(playerNode);
    positionPlayer();
    playerMoving();
    collisions();
    totalScore=0;
    displayScore(totalScore);
    createNewActiveItems();
    timeStart(40);
    activeObjectsFalling();
}



// initializingGame (); ROZKOMENTOWAĆ PÓŹNIEJ
startGame(); // WYWALIĆ PÓŹNIEJ




// - KOLIZJE -

function collisions () {
    collisionsInterval = setInterval(function () {
        activeElements.forEach(function (activeObject,index) {
            let playerNodePosX = parseInt(playerNode.style.left)+ 41,
                playerNodePosY = 420,
                lengthA = playerNodePosX - activeObject.posX,
                lengthB = playerNodePosY - activeObject.posY,
                distance = Math.sqrt(lengthA * lengthA + lengthB * lengthB);

            if (distance < 65 + activeObject.type.radius) {
                totalScore+=activeObject.type.points;
                activeElements.splice(index,1);
                activeObject.ref.remove();
                displayScore(totalScore);
            }
        })
    },50)
}

function activeObjectsFalling () {
    activeObjectFallingInterval = setInterval(function(){
        let fallingSpeed = 1.5;
        activeElements.forEach(function(activeObject,index) {
            if (activeObject.top<(500-activeObject.type.height)) {
                activeObject.top+=fallingSpeed;
                activeObject.posY+=fallingSpeed;
                activeObject.ref.style.top=activeObject.top+'px'
            }
            else if (activeObject.ref.style.opacity > 0) {
                    activeObject.ref.style.opacity -= 0.03;
                }
            else {
                    activeElements.splice(index, 1);
                    activeObject.ref.remove();
            }

        })
    },5)
}

// - KONIEC GRY -


// - LICZENIE PUNKTÓW -


function displayScore (totalScore) {
    let scoreToDisplay = `<p>TWÓJ WYNIK: ${totalScore}</p>`,
        scoreNode = getElement('.score-board');
    scoreNode.removeChild(scoreNode.firstChild);
    scoreNode.innerHTML = scoreToDisplay;
}

function saveAndPresentScore (totalScore) {
    let retrievedSavedScore = JSON.parse(localStorage.getItem('topScoresAMPFGame')),
        allScores = [],
        sortedTopScores = [];

    if (retrievedSavedScore) {
        allScores = retrievedSavedScore.concat(savedScore)
    }

    allScores.push(totalScore);
    sortedTopScores = allScores.sort(function(a,b){return b-a});
    if (sortedTopScores.length>5) {sortedTopScores.splice(5)}
    localStorage.setItem('topScoresAMPFGame',JSON.stringify(sortedTopScores));
}

function presentTopScores () {
    let topScores = JSON.parse(localStorage.getItem('topScoresAMPFGame')),
        topScoresToDisplay =
                            `<div>
                            <h2>NAJLEPSZE WYNIKI:</h2>
                            <h3>1. ${topScores[0]}</h3>
                            <h3>2. ${topScores[1]}</h3>
                            <h3>3. ${topScores[2]}</h3>
                            <h3>4. ${topScores[3]}</h3>
                            <h3>5. ${topScores[4]}</h3>
                            </div>`,
        TopScoreNode = getElement('.top-score-board');
    TopScoreNode.removeChild(TopScoreNode.firstChild);

    TopScoreNode.innerHTML = topScoresToDisplay;
}


// - WZNOWIENIE -


// - RESTART -





