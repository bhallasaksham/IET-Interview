'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// remove all occurences of letters that appear consecutively
function deleteConsecutiveLetters(myStr) { 
    var s = myStr;
    var i;
    for (i = 0; i < myStr.length; i++) { 
        if ((i != s.length-1) && s[i] == s[i+1]) {
            s = deleteOccurence(s, s[i]);
        }
    }
    return s;
}

// delete all occurences of ch in str
function deleteOccurence(str, ch) { 
    var i;
    var tempStr = str;
    for (i = 0; i < str.length; i++) {
        if (str[i] == ch) {
            tempStr = tempStr.replace(ch,'');
        }
    }
    return tempStr;
}

 // initializing a dictionary of counts
function initializeDict(str, countDict) {
    var i;
    for (i = 0; i < str.length; i++) { 
        countDict[str[i]] = 0;
    }
    return countDict;
}

// populating the dictionary of counts
function populateDict(str, countDict) { 
    var i;
    for (i = 0; i < str.length; i++) { 
        countDict[str[i]] += 1;
    }
    return countDict;
}

// sort all the keys in descending order of their values
function sortKeysByCount(countDict) { 
    var i;
    let arr = Object.values(countDict);
    arr.sort();
    arr.reverse();
    var arrOfKeys = [];
    for (i = 0; i < arr.length; i++) {
        arrOfKeys[i] = Object.keys(countDict).find(key => countDict[key] === arr[i]);
        delete countDict[Object.keys(countDict).find(key => countDict[key] === arr[i])];
    }
    return arrOfKeys;
}

// double for loop to check for max alternating sequence
function findMaxAlternateSequence(arrOfKeys, s) { 
    var i, j, myStr;
    for (i = 0; i < arrOfKeys.length - 1; i++) {
        for (j = 1; j < arrOfKeys.length; j++) {
            myStr = processString(s, arrOfKeys[i], arrOfKeys[j]);
            if (checkAlternate(myStr)) {
                return myStr.length;
            }
        }
    }
    return 0;
}

// check what str looks like with just ch1 and ch2
function processString(str, ch1, ch2) {
    var i;
    var tempStr = str;
    for (i = 0; i < str.length; i++) {
        if (str[i] != ch1 && str[i] != ch2) {
            tempStr = tempStr.replace(str[i],'');
        }
    }
    return tempStr;
}

// check if two consecutive letters in string are the same
function checkAlternate(str) { 
    var i;
    for (i = 0; i < str.length - 1; i++) {
        if (str[i] === str[i+1]) {
            return false;
        }
    }
    return true;
}

// returns the size of the maximum length string such that the two letters present are alternating
function alternate(s) { 
   
    var i,j;
    var ret;
    var countDict = {}
    var myStr = deleteConsecutiveLetters(s);
    countDict = initializeDict(myStr, countDict);
    countDict = populateDict(myStr, countDict);
    
    var arrOfKeys = sortKeysByCount(countDict);
    
    ret = findMaxAlternateSequence(arrOfKeys, myStr);
    
    return ret;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const l = parseInt(readLine().trim(), 10);

    const s = readLine();

    const result = alternate(s);

    ws.write(result + '\n');

    ws.end();
}