const colors = require('colors');

const Letter = require('./letter');

let Word = function (chosenWord) {
    this.chosenWord = chosenWord;
    this.wordArray = [];

    // Takes the chosen word, splits each letter, and then makes them into a new Letter constructor
    // and then pushes it to the wordArray, Creating an array of Letter objects.
    this.makeWordArray = function () {
        let chosenWordArray = this.chosenWord.split('');
        //console.log(chosenWordArray);
        for (let k = 0; k < chosenWordArray.length; k++) {
            let newLetter = new Letter(chosenWordArray[k]);
            this.wordArray.push(newLetter);
        }
        //console.log(this.wordArray);
    };

    // Takes the word array, and forEach member of the word array runs the Letter.renderChar function
    // to determine the status of it's appearance.
    this.stringifyWord = function () {
        const displayWord = this.wordArray.map(wordLetter => {
            return wordLetter.renderChar();
        });
        console.log(displayWord.toString().split(',').join(' ').rainbow);
        return displayWord.toString().split(',').join(' ');
    };

    // Calls the guess comparison function of the Letter constructor.
    this.guess = function (character) {
        this.wordArray.forEach(wordLetter => {
            wordLetter.checkGuess(character)
        })
    }
};

module.exports = Word;


//Code Tests
/*
let chosenWord = 'pangolin';
let word = new Word(chosenWord);
console.log(word.chosenWord);
console.log(word.wordArray);
word.makeWordArray();
word.stringifyWord();
word.guess("a");
word.stringifyWord();
word.guess("n");
word.stringifyWord();*/