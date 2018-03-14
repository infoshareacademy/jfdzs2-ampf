// - PODSTAWOWE INFO -
var playerPosition;
var gameItemsCollection = [];
var chosenItem;

// - OBIEKTY -


// - STARTOWANIE GRY -


// - WYŚWIETLANIE INSTRUKCJI -


// - WYŚWIETLANIE - WYNIKOW -


// - RANDOMIZOWANIE OWOCÓW -

function collectingGameItems () {
    var items = document.querySelectorAll('.game-box-container div.game-item');
    var i;

    for (i=0; i<items.length; i++) {gameItemsCollection.push(items[i])}
}

collectingGameItems();


function randomizeAndReturnItems (tableOfItems) {
    chosenItem = tableOfItems[Math.floor(Math.random()*tableOfItems.length)];
    return chosenItem;
}

randomizeAndReturnItems(fallingItems);

// - POZYCJONOWANIE OWOCÓW -


// - SPADANIE OWOCÓW -


// - RUCH LUDZIKA -

function positionPlayer () {
    document.querySelector('.game-box-container div.game-dude').style.left = '350px';
    playerPosition = parseInt(document.querySelector('.game-box-container div.game-dude').style.left);
}

positionPlayer();

function movePlayer (event) {

    switch (event.keyCode) {

        case 37:
            document.querySelector('.game-box-container div.game-dude img').src="images/game_assets/dude-right.png";
            if (playerPosition>0) {
                document.querySelector('.game-box-container div.game-dude').style.left = (playerPosition - 3).toString() + 'px';
                playerPosition -= 3;
            }

            break;
        case 39:
            document.querySelector('.game-box-container div.game-dude img').src="images/game_assets/dude-left.png";
            if (playerPosition<719) {
                document.querySelector('.game-box-container div.game-dude').style.left = (playerPosition + 3).toString() + 'px';
                playerPosition += 3;
            }
            break;

    }


}


document.addEventListener('keydown', movePlayer);





// - KOLIZJE -


// - KONIEC GRY -


// - LICZENIE PUNKTÓW -


// - WYŚWIETLANIE PUNKTÓW -


// - MUZYKA -


// - EFEKTY MUZYCZNE (BEKI I INNE) -


// - PAUZA -


// - WZNOWIENIE -


// - RESTART -





