function shiftSymbol(ch, shift, alphabet) {
    let idx = alphabet.indexOf(ch);
    if (idx >= 0) {
      idx += shift % alphabet.length;
      if (idx >= alphabet.length) idx -= alphabet.length;
      if (idx < 0) idx += alphabet.length;
      ch = alphabet[idx];
    }
    return ch;
  }
  
  module.exports = { shiftSymbol };