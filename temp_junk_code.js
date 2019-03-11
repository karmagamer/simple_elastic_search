
async function getRead_raw_data(query,raw_data_inverted_index){

    await fs.readFileSync('./stored_json_data/inverted_index_data.json', 'utf8', async function readFileCallback2(err, data){
        if (err){
               console.log(err);
                  } else {
                          const results = await getFinalResults(data,query,raw_data_inverted_index);
                          console.log(results);
                           resolve(results);
                                     
                            }
                });
}


async function getRaw_data(){
    await fs.readFileSync('./stored_json_data/index_raw_data.json', 'utf8', async function readFileCallback1(err, data){
        if (err){
            console.log(err);
        }
        else{
            TempObject = await JSON.parse(data);
            
        }
    return TempObject;
    });
}




async function getFinalResults(data,query,raw_data_of_inverted_index){
    let Results = [];
    let TempObject = [];
    let tfidf = await new TfIdf( JSON.parse(data));
    let tempMap = await new Map();
    tfidf.tfidfs([query], async function(i, measure) {
    //console.log('document #' + i + ' is ' + measure);
    await tempMap.set(i,measure);

    });
    let mapDSC = await new Map([...tempMap.entries()].sort((a,b) => a[0] < b[0]));

    let final_array = await SortMap(mapDSC,Results);
    
    
return final_array;

}

async function SortMap(map,array){
    let ResultArray = array;
    await map.forEach(async (key,value) => {
        if(key > 0){
            // console.log("i am here");
            ResultArray.push(value);
            // Results.push(TempObject[value]);
            
        }
    })
    return ResultArray;
}
