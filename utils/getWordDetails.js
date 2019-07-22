const async = require('async');
const request = require('request');

const api_details = {
  url: 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
  key: 'dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf',
}
const wordDetails = []; // Holds the final mapping for each words name,Count and Api response
const getWordsDetails = (words, callback) => {
  async.eachSeries(words, (wordObj, cb) => {
    const queryParams = {
      key: api_details.key,
      lang:'en-ru',
      text:wordObj.name,
    }
    request({ url: api_details.url,qs: queryParams }, (error, response, body) => {
      if (error) {
        console.log(error);
        return cb(error);
      }

      if (response.statusCode !== 200) {
        console.log(response.statusMessage);
        return cb('Response Message was: ' + response.statusMessage);
      }
      wordDetails.push({
        count: wordObj.count,
        name: wordObj.name,
        details: JSON.parse(body),
      });
      return cb(null);
    });
  },
  (error) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    return callback(null, wordDetails);
  });
};

module.exports = getWordsDetails;