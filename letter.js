let Letter = function(character) {
    this.toString = character;
    this.placeholder = '_';
    this.guessed = false;
    this.renderChar = function() {
        if (this.guessed === true) {
            return this.toString;
        } else {
            return this.placeholder;
        }
    };
    this.checkGuess = function(userGuess) {
        if (userGuess === character) {
            this.guessed = true
        }
    }
};

let guessedChar = process.argv[3];
let guess = process.argv[2];
let letter = new Letter(guess);
//console.log(letter.toString);
//console.log(letter.placeholder);
console.log(letter.guessed);
console.log(letter.renderChar());
letter.checkGuess(guessedChar);
console.log(letter.guessed);
console.log(letter.renderChar());

