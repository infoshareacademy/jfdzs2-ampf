// - PODSTAWOWE INFO -
function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}

var playerPosition;
var chosenItem;
var keysPressed = {
    37: false,
    39: false
};


var activeElements = [];

var interval;

// - OBIEKTY -

var playerNode = getElement('div.game-dude');
var playButton = getElement('.play');
var instructionButton = getElement('.instructions');
var instructionArea = getElement('.game-instruction');
var submitButton = document.querySelector(".sub-button");
var greyBackground = getElement('.grey-background');
var lenghtOfGame = 0;
const gameItemsCollection = [
    {   name: "apple",
        height: 89,
        width: 75,
        image: "url('images/game_assets/apple.png')",
        points: -5,
        healthy: true
    },
    {   name: "carrot",
        height: 94,
        width: 100,
        image: "url('images/game_assets/carrot.png')",
        points: -5,
        healthy: true
    },
    {   name: "pear",
        height: 80,
        width: 80,
        image: "url('images/game_assets/pear.png')",
        points: -5,
        healthy: true
    },
    {   name: "aubergine",
        height: 83,
        width: 75,
        image: "url('images/game_assets/aubergine.png')",
        points: -5,
        healthy: true
    },
    {   name: "strawberry",
        height: 75,
        width: 75,
        image: "url('images/game_assets/strawberry.png')",
        points: -5,
        healthy: true
    },
    {   name: "fries",
        height: 92,
        width: 75,
        image: "url('images/game_assets/fries.png')",
        points: 5,
        healthy: false
    },
    {   name: "cupcake",
        height: 83,
        width: 85,
        image: "url('images/game_assets/cupcake.png')",
        points: 5,
        healthy: false
    },
    {   name: "pizza",
        height: 92,
        width: 95,
        image: "url('images/game_assets/pizza.png')",
        points: 10,
        healthy: false
    },
    {   name: "icecream",
        height: 90,
        width: 95,
        image: "url('images/game_assets/icecream.png')",
        points: 5,
        healthy: false
    },
    {   name: "burger",
        height: 87,
        width: 90,
        image: "url('images/game_assets/burger.png')",
        points: 15,
        healthy: false
    },
    {   name: "cake",
        height: 81,
        width: 85,
        image: "url('images/game_assets/cake.png')",
        points: 10,
        healthy: false
    },
    {   name: "hotdog",
        height: 76,
        width: 100,
        image: "url('images/game_assets/hotdog.png')",
        points: 15,
        healthy: false
    },
    {   name: "sprite",
        height: 75,
        width: 45,
        image: "url('images/game_assets/sprite.png')",
        points: 5,
        healthy: false
    },
    {   name: "donut",
        height: 73,
        width: 80,
        image: "url('images/game_assets/donut.png')",
        points: 10,
        healthy: false
    },
    {   name: "steak",
        height: 74,
        width: 95,
        image: "url('images/game_assets/steak.png')",
        points: 5,
        healthy: false
    },
    {   name: "whiskey",
        height: 109,
        width: 35,
        image: "url('images/game_assets/whiskey.png')",
        points: 50,
        healthy: false
    },
    {   name: "chocolate",
        height: 57,
        width: 100,
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
    lenghtOfGame = time;

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
    clearInterval(interval);
    document.removeEventListener('keydown', onKeyDown);
    setStyleDisplayBlock(greyBackground);
    removeAllActiveElements ();
    playButton.addEventListener('click',startGame);
    instructionButton.addEventListener('click',showInstruction);
    setStyleDisplayBlock(instructionButton);
    playButton.style.top = 200 + 'px';
    setStyleDisplayBlock(playButton);

}

function showGame () {
    var game = document.querySelector(".game-box");
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
    playButton.addEventListener('click',startGame);
    setStyleDisplayBlock(instructionArea);
    setStyleDisplayBlock(playButton);
    playButton.style.top = 260 + 'px';
}

// - WYŚWIETLANIE - WYNIKOW -




// - RANDOMIZOWANIE OWOCÓW -

function randomizeAndReturnItems(tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random() * tableOfItems.length)];
    return chosenItem;
}

function randomizeAndReturnMiddleOfRandomCorridor (gameCorridor) {
    var randomCorridor =  gameCorridor[Math.floor(Math.random() * gameCorridor.length)];
    return randomCorridor.middleFromLeft
}


// - AKTYWNE ELEMENTY -

function createNewActiveItems () {
    interval = setInterval(function () {
        createElement();
        },1000
    );
}

function createElement() {
    var randomizedGameObject = randomizeAndReturnItems(gameItemsCollection);
    var createdObject = returnObjectElement (randomizedGameObject);
    pushActiveElementToArray(createdObject);
}

function returnObjectElement (chosenItem) {
    var objectNode = createItemNodeForFallingItemsInsideGame ();
    var possitionFromLeft = randomizeAndReturnMiddleOfRandomCorridor(gameCorridors);
    var possitionFromTop = 1;
    var activeObject = {
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

function addStyleTop (object) {
    object.ref.style.top = object.top + 'px';
}

function createItemNodeForFallingItemsInsideGame () {
    var randomizedItemNode = document.createElement("div");
    playerNode.parentNode.insertBefore(randomizedItemNode,playerNode);
    return randomizedItemNode
}

function addActiveElementClass (object) {
    object.ref.classList.add('active-game-element');
}

function removeAllActiveElements () {
    var collection = document.getElementsByClassName("active-game-element");
    for (var i=0; i<=collection.length; i++) {
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
    keysPressed[event.which] = true;
}

function onKeyUp(event) {
    keysPressed[event.which] = false;
}

function playerMoving () {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    setInterval(function(){
        if (keysPressed[37]) {movePlayerLeft()}
        else
            if (keysPressed[39]) {movePlayerRight()}
    },100)
}

function startGame () {
    playButton.removeEventListener('click', startGame);
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(playButton);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(instructionArea);
    setStyleDisplayNone(greyBackground);
    setStyleDisplayBlock(playerNode);
    positionPlayer();
    playerMoving();
    createNewActiveItems();
    timeStart(5);
}



// initializingGame (); ROZKOMENTOWAĆ PÓŹNIEJ
startGame(); // WYWALIĆ PÓŹNIEJ




// - KOLIZJE -


// - KONIEC GRY -


// - LICZENIE PUNKTÓW -


// - WYŚWIETLANIE PUNKTÓW -


// - MUZYKA -


// - EFEKTY MUZYCZNE (BEKI I INNE) -


// - PAUZA -


// - WZNOWIENIE -


// - RESTART -





