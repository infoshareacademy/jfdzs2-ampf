// - PODSTAWOWE INFO -
function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}

var playerPosition;
var chosenItem;

// - OBIEKTY -

var playerNode = getElement('div.game-dude');
var playButton = getElement('.play');
var instructionButton = getElement('.instructions');
var instructionArea = getElement('.game-instruction');
var submitButton = document.querySelector(".sub-button");
var greyBackground = getElement('.grey-background');

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
        points: 15,
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
        points: 5,
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
        height: 57,
        width: 100,
        radius: 30,
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
    setStyleDisplayBlock(instructionArea);
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(instructionButton);
    playButton.style.top = 260 + 'px';
}

// - WYŚWIETLANIE - WYNIKOW -


// - RANDOMIZOWANIE OWOCÓW -

function randomizeAndReturnItems(tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random() * tableOfItems.length)];
    return chosenItem;
}




// - AKTYWNE ELEMENTY -







// - SPADANIE OWOCÓW -

function setStyleDisplayNone (item) {
    item.style.display = "none";
}

function setStyleDisplayBlock (item) {
    item.style.display = "block";
}

function setBackgroundColorToGrey (item) {
    item.style.backgroundColor = "rgba(56, 56, 56, 0.8)";
}

function turnOffBackgroundColor (item) {
    item.style.backgroundColor = "none";
}


function setStylePositionAbsolute (gameItemNode) {
    gameItemNode.style.position = "absolute";
}

function addStyleHeight (gameItem, gameItemNode) {
    gameItemNode.style.height = gameItem.height.toString() + 'px';
}

function addStyleWidth (gameItem, gameItemNode) {
    gameItemNode.style.width = gameItem.width.toString() + 'px';
}

function addBackgroundImage (gameItem, gameItemNode) {
    gameItemNode.style.backgroundImage = gameItem.image;
}

function addStyleLeft (gameItem, gameItemNode, gameCorridor) {
    gameItemNode.style.left = (gameCorridor.middleFromLeft - (gameItem.width)/2).toString()+ 'px';
}

function createItemNodeForFallingItemsInsideGame () {
    var randomizedItemNode = document.createElement("div");
    playerNode.parentNode.insertBefore(randomizedItemNode,playerNode);
    return randomizedItemNode
}

function positionRandomGameItemInTheCenterOfRandomCorridor () {
    var randomizedItem = randomizeAndReturnItems(gameItemsCollection);
    var randomizedCorridor = randomizeAndReturnItems(gameCorridors);
    var randomizedItemNode = createItemNodeForFallingItemsInsideGame();
    setStylePositionAbsolute(randomizedItemNode);
    addStyleHeight(randomizedItem, randomizedItemNode);
    addStyleWidth(randomizedItem, randomizedItemNode);
    addBackgroundImage(randomizedItem, randomizedItemNode);
    addStyleLeft(randomizedItem, randomizedItemNode, randomizedCorridor);

    randomizedItemNode.style.top = "20px"; // To się powinno zmienić bo przedmioty będą spadały jakby z ponad planszy
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
    switch (event.keyCode) {
        case 37:
            movePlayerLeft();
            break;
        case 39:
            movePlayerRight();
            break;
    }
}

function startGame () {
    playButton.removeEventListener('click', startGame);
    setStyleDisplayNone(playButton);
    instructionButton.removeEventListener('click',showInstruction);
    setStyleDisplayNone(instructionButton);
    setStyleDisplayNone(instructionArea);
    setStyleDisplayBlock(playerNode);
    positionRandomGameItemInTheCenterOfRandomCorridor();
    positionPlayer();
    setStyleDisplayNone(greyBackground);
    document.addEventListener('keydown', onKeyDown);

}

initializingGame ();





// - KOLIZJE -

function collision (playerNode, [activeItem]) {
    var lengthA = playerNode.posX - activeItem.posX,
        lengthB = 77.5 - activeItem.posY,
        distance = Math.sqrt(lengthA * lengthA + lengthB * lengthB);

    if (distance < 75 + activeItem.radius) {
        alert("collison fuckers");
    }
}


// - KONIEC GRY -


// - LICZENIE PUNKTÓW -


// - WYŚWIETLANIE PUNKTÓW -


// - MUZYKA -


// - EFEKTY MUZYCZNE (BEKI I INNE) -


// - PAUZA -


// - WZNOWIENIE -


// - RESTART -





