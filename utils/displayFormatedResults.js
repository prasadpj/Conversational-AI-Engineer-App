const _ = require('lodash');

const getSynonyms = (wordDetails) => {
  let synonyms = [];
  _.forEach(wordDetails.def, (def) => {
    _.forEach(def.tr,(tr) => {
      if (tr.syn) {
        const tempArray = tr.syn.map(item => item.text)
        synonyms = synonyms.concat(tempArray);
      }
    });
  });
  return synonyms;
}

const getPos = (wordDetails) => {
  const Pos = [];
  _.forEach(wordDetails.def, (def) => {
    Pos.push(def.pos);
  });
  return Pos;
}

module.exports = (wordDetails, cb) => {
  let result = []
  _.forEach(wordDetails, (word) => {

    console.log('Showing details for the "' + word.name + '"');
    const tempJson = {};
    tempJson.Word = word.name;
    tempJson.Count = word.count;
    tempJson.Synonyms = getSynonyms(word.details);
    tempJson.Pos = getPos(word.details);
    result.push(tempJson)
  });
  console.dir(result, {depth: null});
  return cb();
};