const { pipeline } = require('stream');

function cipherPipeline(read, transform, write) {
    pipeline(
        read,
        transform,
        write,
        (err) => {
            if (err) {
                process.stderr.write(`\nUps, an error occurred: ${err.message}\n`);
                exit(1);
            } else {
                console.log('Success!');
            }
        }
    )
}

module.exports = { cipherPipeline };