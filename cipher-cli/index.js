const { Readable, Writable, Transform } = require('./streams');

const program = require('./utils/commander');
const programOptions = program.opts();

const { validateCommand } = require('./utils/validator');
const { cipherPipeline } = require('./utils/pipeline');

validateCommand();

const readableStream = Readable(programOptions.input);
const writeableStream = Writable(programOptions.output);
const transformStream = Transform(programOptions.shift, programOptions.action);

cipherPipeline(readableStream, transformStream, writeableStream);