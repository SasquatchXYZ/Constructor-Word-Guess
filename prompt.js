const prompt = require('prompt');
const inquirer = require('inquirer');
const colors = require('colors');
const randomWords = require('random-words');
const Word = require('./word');

let guessesLeft;
let usedWords;
let word;
let chosenWord;
let playerName;

function welcome() {
    usedWords = [];
    console.log(`Hello and Welcome to Command Line Hangman featuring ALL OF THE ANIMALS`.bold.cyan);
    console.log(`----------------------------------------------------------------------`.rainbow);
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
            console.log(`Welcome ${playerName}!`.bold.cyan);
            startGame();
        });
}

function startGame() {
    //chosenWord = '';
    guessesLeft = 15;
    //console.log(usedWords);

    chosenWord = randomWords();
    word = new Word(chosenWord);
    word.makeWordArray();
    promptGuesses();

/*    if (usedWords.length < wordsArray.length) {
        chosenWord = selectWord();
    } else {
        console.log(`It looks like you used up all the animals in the bank...`.bold.red);
        restartGame();
    }
    if (chosenWord) {
        word = new Word(chosenWord);
        word.makeWordArray();
        promptGuesses();
    }*/
}

/*function selectWord() {
    let randomizer = Math.floor(Math.random() * wordsArray.length);
    let randomWord = wordsArray[randomizer];
    if (usedWords.indexOf(randomWord) === -1) {
        usedWords.push(randomWord);
        return randomWord;
    } else {
        return selectWord;
    }
}*/

function promptGuesses() {
    let scorekeeper = [];
    word.stringifyWord();
    let schema = {
        properties: {
            userGuess: {
                description: colors.green.bold('Guess a Letter?'),
                pattern: /^[a-zA-z]+$/,
                maxLength: 1,
                message: colors.red.bold(`Please Enter only a single letter... (Caps are acceptable, if you wish...)`),
                required: true
            }
        }
    };
prompt.get(schema, function(error, response) {
    // inquirer
    //     .prompt([
    //         {
    //             type: 'input',
    //             message: `Guess a Letter?`.bold.green,
    //             name: 'userGuess',
    //         }
    //     ])
    //     .then(function (response) {
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
                console.log(`Congrats! you guessed the word! The word was indeed "${chosenWord}"`);
                startGame();
            }
        });
}

/*
prompt.start();
prompt.get(['username','email'], function (err, result) {
    console.log('command-line input received:');
    console.log(`username: ${result.username}`);
    console.log(`email: ${result.email}`);
});*/

/*let schema = {
    properties: {
        name: {
            description: colors.magenta('What is Your Name?'),
            pattern: /^[a-zA-Z]+$/,
            maxLength: 1,
            message: colors.rainbow('Please Enter only a single letter... (Caps are acceptable)'),
            required: true
        },
        password: {
            description: colors.cyan("What is your password?"),
            hidden: true
        }
    }
};
//prompt.message = colors.rainbow("Question!");
prompt.message = colors.rainbow(`Hello and Welcome to Command Line Hangman featuring ALL OF THE ANIMALS`);
prompt.message = colors.rainbow(`----------------------------------------------------------------------`);
prompt.delimiter = colors.green("--><--");
prompt.start();

prompt.get(schema, function(error, result) {
    console.log('command-line input received:');
    console.log(`name: ${result.name}`);
    console.log(`password: ${result.password}`);
});*/
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
                usedWords = [];
                startGame();
            } else {
                console.log(`That's alright, please come back another time!`.bold.yellow);
            }
        });
}

welcome();