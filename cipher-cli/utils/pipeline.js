const { stdout, exit, stderr } = require('process');
const { pipeline } = require('stream');

function cipherPipeline(read, transform, write) {
    pipeline(
        read,
        transform,
        write,
        (err) => {
            if (err) {
                stderr.write(`\nUps... an error occurred!\n${err.message}\n\n`);
                exit(1);
            } else {
                stdout.write('Success!');
            }
        }
    )
}

module.exports = { cipherPipeline };