function sum2DArray(arr) {
    return new Promise((resolve, reject) => { 
        console.log('Sum called ... ');
        if(Array.isArray(arr)) {
            setTimeout(() => { 
                let sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        sum += arr[i][j];
                    }
                }
                console.log('resolving ... ');
                resolve(sum);
            }, 0);
        }
        else {
            console.log('rejecting ... ');
            reject('BAD INPUT: Expected array as input');
        }
        console.log('returning from sum');
    });
}

const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const sumPromise1 = sum2DArray(array2D);
sumPromise1
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

const sumPromise2 = sum2DArray('array2D');
sumPromise2
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
