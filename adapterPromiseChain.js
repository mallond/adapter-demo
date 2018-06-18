/*
Simple Promise Chain with adapter Pattern

Process Step getJson>loadAdapter>doWork>listWork

1. getJson(path):     Json Input
2. loadAdapter(name): Load adapter by name
3. doWork:            Return work list from adapter
4. listWork:          Renders simple list of work

How to run:
node adapterPromiseChain.js awsRequest.json
node adapterPromiseChain.js googleRequest.json
node adapterPromiseChain.js azureRequest.json
 */

const fs = require('fs');
const AWS = require('./aws');
const GOOGLE = require('./google');
const AZURE = require('./AZURE');


// Get the file name to process
const fileName = process.argv.slice(2)[0];

// Promise Chain datastructure
const promiseDataStructure = [];
const PROMISE_DATA = {
    DATA: 'data',
    ERROR: 'error',
    ADAPTER: 'adapter',
    WORKLIST: 'worklist'
};
const errorDataStructure = {ok:-1, messages:[]};

/**
 * Inpute file name to load and return parsed data
 * @param fileName
 * @param promiseDataStructure
 * @returns {Promise<any>}
 */
const getJson = (fileName, promiseDataStructure) => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + `/${fileName}`, function (err, data) {
            if (err) {
                reject(promiseDataStructure[PROMISE_DATA.ERROR] = errorDataStructure.messages[0]=err);
                return;
            }
            resolve(promiseDataStructure[PROMISE_DATA.DATA] = JSON.parse(data.toString()));
        });
    });
};

/**
 * Based on the useAdapter selects and loads the correct adapter
 * @param promiseDataStructure
 * @returns {Promise<any>}
 */
const loadAdapter = (promiseDataStructure) => {
    return new Promise((resolve, reject) => {

        if (promiseDataStructure.useAdapter === 'aws') {
            promiseDataStructure[PROMISE_DATA.ADAPTER] = AWS;
            resolve(promiseDataStructure);
        } else if (promiseDataStructure.useAdapter === 'google') {
            promiseDataStructure[PROMISE_DATA.ADAPTER] = GOOGLE;
            resolve(promiseDataStructure);
        } else if (promiseDataStructure.useAdapter === 'azure') {
            promiseDataStructure[PROMISE_DATA.ADAPTER] = AZURE;
            resolve(promiseDataStructure);
        }
        promiseDataStructure.ERROR = errorDataStructure.messages[0]='Adapter Not found';
        reject(promiseDataStructure);
    });
};

/**
 * Based on the adapter will call getWork from the adapter Class selected
 * @param promiseDataStructure
 * @returns {Promise<any>}
 */
const doWork = (promiseDataStructure) => {
    return new Promise((resolve) => {
        promiseDataStructure[PROMISE_DATA.WORKLIST] = promiseDataStructure[PROMISE_DATA.ADAPTER].getWork();
        resolve(promiseDataStructure);
    });
};

/**
 * Simple return of list from adapter
 * @param promiseDataStructure
 * @returns {Promise<any>}
 */
const listWork = (promiseDataStructure) => {
    return new Promise((resolve) => {
        const list = promiseDataStructure[PROMISE_DATA.WORKLIST];
        resolve(list);
    });
};

// MAIN - Process Chain
const result = getJson(fileName, promiseDataStructure)
    .then(loadAdapter)
    .then(doWork)
    .then(listWork)
    .then((results) => {
        console.log('Result of Promise Chain:', JSON.stringify(results, null, 2));
    }).catch((error) => {
        console.log(error);
    });


setTimeout(() => {
    console.log('Done timeout');
}, 300);


