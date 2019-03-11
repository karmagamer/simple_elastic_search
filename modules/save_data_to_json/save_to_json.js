
var fs = require('fs');
let Invert_this_document = require('../inverted_index/inverted_index');
let Invert_this_document_by_title = require('../inverted_index/inverted_index_by_title');
let TempObject = [{}];

const Send_to_Json = async (raw_data) => {
    try{
        fs.readFile('./stored_json_data/index_raw_data.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
            TempObject = JSON.parse(data); //now it an object
          //  console.log(TempObject);
            TempObject.push(raw_data);
            json = JSON.stringify(TempObject); //convert it back to json
             console.log(TempObject);
           fs.writeFile('./stored_json_data/index_raw_data.json', json, 'utf8'); // write it back 
           Invert_this_document();
           Invert_this_document_by_title();
        }});
        // var obj = raw_data;
        // var json = JSON.stringify(obj);
        // let success = await fs.writeFile('./stored_json_data/myjsonfile.json', json, 'utf8');
        
        
return true;
    }
    catch(error){
        console.log(error);
        
return false;
    }
}


module.exports = Send_to_Json;