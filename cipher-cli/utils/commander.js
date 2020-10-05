const { program } = require('commander');
const { exit } = process;

program
  .storeOptionsAsProperties(true)
  .requiredOption('-s, --shift <type>', 'a shift number')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input [mode]')
  .option('-o, --output [mode]');
program.parse(process.argv);

const inputFile = program.input;
const outputFile = program.output;

const requiredParams = (string) => {
  process.stderr.write(`Error: Please provide a file name for '${string}' parameter\n`);
  exit(1);
};

if (typeof inputFile === 'boolean') requiredParams('-i, --input');
if (typeof outputFile === 'boolean') requiredParams('-o, --output');

if ((inputFile && inputFile.endsWith('/')) || (outputFile && outputFile.endsWith('/'))) {
  process.stderr.write('\nError: Indicate a path to the file, not it\'s directory\n');
  exit(1);
}

module.exports = program;