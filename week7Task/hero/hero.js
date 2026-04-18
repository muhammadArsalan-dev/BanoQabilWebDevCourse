function showFunctionList() {
    document.getElementById('main-trigger').style.display = 'none';
    document.getElementById('function-list').style.display = 'grid';
}

const goToDetails = (functionName) => {
    if (functionName === 'alert') {
        window.location.href = "./alert/alert.html";
    }
    if (functionName === 'prompt') {
        window.location.href = "./prompt/prompt.html";
    }
    if (functionName === 'Math.sqrt') {
        window.location.href = "./mathSqrt/mathSqrt.html";
    }
    if (functionName === 'toLowerCase') {
        window.location.href = "./toLowerCase/toLowerCase.html";
    }   
    if (functionName === 'toUpperCase') {
        window.location.href = "./toUpperCase/toUpperCase.html";
    }
    if (functionName === 'ArrowFunctions') {
        window.location.href = "./Arrow Functions/ArrowFunctions.html";
    }
    if (functionName === 'clearInterval') {
        window.location.href = "./clearInterval/clearInterval.html";
    }
    if (functionName === 'Destructing') {
        window.location.href = "./Destructing/Destructing.html";
    }
    if (functionName === 'RestOperator') {
        window.location.href = "./Rest Operator/RestOperator.html";
    }
    if (functionName === 'setInterval') {
        window.location.href = "./setInterval/setInterval.html";
    }
    if (functionName === 'setTimeout') {
        window.location.href = "./setTimeOut/setTimeOut.html";
    }
    if (functionName === 'SpreadOperator') {
        window.location.href = "./Spread Operator/SpreadOperator.html";
    }
    if (functionName === 'TemplateLiterals') {
        window.location.href = "./Template Literals/TemplateLiterals.html";
    }
}