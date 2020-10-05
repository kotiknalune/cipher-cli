const {
    getInputStream,
    getOutputStream,
    getTransformStream
  } = require('./cipher-cli');
  
  getInputStream
    .then(
      rs =>
        getOutputStream.then(
          ws =>
            getTransformStream.then(
              ts => rs.pipe(ts).pipe(ws),
              transformError => {
                throw transformError;
              }
            ),
          outputError => {
            throw outputError;
          }
        ),
      inputError => {
        throw inputError;
      }
    )
    .catch(error => {
      console.error(error);
      process.exit(1);
    });