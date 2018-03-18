// - PODSTAWOWE INFO -
function getElement(selector) {
    return document.querySelector('.game-box-container ' + selector);
}

var playerPosition;
var gameItemsCollection = [];
var chosenItem;

// - OBIEKTY -


var playerNode = getElement('div.game-dude');


// - STARTOWANIE GRY -


// - WYŚWIETLANIE INSTRUKCJI -


// - WYŚWIETLANIE - WYNIKOW -


// - RANDOMIZOWANIE OWOCÓW -

function collectingGameItems() {
    var items = document.querySelectorAll('.game-box-container div.game-item');

    for (var i = 0; i < items.length; i++) {
        gameItemsCollection.push(items[i])
    }
}

collectingGameItems();


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
        playerNode.style.left = (playerPosition - 15).toString() + 'px';
        playerPosition -= 15;
    }
}

function movePlayerRight() {
    playerNode.style.backgroundImage = "url('images/game_assets/dude-right.png')";
    if (playerPosition < 719) {
        playerNode.style.left = (playerPosition + 15).toString() + 'px';
        playerPosition += 15;
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





