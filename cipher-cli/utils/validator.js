const program = require('./commander');
const { exit, stderr} = process;

function validateCommand() {
    if (program.opts().shift === undefined) {
        stderr.write('Error: Please specify a shift key.\n');
        exit(1);
    }
    if (program.opts().shift < 0) {
        stderr.write('Error: Please specify a non-negative shift key.\n');
        exit(1);
    }
    if (program.opts().action === undefined) {
        stderr.write('Error: Please specify an action encode/decode.\n');
        exit(1);
    }
}

module.exports = { 
    validateCommand 
};
