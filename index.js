const inquirer = require('inquirer');
const Word = require('./word');

const wordsArray = [
    "cat","dog","hippopotamus","rhinoceros","horse","donkey","llama","hoopoe","labradoodle","ostrich","fox","turaco","dove",
    "deer","frigate","turtle","homero","kangaroo","emu","eagle","horse","tiger","robin","bison","lion","tapir","toucan","takin","thrush",
    "kouprey","beaver","panda","crane","okapi","condor","yiguirro","manatee","trogon","mouflon","swan","tortoiseshell","swallow","camel","oystercatcher","bear","perch","ladybird","dolphin","quetzal","turul","gyrfalcon","peafowl","cobra","elephant","komodo","partridge","goat","pheasant","streamertail","carp","wagtail","stork","zebu","lemur","aurochs","dodo","xoloitzcuintli","jaguar","grasshopper","vaquita","cow","danphe","godwit","kiwi","oryx","markhor","chukar","crocodile","falcon","leopard","dugong","vicuna","carabao","bison","lynx","wolf","springbok","galjoen","magpie","bull","junglefowl","blackbird","giraffe","bulldog","kite","antelope","wombat","shrike","possum","cockatoo","platypus","kookaburra","koala","kangaroo","hawk","coati","anteater","capybara","egret","owl","raccoon","chickadee","beaver","puffin","caribou","osprey","beluga","grouse","moose","ibis","gaur","blackbuck","squirrel","myna","argus","oriole","monkey","starling","snake","pangolin","ox","donkey","flamingo","sheep","hare","koi","orca","boar","chihuahua","urial","ibex","yak","raven","hedgehog","dormouse","otter","seal","bat","fox"
];

let guessesLeft;
let usedWords;
let word;
let chosenWord;
let playerName;

function welcome() {
    usedWords = [];
    console.log(`Hello and Welcome to Command Line Hangman`);
    console.log(`-----------------------------------------`);
/*    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is your name?',
                name: 'username',
            }
        ])
        .then(function(response) {
            playerName = response.username;
            console.log(`Welcome ${playerName}!`);
        });*/
    startGame();
}

function startGame() {
    chosenWord = '';
    guessesLeft = 12;
    console.log(usedWords);
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
                message: 'Guess a Letter?',
                name: 'userGuess',
            }
        ])
        .then(function(response) {
/*            word.wordArray.forEach(letter => {
                letter(response.userguess);
                scorekeeper.push(letter.renderChar());
            });*/
            //scorekeeper.push(response.userGuess);
            word.guess(response.userGuess);
            word.wordArray.filter(Letter => {
                scorekeeper.push(Letter.guessed);
            });
            //console.log(scorekeeper);
            //promptGuesses();

            if (scorekeeper.indexOf(false) > -1 && guessesLeft > 0) {
                guessesLeft--;
                if (guessesLeft === 0) {
                    console.log(`I'm sorry ${playerName} you used up all your guesses`);
                    restartGame();
                } else {
                    promptGuesses();
                }
            } else {
                console.log(`Congrats! you guessed the word! The word was indeed ${word.stringifyWord()}`);
                startGame();
            }

/*            if (scorekeeper.indexOf(false) === -1) {
                console.log(`Congrats! you guessed the word!`);
            } else if (scorekeeper.indexOf(false) > -1 && guessesLeft > 0) {
                promptGuesses();
            }*/


        });
}


function restartGame() {
    inquirer
        .prompt([
            {
                type: 'confirm',
                message: 'Would you like to play again?',
                name: 'confirm',
                default: true
            }
        ])
        .then(function(response) {
            if (response.confirm) {
                welcome();
            } else {
                console.log(`That's alright, please come back another time!`);
            }
        });
}

welcome();