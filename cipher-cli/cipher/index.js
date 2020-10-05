const { exit, stderr } = process;
const { alphabet } = require('../config/lang.config');

const cipher = (shift, string, action) => {
    if (isNaN(shift) || shift < 0) {
        stderr.write('\nError: "-s, --shift" parameter should be a positive number"\n');
        exit(1);
    }

    const originalLetterOrder = `${alphabet.uppercase}${alphabet.lowercase}`;

    function shuffleAlphabet(key) {
        if (key%alphabet.letters === 0) return originalLetterOrder;

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

    const cipher = shuffleAlphabet(shift);
    if (action === 'encode') shuffleString(originalLetterOrder, cipher);
    if (action === 'decode') shuffleString(cipher, originalLetterOrder);
}

module.exports = { 
    cipher 
};