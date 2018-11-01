const prompt = require('prompt');
const colors = require('colors/safe');
/*
prompt.start();
prompt.get(['username','email'], function (err, result) {
    console.log('command-line input received:');
    console.log(`username: ${result.username}`);
    console.log(`email: ${result.email}`);
});*/

let schema = {
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
prompt.message = colors.rainbow("Question!");
prompt.delimiter = colors.green("><");
prompt.start();

prompt.get(schema, function(error, result) {
    console.log('command-line input received:');
    console.log(`name: ${result.name}`);
    console.log(`password: ${result.password}`);
});
