const fs = require('fs');
const stream = require('stream');
const { cipher } = require('../cipher');

const writeError = (file) => process.stderr.write(`\n File name "${file}" is invalid!\n`);
const encoding = 'utf-8'

function Readable(input) {

    if (fs.existsSync(input)) return fs.createReadStream(input, encoding);
    if (input === undefined) {
        process.stdout.write('Enter text...\n');
        return process.stdin;
    }
    writeError(input);
    return process.exit(1);
}

function Writable(output) {
    if (fs.existsSync(output)) return fs.createWriteStream(output, { flags: 'a' });
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