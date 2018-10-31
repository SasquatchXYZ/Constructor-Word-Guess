const Letter = require('./letter');

let Word = function (chosenWord) {
    this.chosenWord = chosenWord;
    this.wordArray = [];
    this.makeWordArray = function () {
        let chosenWordArray = this.chosenWord.split('');
        //console.log(chosenWordArray);
        for (let k = 0; k < chosenWordArray.length; k++) {
            let newLetter = new Letter(chosenWordArray[k]);
            this.wordArray.push(newLetter);
        }
        //console.log(this.wordArray);

    };
    this.stringifyWord = function () {
        const displayWord = this.wordArray.map(wordLetter => {
            return wordLetter.renderChar();
        });

        console.log(displayWord.toString().split(',').join(' '));
        return displayWord.toString().split(',').join(' ');

    };
    this.guess = function (character) {
        this.wordArray.forEach(wordLetter => {
            wordLetter.checkGuess(character)
        })
    }
};

module.exports = Word;

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
