let display=document.getElementById('display');
let currentExpression='';
let shouldClearDisplay=false;
let resultDisplayed=false;

window.onload=function(){
    display.value='0';
};

function addValue(value){
    if(shouldClearDisplay || resultDisplayed){
        display.value='';
        shouldClearDisplay=false;
        resultDisplayed=false;
    }
    if(display.value==='0'){
        display.value=value;
    } 
    else{
        display.value+=value;
    }
}

function clearDisplay(){
    display.value='0';
    currentExpression='';
    shouldClearDisplay=false;
    resultDisplayed=false;
}

function deleteLast(){
    if (resultDisplayed){
        clearDisplay();
    } 
    else if(display.value.length===1){
        display.value='0';
    } 
    else{
        display.value=display.value.slice(0,-1);
    }
}

function calculateResult(){
    try{
        display.value=eval(currentExpression + display.value);
        currentExpression='';
        resultDisplayed=true;
    } 
    catch{
        display.value='Error';
        resultDisplayed=true;
    }
}

function addOperator(operator){
    if(display.value!== '' && display.value !== '0'){
        currentExpression+=display.value+operator;
        shouldClearDisplay=true;
        resultDisplayed=false;
    }
}
