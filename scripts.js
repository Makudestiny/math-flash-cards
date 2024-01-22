
let debugFlag = 1;

let curOperationType = 'Add';
let firstArg;
let secondArg;
let solution;
let problemText;
let answerList = [];
const maxArgValue = 12;

const _probDivElement = document.querySelector('#problemDiv');
const _answersDivElement = document.querySelector('#answersDiv');

// function buildPage() {
//     debugLogging("started buildPage");

//     // const answersElement = document.querySelector('#answers');
//     // const btnElement = document.createElement("button");
    
//     updateProblem();
//     generateAnswers();

//     // for(let i = 0; i < 8; i++){
//     //     tdElement.appendChild(document.createTextNode(answerList[i]));
//     // }
//     // trElement.appendChild(tdElement);
//     // trElement.setAttribute( "class", trBlankClassName);
//     // answersElement.appendChild(trElement);
// }

function updateOperationType(operationType) {
    curOperationType = operationType;
    switch(operationType) {
        case 'Add':
            document.getElementById("additionBtn").style.boxShadow = "inset 0 0 7px black";
            document.getElementById("subtractBtn").style.boxShadow = "none";
            document.getElementById("multiplyBtn").style.boxShadow = "none";
            document.getElementById("divideBtn").style.boxShadow = "none";
            break;
        case 'Subtract':
            document.getElementById("additionBtn").style.boxShadow = "none";
            document.getElementById("subtractBtn").style.boxShadow = "inset 0 0 7px black";
            document.getElementById("multiplyBtn").style.boxShadow = "none";
            document.getElementById("divideBtn").style.boxShadow = "none";
            break;
        case 'Multiply':
            document.getElementById("additionBtn").style.boxShadow = "none";
            document.getElementById("subtractBtn").style.boxShadow = "none";
            document.getElementById("multiplyBtn").style.boxShadow = "inset 0 0 7px black";
            document.getElementById("divideBtn").style.boxShadow = "none";
            break;
        case 'Divide':
            document.getElementById("additionBtn").style.boxShadow = "none";
            document.getElementById("subtractBtn").style.boxShadow = "none";
            document.getElementById("multiplyBtn").style.boxShadow = "none";
            document.getElementById("divideBtn").style.boxShadow = "inset 0 0 7px black";
            break;
        }

    updateProblem();
    return;
}

function updateProblem() {
    debugLogging("started updateProblem");
    
    clearProblemAndAnswers();
    generateProblem();
    generateAnswers();

    return;
}

function generateProblem() {
    debugLogging("started generateProblem");


    let tempArg;
    firstArg = getRandomIntArg();
    secondArg = getRandomIntArg();

    debugLogging('firstArg: ' + firstArg);
    debugLogging('secondArg: ' + secondArg);

    switch (curOperationType)
    {
        case 'Add':
            solution = firstArg + secondArg;
            problemText = firstArg + " + " + secondArg;
            break;
        case 'Subtract':
            solution = firstArg + secondArg;
            tempArg = firstArg;
            firstArg = solution;
            solution = tempArg;
            problemText = firstArg + " - " + secondArg;
            break;
        case 'Multiply':
            solution = firstArg * secondArg;
            problemText = firstArg + " * " + secondArg;
            break;
        case 'Divide':
            solution = firstArg * secondArg;
            tempArg = firstArg;
            firstArg = solution;
            solution = tempArg;
            problemText = firstArg + " / " + secondArg;
            break;
    }
    problemText += " = ?";
    debugLogging('solution: ' + solution);

    setProblem();

    return;
}

function clearProblemAndAnswers() {
    debugLogging("clearProblemAndAnswers started");
    try {
        const _probSpanElement = document.getElementById("problemSpan");
        problemSpan.remove();
    } catch (e) {
        debugLogging("problemSpan is not yet defined");
    }
    try {
        const _answerElement = document.getElementById("answersInnerDiv");
        _answerElement.remove();
        
        answerList = [];
    } catch (e) {
        debugLogging("problemSpan is not yet defined");
    }
    // _probDivElement.innerHTML = "";
}

