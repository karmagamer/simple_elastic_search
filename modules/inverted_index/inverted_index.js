
var natural = require('natural');
var TfIdf = natural.TfIdf;
var fs = require('fs');
var tfidf = new TfIdf();




// var InvertedIndex = require('mnemonist/inverted-index');
// // The `words` function from lodash is pretty good, for instance
// var words = require('lodash/words');
// var fs = require('fs');


// let InvertedIndex_To = new InvertedIndex(words);


const Index_Documents = async () => {
    try{
        fs.readFile('./stored_json_data/index_raw_data.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                let TempObject = JSON.parse(data);
                for(let i =0;i<TempObject.length;i++){
                    
                let temp2 = TempObject[i];
                let valueOfData = temp2['data'];
                let ValueOfKey = temp2['id'];
                tfidf.addDocument(valueOfData,ValueOfKey);
                }
                
                let tempIndex = tfidf;
        fs.writeFile('./stored_json_data/inverted_index_data.json', JSON.stringify(tempIndex),  'utf8');
            }
        });
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = Index_Documents;