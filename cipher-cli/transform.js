const stream = require('stream');
const { shiftSymbol } = require('./utils');

class Transform extends stream.Transform {
  constructor(shift) {
    super();
    this.alphabets = [
      'abcdefghijklmnopqrstuvwxyz'.split(''),
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    ];
    this.shift = shift;
  }

  _transform(chunk, enc, cb) {
    for (const ch of chunk) {
      let char = String.fromCharCode(ch);
      for (const alphabet of this.alphabets) {
        const shiftedChar = shiftSymbol(char, this.shift, alphabet);
        if (shiftedChar !== char) {
          char = shiftedChar;
          break;
        }
      }
      this.push(char);
    }
    cb();
  }

  _flush(cb) {
    cb();
  }
}

module.exports = Transform;