function setProblem() {
    debugLogging("setProblem started");

    let newProblemSpan = document.createElement("span");
    debugLogging("problemText: " + problemText);
    let newProblemText = document.createTextNode(problemText);

    newProblemSpan.appendChild(newProblemText);
    newProblemSpan.setAttribute("id", "problemSpan")
    
    _probDivElement.appendChild(newProblemSpan);
    return;
}

function generateAnswers() {
    debugLogging("generateAnswers started");

    answerList.push(solution);

    //TODO: Needs to be revised.
    //Provide close answers to encourage strict knowledge.
    // switch (curOperationType)
    // {
    //     case 'Add':
    //         answerList.push(solution+Math.ceil(Math.random()*2));
    //         break;
    //     case 'Subtract':
    //         answerList.push(solution+1);
    //         answerList.push(solution-1);
    //         break;
    //     case 'Multiply':
    //         solution = firstArg * secondArg;
    //         break;
    //     case 'Divide':
    //         solution = firstArg * secondArg;
    //         tempArg = firstArg;
    //         firstArg = solution;
    //         solution = tempArg;
    //         break;
    // }
    
    do
    {
        answerList.push(getRandomIntAnswer());
    } while (answerList.length < 8);
    answerList.sort(function(a,b){return a - b});


    debugLogging('answerList: ' + answerList);
    setAnswers();

    return;
}

function setAnswers() {
    debugLogging("setAnswers started");
    
    let newAnswerInnerDiv = document.createElement("div");
    newAnswerInnerDiv.setAttribute("id", "answersInnerDiv");

    let answerID;
    let checkAnswer;
    let newAnswerButton;
    let newButtonSpan;
    let newSpanText;
    for(let i = 0; i < answerList.length; i++) {
        answerID = "answer"+i;
        newAnswerButton = document.createElement("button");
        newAnswerButton.setAttribute("id", answerID);
        newAnswerButton.setAttribute("class", "answerListButton");
        checkAnswer = "checkAnswer(" + answerList[i] + ")";
        newAnswerButton.setAttribute("onClick", checkAnswer);
        
        newSpanText = document.createTextNode(answerList[i]);
        newButtonSpan = document.createElement("span");
        newButtonSpan.appendChild(newSpanText);
        newAnswerButton.appendChild(newButtonSpan);
        
        newAnswerInnerDiv.appendChild(newAnswerButton);
    }

    _answersDivElement.appendChild(newAnswerInnerDiv);
    return;
}

function getRandomIntArg() {
    return Math.floor(Math.random()*maxArgValue);
}

function getRandomIntAnswer() {
    let randAnswer;
    debugLogging('curOperationType: ' + curOperationType);
    switch (curOperationType)
    {
        case 'Add':
            do
            {
                randAnswer = Math.floor(Math.random()*(maxArgValue+maxArgValue));
            } while (answerList.includes(randAnswer));
            break;
        case 'Multiply':
            do
            {
                randAnswer = Math.floor(Math.random()*(maxArgValue*maxArgValue));
            } while (answerList.includes(randAnswer));
            break;
        case 'Subtract':
        case 'Divide':
            do
            {
                randAnswer = Math.floor(Math.random()*(maxArgValue));
            } while (answerList.includes(randAnswer));
            break;
    }
    // debugLogging('randAnswer: ' + randAnswer);

    return randAnswer;
}

function checkAnswer(guessedAnswer) {
    if (guessedAnswer == solution) {
        //TODO: Improve success notification
        alert("got it");
    }
    else {
        alert("Not quite right.  The answer was " + solution + ".");
    }
    return;
}


function debugLogging(consoleObj) {
    if(debugFlag == 1) {
        console.log(consoleObj);
    }
}

