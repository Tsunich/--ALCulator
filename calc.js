let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1','2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/'];

const out = document.querySelector('.screen');

function CA (){
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}

function del (){
    if ((a !== '' && !finish) || (b!== '' && !finish)) {
        if (a === b){
            b = b.slice(0, -1); 
            out.textContent = b;
        } else if (out.textContent === a) {
            a = a.slice(0, -1); 
            out.textContent = a;
        } else if (out.textContent === b) {
            b = b.slice(0, -1); 
            out.textContent = b;
        }
    }else {
        a = '';
        b = '';
        sign = '';
        finish = false;
        out.textContent = 0;
    }
}

function changeSign() {
    if (!finish) {
        if (a !== '' && b === '') {
            a = (+a) * (-1) + ''; 
            out.textContent = a;
        } else if (b !== '') {
            b = (+b) * (-1) + ''; 
            out.textContent = b;
        }
    }
}

document.querySelector('.CA').onclick = CA;
document.querySelector('.del').onclick = del;
document.querySelector('.change-sign').onclick = changeSign;

document.querySelector('.button').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('CA')) return;
    if(event.target.classList.contains('del')) return;
    if(event.target.classList.contains('change-sign')) return;

    let key = event.target.textContent;
    if (a.length == 24 && digit.includes(key) && sign === '') return;
    if (b.length == 24 && digit.includes(key)) return;

    out.textContent = '0';    

    if (digit.includes(key)) {
        if (key === '.' && out.textContent === '0' && a === '') {
            a = '0.';
            out.textContent = a;
        } else if (b === '' && sign === ''){
            if (a.includes('.') && key === '.') {
                out.textContent = a;
            } else {
                a += key;
                out.textContent = a;
            }
        } else if (a !== '' && b !== '' && finish){
            if (key === '.'){
                out.textContent = '.';
            } else {
                b = key;
                finish = false;
                out.textContent = b;
            }
        } else if(key === '.' && out.textContent === '0' && b === '') {
            b = '0.';
            out.textContent = b;
        } else {
            if (b.includes('.') && key === '.'){
                out.textContent = b;
            } else {
                b += key;
                out.textContent = b;
            }
        }    
    }

    if(key === '÷' || key === '&#247;') { 
        key = '/';
    }

    if (action.includes(key)) {
        sign = key;
        if (sign === '/'){
            out.textContent = '÷';
        } else 
            out.textContent = sign;
    }


    if (key === '=') {
        if(sign === '+') a = (+a) + (+b);
        if(sign === '-') a = a - b;
        if(sign === 'x') a = a * b;
        if(sign === '/') a = a / b;
        finish = true;
        if(a === '' && b === ''){
            out.textContent = '0';
        } else {
            out.textContent = a;
        }
    }
}