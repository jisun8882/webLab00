"use strict"
var stack = [];
window.onload = function () {
    var displayVal = "0";
    var memory = "0";

    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = $(this).innerHTML;

            if(value == "AC"){
                displayVal = "0";
                stack.length = 0;
                memory = stack.length;
                document.getElementById('expression').innerHTML = memory;
            }
            else if(value == "."){
                if(displayVal.indexOf(".") == -1)
                {
                    displayVal += value;
                }
                else{
                   return false;
                }
            }
            else if(!isNaN(value)){
                
                if(stack[stack.length-1] === ")"){
                    stack.push("*");
                }

                if(displayVal == "0"){
                    displayVal = "";
                    displayVal += value;
                }
                else
                {
                    displayVal += value;
                }
            }
            else if(value == "("){
                if(displayVal == "0"){
                    stack.push(value);
                }
                else{
                    stack.push(displayVal);
                    stack.push("*");
                    stack.push(value);
                    displayVal = "0";
                }
            }
            else if(value == ")"){
                stack.push(displayVal);
                stack.push(value);
                displayVal = "0";
            }
            else{

                if(stack[stack.length-1] === ")")
                {   
                    stack.push(value);
                }
                else{
                    stack.push(displayVal);
                    stack.push(value);
                }

                displayVal = "0";
                memory = stack.join("");
                document.getElementById('expression').innerHTML = memory;
                
                if(value == "=")
                {
                    stack.pop(value);
                    var valid = isValidExpression(stack);
                    
                    if(valid == 1){
                        alert(stack);
                        var stack_result = infixToPostfix(stack);
                        displayVal = postfixCalculate(stack_result);
                        stack.length = 0;
                    }
                    else{
                        displayVal = "error";
                    }
                }
            }
            $('result').innerHTML = displayVal;
        };
    }
}

function isValidExpression(s) {

    var count_open = 0;
    var count_close = 0;

    for(var i =0; i<stack.length ; i++) {
        
        if(s[i] === "("){
            count_open ++;
        }
        
        if (s[i] === ")"){
            count_close ++;
        }
    }

    if(count_open == count_close){
        return 1;
    }
    else{
        return -1;
    }


}

function infixToPostfix(s) {
    var priority = {
        "+":0,
        "-":0,
        "*":1,
        "/":1
    };
    var tmpStack = [];
    var result = [];
    for(var i =0; i<stack.length ; i++) {
        if(/^[0-9]+$/.test(s[i])){
            result.push(s[i]);
        } else {
            if(tmpStack.length === 0){
                tmpStack.push(s[i]);
            } else {
                if(s[i] === ")"){
                    while (true) {
                        if(tmpStack.last() === "("){
                            tmpStack.pop();
                            break;
                        } else {
                            result.push(tmpStack.pop());
                        }
                    }
                    continue;
                }
                if(s[i] ==="(" || tmpStack.last() === "("){
                    tmpStack.push(s[i]);
                } else {
                    while(priority[tmpStack.last()] >= priority[s[i]]){
                        result.push(tmpStack.pop());
                    }
                    tmpStack.push(s[i]);
                }
            }
        }
    }
    for(var i = tmpStack.length; i > 0; i--){
        result.push(tmpStack.pop());
    }
    return result;
}

function postfixCalculate(s) {
    var operator = new Array("+","-","*","/");
    var tmpStack = [];

    for (var i=0; i< s.length; i++)
    {
        if(s[i] == "+" || s[i] == "-" || s[i] == "*" || s[i] == "/"){
            var result = 0;

            var ptr = tmpStack.pop();
            var prev = tmpStack.pop();

            if(s[i] == "+"){
                result = parseFloat(prev) + parseFloat(ptr);
                tmpStack.push(result);
            }
            else if(s[i] == "-"){
                result = parseFloat(prev) - parseFloat(ptr);
                tmpStack.push(result);
            }
            else if(s[i] == "*"){
                result = parseFloat(prev) * parseFloat(ptr);
                tmpStack.push(result);
            }
            else{
                result = parseFloat(prev) / parseFloat(ptr);
                tmpStack.push(result);
            }
        }
        else
        {
            tmpStack.push(s[i]);
        }

    }

    return tmpStack[0];

}
