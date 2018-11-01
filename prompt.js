const prompt = require('prompt');
const inquirer = require('inquirer');
const colors = require('colors');
const randomWords = require('random-words');

const Word = require('./word');

let guessesLeft;
let guessedLetters;
let word;
let chosenWord;
let playerName;

function welcome() {
    console.log(`         Hello and Welcome to Command Line Hangman         `.bold.cyan);
    console.log(`-----------------------------------------------------------`.rainbow);
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?'.italic.magenta,
                name: 'username',
            }
        ])
        .then(function (response) {
            playerName = response.username;
            console.log(`               !! Welcome ${playerName}! !!              `.bold.cyan);
            console.log(`Note: Enter 'Space' in place of a letter to exit the game`.bold.red);
            startGame();
        });
}

function startGame() {
    guessedLetters = [];
    guessesLeft = 15;

    chosenWord = randomWords();
    word = new Word(chosenWord);
    word.makeWordArray();
    promptGuesses();
}

function promptGuesses() {
    let scorekeeper = [];
    word.stringifyWord();
    let schema = {
        properties: {
            userGuess: {
                description: colors.green.bold('Guess a Letter?'),
                pattern: /^[a-zA-z\s]+$/,
                maxLength: 1,
                message: colors.red.bold(`Please Enter only a single letter... (Caps are acceptable, if you wish...)`),
                required: true
            }
        }
    };
    prompt.get(schema, function (error, response) {
        if (response.userGuess === ' ') {
            console.log(`That's alright, please come back another time!`.bold.yellow);
        } else {
            if (guessedLetters.indexOf(response.userGuess) === -1) {
                guessedLetters.push(response.userGuess);
                word.guess(response.userGuess);
                word.wordArray.filter(Letter => {
                    scorekeeper.push(Letter.guessed);
                });
                //console.log(scorekeeper);
                //promptGuesses();
                if (scorekeeper.indexOf(false) > -1 && guessesLeft > 0) {
                    guessesLeft--;
                    if (guessesLeft === 0) {
                        console.log(`I'm sorry ${playerName} you used up all your guesses... The word was "${chosenWord}"`.red);
                        restartGame();
                    } else {
                        promptGuesses();
                    }
                } else {
                    console.log(`Congrats! you guessed the word! The word was indeed "${chosenWord}"`.bold.cyan);
                    startGame();
                }
            } else {
                console.log(`You have already guessed that letter...`.bold.red);
                promptGuesses();
            }
        }
    });
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: `Would you like to play again?`.bold.blue,
                name: 'confirm',
                default: true
            }
        ])
        .then(function (response) {
            if (response.confirm) {
                startGame();
            } else {
                console.log(`That's alright, please come back another time!`.bold.yellow);
            }
        });
}

welcome();