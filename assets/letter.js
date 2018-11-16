let Letter = function (character) {
    this.toString = character;
    this.placeholder = '_';
    this.guessed = false;

    // Function that when called checks the boolean value of this.guessed in order to determine whether
    // to display the letter or an underscore.
    this.renderChar = function () {
        if (!this.guessed) {
            return this.placeholder;
        } else {
            return this.toString;
        }
    };

    // Function that when called checks to see if the guess of the player is correct for the letter,
    // and then updates the this.guessed value accordingly.
    this.checkGuess = function (userGuess) {
        if (userGuess === this.toString) {
            this.guessed = true
        }
    }
};

module.exports = Letter;


// Code Tests
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