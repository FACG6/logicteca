/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const testFolder = './test';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file !== 'index.js') {
        require(`./${file}/test`);
      }
    });
  }
});
