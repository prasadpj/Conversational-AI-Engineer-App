const async = require('async');

const fileDownloader = require('./utils/fileDownloader');
const display = require('./utils/displayFormatedResults');
const getDetails = require('./utils/getWordDetails');
const getTopWords = require('./utils/fileProcessor');
var fs = require('fs');
const filePath = 'files/sample.txt'

async.waterfall([
  fileDownloader, // 1) Fetches file from the source
  getTopWords,    // 2) a. Gets the most occured words
  getDetails,     // 2) b. gets the details for the top 10 words by occurence
  display,        // 3) Displays the result in the requires format.
],(error) => {
  if (error) {
    console.log(error);
  }
  fs.unlink(filePath, function(){     // remove sample file
    console.log('Done');
  })
});