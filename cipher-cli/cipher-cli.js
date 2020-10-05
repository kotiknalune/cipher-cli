const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const ts = require('./transform.cipher.caesar');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <number>', 'shift value')
  .requiredOption(
    '-a, --action <encode|decode>',
    'action to perform (encode/decode)'
  )
  .option('-i, --input <input>', 'input file (if none then stdin is used)')
  .option('-o, --output <output>', 'output file (if none then stdout is used)');

program.parse(process.argv);
const programOptions = program.opts();

module.exports = {
  getInputStream: new Promise(resolve => {
    if (programOptions.input) {
      /* Check file read access */
      fs.access(
        programOptions.input,
        fs.constants.F_OK | fs.constants.R_OK, // eslint-disable-line no-bitwise
        error => {
          if (error) {
            console.error(`Cannot access input file: ${error}`);
            process.exit(1);
          }
          resolve(
            fs.createReadStream(programOptions.input, {
              flags: 'r',
              encoding: 'utf8'
            })
          );
        }
      );
    } else {
      console.log('Using stdin as input. Press CTRL+C for exit.');
      resolve(process.stdin);
    }
  }),
  getOutputStream: new Promise(resolve => {
    if (programOptions.output) {
      fs.access(programOptions.output, fs.constants.F_OK, fileExistsError => {
        if (fileExistsError) {
          fs.access(
            path.dirname(programOptions.output),
            fs.constants.F_OK | fs.constants.W_OK, // eslint-disable-line no-bitwise
            dirError => {
              if (dirError) {
                console.error(`Cannot write to output: ${dirError}`);
                process.exit(1);
              }
            }
          );
        } else {
          fs.access(
            programOptions.output,
            fs.constants.F_OK | fs.constants.W_OK, // eslint-disable-line no-bitwise
            fileError => {
              if (fileError) {
                console.error(`Cannot write to output: ${fileError}`);
                process.exit(1);
              }
            }
          );
        }

        resolve(
          fs.createWriteStream(programOptions.output, {
            flags: 'a'
          })
        );
      });
    } else {
      resolve(process.stdout);
    }
  }),
  getTransformStream: new Promise(resolve => {
    if (!isNaN(programOptions.shift)) {
      if (
        programOptions.action !== 'encode' &&
        programOptions.action !== 'decode'
      ) {
        console.error(
          `Unsupported action: ${programOptions.action}. See help for details.`
        );
        process.exit(1);
      }
      resolve(
        new ts(
          programOptions.action === 'encode'
            ? parseInt(programOptions.shift, 10)
            : -1 * parseInt(programOptions.shift, 10)
        )
      );
    } else {
      console.error('Shift is not a number');
      process.exit(1);
    }
  })
};