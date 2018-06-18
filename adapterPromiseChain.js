/*
Simple Promise Chain with adapter Pattern

Process Step getJson>loadAdapter>doWork>listWork

1. getJson(path):     Json Input
2. loadAdapter(name): Load adapter by name
3. doWork: return work package {work:[{item:1},{item:2},{item:3}}
4. listWork: renders simple list of work

How to:

node adapterPromiseChain.js adapter/requests/aws.json


 */

const fs = require('fs');



const fileName = process.argv.slice(2)[0];

/**
 *
 * @param fileName
 */
const getJson = (fileName)=>{

    fs.readFile( __dirname + `/${fileName}`, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(data.toString())
        return JSON.parse(data.toString());
    });

};

console.log(fileName);
console.log(getJson(fileName));
