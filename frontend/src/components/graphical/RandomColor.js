export function randomColorArray(size, type){
    let ar = [];
    for(let i=0; i<size; i++){
        ar[i] = randomColor(type);
    }
    return ar;
}

export function randomColor(type) {
    return '#' + getVal(type) + getVal(type) + getVal(type);
}

function getVal(type) {
    let val = Math.floor(Math.random() * 255);
    if (type === 'darker') {
        val = getRandomInt(50) + 0;
    }
    else if(type === 'dark'){
        val = getRandomInt(50) + 50;
    }
    else if(type === 'medium'){
        val = getRandomInt(50) + 100;
    }
    else if(type === 'light'){
        val = getRandomInt(50) + 150;
    }
    else if(type === 'lighter'){
        val = getRandomInt(50) + 200;
    }
    return val.toString(16);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}