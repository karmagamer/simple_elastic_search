
var natural = require('natural');
var TfIdf = natural.TfIdf;

const util = require('util');
var fs = require('fs');
let randomToken = require('random-token');

const readFile = util.promisify(fs.readFile);

async function get_Results(query,field) {
   // Convert fs.readFile into Promise version of same    

    let results = {};
    // let token = randomToken(8);
    let token = 'cached_data';
    let CacheValue = await CheckCache(query,field,token);
    if(CacheValue !== undefined){
        return CacheValue;
    }
    if(field === 'data'){
        
    const content = await readFile('./stored_json_data/inverted_index_data.json', 'utf8');
    results = await return_result_of_read_files_inverted_index( content );
    }
    else{
        const content = await readFile('./stored_json_data/inverted_index_data_by_title.json', 'utf8');
        results = await return_result_of_read_files_inverted_index( content );
    }
    let contentOfRawJsonData = await readFile('./stored_json_data/index_raw_data.json', 'utf8');
    let resultsOfRawJsonDataIndex = await return_result_of_read_files_index( contentOfRawJsonData );
    let result_of_sorted_map_this_is_Final_Array = await getFinalResults(results,query,resultsOfRawJsonDataIndex);
    
    
    
    
    const read_cache_file = await readFile('./stored_json_data/'+token+'.json', 'utf8');
        
        let TempObjectForCache = JSON.parse(read_cache_file); //now it an object
        console.log(TempObjectForCache);
      //  console.log(TempObject);
      
      let tempMapValue = result_of_sorted_map_this_is_Final_Array;
      console.log(tempMapValue);
      TempObjectForCache[query] = tempMapValue;
      let json = JSON.stringify(TempObjectForCache);
       fs.writeFile('./stored_json_data/'+token+'.json', json, 'utf8'); // write it back 
      
    
    return result_of_sorted_map_this_is_Final_Array;
     
}

async function CheckCache(query,result,token){
    const read_cache_file = await readFile('./stored_json_data/'+token+'.json', 'utf8');
    let TempObjectForCache = JSON.parse(read_cache_file);
    if(TempObjectForCache[query] !== undefined){
        return TempObjectForCache[query];
    }

}
async function return_result_of_read_files_index(results){
    
    let TempObject = [];
    TempObject = await JSON.parse(results);
     // console.log(TempObject);
     // console.log(TempObject)
     return TempObject;
}
async function return_result_of_read_files_inverted_index(results){
    
    let TempObject = {};
    TempObject = await JSON.parse(results);
     // console.log(TempObject);
     // console.log(TempObject)
     return TempObject;
}



async function getFinalResults(data,query,resultsOfRawJsonDataIndex){
    let Results = [];
    let TempObject = [];
    TempObject = resultsOfRawJsonDataIndex;
    let tfidf =  new TfIdf(data);
    let tempMap =  new Map();
    tfidf.tfidfs(query, async function(i, measure) {
    //console.log('document #' + i + ' is ' + measure);
     tempMap.set(i,measure);

    });
    let mapDSC =  new Map([...tempMap.entries()].sort((a,b) => a[0] < b[0]));

    let final_array = await SortMap(mapDSC,Results,TempObject);
    
    
return final_array;

}

async function SortMap(map,array,TempObject){
    let ResultArray = array;
    console.log(map);
    await map.forEach(async (key,value) => {
        if(key > 0){
            // console.log("i am here");
            // ResultArray.push(value);
            ResultArray.push(TempObject[value]);
            
        }
    })
    return ResultArray;
}




// async function testing(){
//     console.log("randomstuff");
// get_Results("man").then(data => {
//     console.log(data);
//   }).catch(err =>{
//       console.log(err);
//   });
// // const dataToString = await JSON.stringify(result22);
// // console.log(dataToString);
// console.log("randomstuff1");
// }
// testing();




module.exports = get_Results;