const array = ["x:1", "y:2", "x:3", "a:15", "a:2", "b:1", "b:3" ]
const key = {}
let exit = '';

for (const element of array) {
    const parsed = element.split(":")
    if (!key[parsed[0]]){
        key[parsed[0]] = parseInt(parsed[1]) 

    } else {
        key[parsed[0]] = key[parsed[0]] + parseInt(parsed[1]) 
    }
    
}


const keys = Object.keys(key);
keys.sort();

for (i = 0; i < keys.length; i++) {
k = keys[i];

if (keys.length -1 != i) {
    exit = exit + `${k}=${key[k]},`
} else {
    exit = exit + `${k}=${key[k]}`
}

}

console.log(exit);
