// - PODSTAWOWE INFO -
function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}

var playerPosition;
var chosenItem;

// - OBIEKTY -


var playerNode = getElement('div.game-dude');

const gameItemsCollection = [
    {   name: "apple",
        height: 89,
        width: 75,
        image: "images/game_assets/apple.png",
        points: -5,
        healthy: true
    },
    {   name: "carrot",
        height: 94,
        width: 100,
        image: "images/game_assets/carrot.png",
        points: -5,
        healthy: true
    },
    {   name: "pear",
        height: 80,
        width: 80,
        image: "images/game_assets/pear.png",
        points: -5,
        healthy: true
    },
    {   name: "aubergine",
        height: 83,
        width: 75,
        image: "images/game_assets/aubergine.png",
        points: -5,
        healthy: true
    },
    {   name: "strawberry",
        height: 75,
        width: 75,
        image: "images/game_assets/strawberry.png",
        points: -5,
        healthy: true
    },
    {   name: "fries",
        height: 92,
        width: 75,
        image: "images/game_assets/fries.png",
        points: 5,
        healthy: false
    },
    {   name: "cupcake",
        height: 83,
        width: 85,
        image: "images/game_assets/cupcake.png",
        points: 5,
        healthy: false
    },
    {   name: "pizza",
        height: 92,
        width: 95,
        image: "images/game_assets/pizza.png",
        points: 10,
        healthy: false
    },
    {   name: "icecream",
        height: 90,
        width: 95,
        image: "images/game_assets/icecream.png",
        points: 5,
        healthy: false
    },
    {   name: "burger",
        height: 87,
        width: 90,
        image: "images/game_assets/icecream.png",
        points: 15,
        healthy: false
    },
    {   name: "cake",
        height: 81,
        width: 85,
        image: "images/game_assets/cake.png",
        points: 10,
        healthy: false
    },
    {   name: "cake",
        height: 100,
        width: 100,
        image: "images/game_assets/cake.png",
        points: 5,
        healthy: false
    },
    {   name: "hotdog",
        height: 76,
        width: 100,
        image: "images/game_assets/hotdog.png",
        points: 15,
        healthy: false
    },
    {   name: "sprite",
        height: 75,
        width: 45,
        image: "images/game_assets/sprite.png",
        points: 5,
        healthy: false
    },
    {   name: "donut",
        height: 73,
        width: 80,
        image: "images/game_assets/donut.png",
        points: 10,
        healthy: false
    },
    {   name: "steak",
        height: 74,
        width: 95,
        image: "images/game_assets/steak.png",
        points: 5,
        healthy: false
    },
    {   name: "whiskey",
        height: 109,
        width: 35,
        image: "images/game_assets/whiskey.png",
        points: 50,
        healthy: false
    },
    {   name: "chocolate",
        height: 69,
        width: 120,
        image: "images/game_assets/chocolate.png",
        points: 20,
        healthy: false
    }
];

// - STARTOWANIE GRY -


// - WYŚWIETLANIE INSTRUKCJI -


// - WYŚWIETLANIE - WYNIKOW -


// - RANDOMIZOWANIE OWOCÓW -




function randomizeAndReturnItems(tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random() * tableOfItems.length)];
    return chosenItem;
}

randomizeAndReturnItems(gameItemsCollection);

// - POZYCJONOWANIE OWOCÓW -


// - SPADANIE OWOCÓW -


// - RUCH LUDZIKA -

function positionPlayer() {
    playerNode.style.left = '350px';
    playerPosition = parseInt(playerNode.style.left);
}

positionPlayer();

function movePlayerLeft() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-left.png')";
    if (playerPosition > 0) {
        playerNode.style.left = (playerPosition - 2).toString() + 'px';
        playerPosition -= 2;
    }
}

function movePlayerRight() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-right.png')";
    if (playerPosition < 719) {
        playerNode.style.left = (playerPosition + 2).toString() + 'px';
        playerPosition += 2;
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

document.addEventListener('keydown', onKeyDown);


// - KOLIZJE -


// - KONIEC GRY -


// - LICZENIE PUNKTÓW -


// - WYŚWIETLANIE PUNKTÓW -


// - MUZYKA -


// - EFEKTY MUZYCZNE (BEKI I INNE) -


// - PAUZA -


// - WZNOWIENIE -


// - RESTART -





