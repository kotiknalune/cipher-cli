const fs = require('fs');
const stream = require('stream');
const path = require('path');

const { cipher } = require('../cipher');

const writeError = (file) => process.stderr.write(`\n File name "${file}" is invalid!\n`);
const encoding = 'utf8';

function Readable(input) {
    if (input) return fs.createReadStream(path.join(__dirname, '../', input), encoding);
    if (input === undefined) {
        process.stdout.write('\nEnter text...\n');
        return process.stdin;
    }
    writeError(input);
    return process.exit(1);
}

function Writable(output) {
    if (output) return fs.createWriteStream(path.join(__dirname, '../', output), { flags: 'a' });
    if (output === undefined) return process.stdout;

    writeError(output);
    return process.exit(1);
}

function Transform(shift, action) {
    return stream.Transform({
        transform(data, _, callback) {
            this.push(
                cipher(
                    shift, 
                    data.toString(), 
                    action.toString()
                )
            )
            callback();
        }
    })
}

module.exports = { 
    Readable,
    Writable,
    Transform
};