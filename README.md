# Simple Adapter Promise Demo

> Nothing fancy, just simple

```
const result = getJson(fileName, promiseDataStructure)
    .then(loadAdapter)
    .then(doWork)
    .then(listWork)
    .then((results) => {
        console.log('Result of Promise Chain:', JSON.stringify(results, null, 2));
    }).catch((error) => {
        console.log(error);
    });
```

#### Design Patterns
[GOF Javascript](https://github.com/fbeline/Design-Patterns-JS)