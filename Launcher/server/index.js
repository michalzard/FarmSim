const express = require('express');
const app = express();
const fs=require('fs');
const path=require('path');

app.use(express.json());


app.post('/map',(req,res)=>{
    const mapDataArray=req.body;
    saveMapFile('testing',mapDataArray);
    res.send({message:'Map Data posted'});
});

app.get('/map',(req,res)=>{
    const {name} = req.query;
    // console.log(readMapFile(name));
    if(name!==null){
    fs.readFile(path.join(__dirname,`/saves/${name}.json`),'utf8',function(err,data){
        if(err)console.log(err);

        const size = Buffer.byteLength(JSON.stringify(data)) /1024; //kilobytes
        //data is contents of file
         if(data){
             res.send({message:`${name}.json was loaded, ${size.toFixed(3)}kb`,mapData:data});
         }else res.send({message:'Map file wasnt loaded correctly'});
         
     });
    }
    else res.send({message:`Unable to find specified map file`});
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

