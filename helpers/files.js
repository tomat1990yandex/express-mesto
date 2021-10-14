const fsPromises = require('fs').promises;

const getDataFromFile = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf8' })
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(`Произошла ошибка: ${err}`));

module.exports = getDataFromFile;