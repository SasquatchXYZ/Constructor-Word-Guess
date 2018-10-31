const Letter = require('./letter');
//let letter = new Letter();

let Word = function(chosenWord) {
    this.chosenWord = chosenWord;
    this.wordArray = [];
    this.stringifyWord = function() {
        let chosenWordArray = this.chosenWord.split('');
        console.log(chosenWordArray);
        for (let k = 0; k < chosenWordArray.length; k++) {
            let newLetter = new Letter(chosenWordArray[k]);
            this.wordArray.push(newLetter);
        }
        //console.log(this.wordArray);

        this.wordArray.forEach(arrayLetter => {
            console.log(arrayLetter.renderChar());
        });

        const displayWord = this.wordArray.map(wordLetter => {
            return wordLetter.renderChar();
        });
        console.log(displayWord.toString().split(',').join(' '));

/*        this.wordArray.forEach(arrLetter => {
            console.log(arrLetter.renderChar());
            const fullWord = this.wordArray.map(wordLetter => {
                return wordLetter.toString;
            });

            console.log(fullWord.join(''));
        });*/


        //console.log(this.wordArray);
/*        for (let k = 0; k < this.wordArray.length; k++) {
            if (!this.wordArray[k].guessed) {
                console.log(this.wordArray[k].placeholder);
            } else {
                console.log(this.wordArray[k].toString);
            }
        }*/
    };
    this.guess = function(character) {
        this.wordArray.forEach(letter.checkGuess(character))
    }
};

let chosenWord = 'pangolin';
let word = new Word(chosenWord);
console.log(word.chosenWord);
console.log(word.wordArray);
word.stringifyWord();
