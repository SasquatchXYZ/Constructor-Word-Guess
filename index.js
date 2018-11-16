const inquirer = require('inquirer');
const colors = require('colors');

const Word = require('./assets/word');

const wordsArray = [
    "cat", "dog", "hippopotamus", "rhinoceros", "horse", "donkey", "llama", "hoopoe", "labradoodle", "ostrich", "fox", "turaco", "dove",
    "deer", "frigate", "turtle", "homero", "kangaroo", "emu", "eagle", "horse", "tiger", "robin", "bison", "lion", "tapir", "toucan", "takin", "thrush",
    "kouprey", "beaver", "panda", "crane", "okapi", "condor", "yiguirro", "manatee", "trogon", "mouflon", "swan", "tortoiseshell", "swallow", "camel", "oystercatcher", "bear", "perch", "ladybird", "dolphin", "quetzal", "turul", "gyrfalcon", "peafowl", "cobra", "elephant", "komodo", "partridge", "goat", "pheasant", "streamertail", "carp", "wagtail", "stork", "zebu", "lemur", "aurochs", "dodo", "xoloitzcuintli", "jaguar", "grasshopper", "vaquita", "cow", "danphe", "godwit", "kiwi", "oryx", "markhor", "chukar", "crocodile", "falcon", "leopard", "dugong", "vicuna", "carabao", "bison", "lynx", "wolf", "springbok", "galjoen", "magpie", "bull", "junglefowl", "blackbird", "giraffe", "bulldog", "kite", "antelope", "wombat", "shrike", "possum", "cockatoo", "platypus", "kookaburra", "koala", "kangaroo", "hawk", "coati", "anteater", "capybara", "egret", "owl", "raccoon", "chickadee", "beaver", "puffin", "caribou", "osprey", "beluga", "grouse", "moose", "ibis", "gaur", "blackbuck", "squirrel", "myna", "argus", "oriole", "monkey", "starling", "snake", "pangolin", "ox", "donkey", "flamingo", "sheep", "hare", "koi", "orca", "boar", "chihuahua", "urial", "ibex", "yak", "raven", "hedgehog", "dormouse", "otter", "seal", "bat", "fox"
];

let guessesLeft;
let usedWords;
let guessedLetters;
let word;
let chosenWord;
let playerName;

function welcome() {
    usedWords = [];
    console.log(`Hello and Welcome to Command Line Hangman featuring ALL OF THE ANIMALS`.bold.yellow);
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
            console.log(`Welcome ${playerName}!`.bold.yellow);
            startGame();
        });
}

function startGame() {
    guessedLetters = [];
    chosenWord = '';
    guessesLeft = 15;
    //console.log(usedWords);
    if (usedWords.length < wordsArray.length) {
        chosenWord = wordSelector();
    } else {
        console.log(`It looks like you've gone through all these animals...`.red);
        restartGame();
    }
    if (chosenWord) {
        word = new Word(chosenWord);
        word.makeWordArray();
        promptGuesses();
    }
}

function wordSelector() {
    let randomizer = Math.floor(Math.random() * wordsArray.length);
    let randomWord = wordsArray[randomizer];
    if (usedWords.indexOf(randomWord) === -1) {
        usedWords.push(randomWord);
        return randomWord;
    } else {
        return wordSelector;
    }
}

function promptGuesses() {
    let scorekeeper = [];
    word.stringifyWord();
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Guess a Letter?'.green,
                name: 'userGuess',
            }
        ])
        .then(function (response) {
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
                        console.log(`I'm sorry ${playerName} you used up all your guesses... the word was "${chosenWord}"`.italic.red);
                        restartGame();
                    } else {
                        promptGuesses();
                    }
                } else {
                    console.log(`Congrats! you guessed the word! The word was indeed "${chosenWord}"`.bold.yellow);
                    startGame();
                }
            } else {
                console.log(`You have already guessed that letter ${playerName}...`.bold.red);
                promptGuesses();
            }
        });
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Would you like to play again?'.bold.blue,
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