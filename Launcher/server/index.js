const express = require('express');
const app = express();
const fs=require('fs');
const path=require('path');

app.use(express.json());


app.post('/',(req,res)=>{
    const mapDataArray=req.body;
    saveMapFile('testing',mapDataArray);
    res.send({message:'Response from web server'});
});

app.listen(3000,()=>{
    console.log('web server ~3000');
});

function saveMapFile(fileName,data){
fs.writeFile(path.join(__dirname,`/saves/${fileName}.json`),JSON.stringify(data),(err)=>{
    if(err)console.log(err);
    else console.log(`${fileName}.json written succesfully`);
});

}

function readMapFile(fileName){
fs.readFile(path.join(__dirname,`/saves/${fileName}.json`),'utf8',function(err,data){
   if(err)console.log(err);
    //data is contents of file
});
}
