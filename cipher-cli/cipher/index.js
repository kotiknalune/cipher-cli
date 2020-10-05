const { exit, stderr } = process;
const { alphabet, actions } = require('../config');

const cipher = (shift, string, action) => {
    if (isNaN(shift) || shift < 0) {
        stderr.write('\nError: "-s, --shift" parameter should be a positive number"\n');
        exit(1);
    }

    const originalLetterOrder = `${alphabet.uppercase}${alphabet.lowercase}`;

    function shuffleAlphabet(key) {
        if (key % alphabet.letters === 0) return originalLetterOrder;
        if (key > alphabet.letters ) key = key % alphabet.letters;

        const letterArray = alphabet.lowercase.split('');
        for (let i = 0; i < key; i += 1) {
            const letter = letterArray.shift();
            letterArray.push(letter);
        }
        const encodedAlphabet = letterArray.join('');
        return `${encodedAlphabet.toUpperCase()}${encodedAlphabet.toLowerCase()}`;
    }

    function shuffleString(from, to) {
        const index = x => to.indexOf(x);
        const translate = x => index(x) > -1 ? from[index(x)] : x;
        return string.split('').map(translate).join('');
    }

    const cipherLetterOrder = shuffleAlphabet(shift);
    switch (action) {
        case actions.encode:
            shuffleString(originalLetterOrder, cipherLetterOrder);
        case actions.decode:
            shuffleString(cipherLetterOrder, originalLetterOrder);
        default:
            process.stderr.write(`\nError: '-a, --action' parameter is required and should be either ${actions.encode} or ${actions.decode}\n`);
            exit(1);
    }
}

module.exports = { 
    cipher 
};