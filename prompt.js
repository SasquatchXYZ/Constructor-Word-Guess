const prompt = require('prompt');
const inquirer = require('inquirer');
const colors = require('colors');
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
                message: 'What is your name?'.magenta,
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
    chosenWord = '';
    guessesLeft = 15;
    //console.log(usedWords);
    if (usedWords.length < wordsArray.length) {
        chosenWord = wordSelector();
    } else {
        console.log(`It looks like you used up all the animals in the bank...`);
        restartGame();
    }
    if (chosenWord) {
        word = new Word(chosenWord);
        word.makeWordArray();
        promptGuesses();
    }
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

welcome();