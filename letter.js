let Letter = function (character) {
    this.toString = character;
    this.placeholder = '_';
    this.guessed = false;
    this.renderChar = function () {
        if (!this.guessed) {
            return this.placeholder;
        } else {
            return this.toString;
        }
    };
    this.checkGuess = function (userGuess) {
        if (userGuess === this.toString) {
            this.guessed = true
        }
    }
};


module.exports = Letter;

/*let guessedChar = process.argv[3];
let guess = process.argv[2];
let letter = new Letter(guess);
//console.log(letter.toString);
//console.log(letter.placeholder);
console.log(letter.guessed);
console.log(letter.renderChar());
letter.checkGuess(guessedChar);
console.log(letter.guessed);
console.log(letter.renderChar());*/

