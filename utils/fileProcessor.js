const fs = require('fs');
const ReadLine = require('readline');
const filePath = 'files/sample.txt';
const _ = require('lodash');
const wordMaping = {} // this will hold the count for the each word occurance

const sortByCount = (wordMaping)=> {
  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordMaping).map(function (key) {
    return {
      name: key,
      count: wordMaping[key]
    };
  });

  finalWordsArray.sort(function (a, b) {
    return b.count - a.count;
  });
  return finalWordsArray;
}

const getTopTenWords = (callback) => {
  let wordCount = 0
  const lineReader = ReadLine.createInterface({
    input: fs.createReadStream(filePath),
  });
  lineReader.on('line', (line) => {
    let newLine = line.toLowerCase().trim()
    const words = newLine.split(/\W+/);       // split line by non alphanumeric characters
    _.forEach(words, (word) => {
      if (word.length > 4) { // Keeping the word limit to be atleast of 4 charchters for now to get better results, Can be changed as per the bussiness logic
        if (wordMaping[word]) {
          wordMaping[word] += 1
        } else {
          wordMaping[word] = 1;
        }
      }
    });
  });
  lineReader.on('close', () => {
    const sortedArray = sortByCount(wordMaping);
    const topTenWords = sortedArray.splice(0,10);
    return callback(null, topTenWords);
  });
}

module.exports = getTopTenWords;
