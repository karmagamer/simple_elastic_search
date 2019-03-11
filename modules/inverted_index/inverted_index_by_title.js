
var natural = require('natural');
var TfIdfTitle = natural.TfIdf;
var fs = require('fs');
var tfidfTitle = new TfIdfTitle();




// var InvertedIndex = require('mnemonist/inverted-index');
// // The `words` function from lodash is pretty good, for instance
// var words = require('lodash/words');
// var fs = require('fs');


// let InvertedIndex_To = new InvertedIndex(words);


const Index_Documents_By_Title = async () => {
    try{
        fs.readFile('./stored_json_data/index_raw_data.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                let TempObject = JSON.parse(data);
                for(let i =0;i<TempObject.length;i++){
                    
                let temp2 = TempObject[i];
                let valueOfData = temp2['title'];
                let ValueOfKey = temp2['id'];
                tfidfTitle.addDocument(valueOfData,ValueOfKey);
                }
                
                let tempIndex = tfidfTitle;
                // console.log(tempIndex);
        fs.writeFile('./stored_json_data/inverted_index_data_by_title.json', JSON.stringify(tempIndex),  'utf8');
            }
        });
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = Index_Documents_By_Title;