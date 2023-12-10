//this constructs the cards for the game
class Card {
    constructor(suit, name, value) {
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
}

//this class is for creating and managing the deck
class Deck {
    constructor() {
        this.cards = [];
        this.suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace']
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
    //this method creates the deck
    createDeck() {
        console.log(`Creating new deck`);
        for (let i = 0; i < this.suits.length; i++) {
            for (let n = 0; n < this.names.length; n++) {
                this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]));
            }
        }
    }
    //this method shuffles the deck
    shuffleDeck() {
        console.log(`Shuffling deck`);
        const shuffledDeck = [];
        for (let i = 0; i < 52; i++) {
            let randomPosition = Math.floor((this.cards.length - i) * Math.random());
            let randomItem = this.cards.splice(randomPosition, 1);
            shuffledDeck.push(...randomItem);
        }
        return shuffledDeck;
    }
    //this method deals cards to the players
    dealCards(players, shuffledCards) {
        console.log(`Dealing the cards`);
        let dealingCards1 = shuffledCards.splice(0, 26);
        players[0].hand.push(...dealingCards1);
        let dealingCards2 = shuffledCards.splice(0, 26);
        players[1].hand.push(...dealingCards2);
    }
}
//this sets up the players, their hands, and an empty array to push player's winning
//points to
class Players {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hand = [];
    }
}
//this is 'guts' of making the game run
class Game {
    constructor() {
        this.players = [];
    }
    //this starts the game with players and their hands of shuffled cards from the deck
    start() {
        this.players.push(new Players('Computer'));
        this.players.push(new Players('Becky'));
        console.log(`Let's play War!!`);

        let myDeck = new Deck();
        myDeck.createDeck();
        let shuffledDeck = myDeck.shuffleDeck();

        myDeck.dealCards(this.players, shuffledDeck);

        this.playGame();

        this.endGame();
    }
    //this compares the cards for each player, declares a winner and adds points
    //to the winner's score
    playGame() {
        console.log(`Declare War`);
        let player1 = this.players[0];
        let player2 = this.players[1];

        let roundWinner = '';
        let turn = 1;

        while (player1.hand.length !== 0 && player2.hand.length !== 0) {
            let player1Card = player1.hand.shift();
            let player2Card = player2.hand.shift();

            if (player1Card.value > player2Card.value) {
                roundWinner = player1.name;
                player1.points += 1;
                console.log(`Round: ${turn++}
                    Player 1 card: ${player1Card.name} of ${player1Card.suit}
                    Player 2 card: ${player2Card.name} of ${player2Card.suit}
                    ${player1.name} has won this round`);
            }
            else if (player2Card.value > player1Card.value) {
                roundWinner = player2.name;
                player2.points += 1;
                console.log(`Round: ${turn++}
                Player 1 card: ${player1Card.name} of ${player1Card.suit}
                Player 2 card: ${player2Card.name} of ${player2Card.suit}
                ${player2.name} has won this round`);
            }
            else {
                console.log(`Round: ${turn++}
                    Player 1 card: ${player1Card.name} of ${player1Card.suit}
                    Player 2 card: ${player2Card.name} of ${player2Card.suit}
                    It's a tie!`);
            }
        }
    }
    //this will display the results of the game to the console
    endGame() {
        let gameWinner = '';
        let player1 = this.players[0];
        let player2 = this.players[1];
        let winnerPoints = 0;

        if (player1.points > player2.points) {
            gameWinner = player1.name;
            winnerPoints = player1.points;
            console.log(`Game Over!  ${player1.name} has won the game.
                Final Scores:
                ${player1.name}:  ${player1.points}
                ${player2.name}:  ${player2.points} `);
        } else if (player2.points > player1.points) {
            gameWinner = player2.name;
            winnerPoints = player2.points;
            console.log(`Game Over!  ${player2.name} has won the game.
                Final Scores:
                ${player1.name}:  ${player1.points}
                ${player2.name}:  ${player2.points} `);
        } else {
            console.log(`Game Over!  It was a tie!!
                Final Scores:
                ${player1.name}:  ${player1.points}
                ${player2.name}:  ${player2.points} `);
        }
    }
}

let game = new Game;
game.start();


