const button0 = document.getElementById('num-0')
const button1 = document.getElementById('num-1')
const button2 = document.getElementById('num-2')
const button3 = document.getElementById('num-3')
const button4 = document.getElementById('num-4')
const button5 = document.getElementById('num-5')
const button6 = document.getElementById('num-6')
const button7 = document.getElementById('num-7')
const button8 = document.getElementById('num-8')
const button9 = document.getElementById('num-9')
const buttonComma = document.getElementById('dot')

const buttonAdd = document.getElementById('add')
const buttonSub = document.getElementById('sub')
const buttonMult = document.getElementById('mult')
const buttonDiv = document.getElementById('div')
const buttonEq = document.getElementById('equal')

const displayDOM = document.getElementById('display')
const historyDOM = document.getElementById('history')

const allButtons = [
    button0,
    button1,
    button2,
    button3,
    button4,
    button5,
    button6,
    button7,
    button8,
    button9,
]

let historySum = 0
let noNum = true
let lastOperator;

// function clear() {
//     display = "0"
//     history = ""
//     historySum = 0
//     noNum = true
// }


function addNum(x) {
    if (noNum && x !== '.') {
        displayDOM.textContent = ""
        noNum = false
    }
    displayDOM.textContent += x.toString()
}

allButtons.forEach(button => {
    button.addEventListener('click', () => {
        addNum(button.innerText)
    })
})

function enableComma() {
    buttonComma.addEventListener('click', () => {
        addNum(buttonComma.innerText)
    }, {
        once: true
    })
}
enableComma()

function equal(a, b, operator) {
    if (operator == '+') {
        lastOperator = '+'
        return a + b
    }
    if (operator == '-') {
        lastOperator = '-'
        return a - b
    }
    if (operator == '*') {
        lastOperator = '*'
        return a * b
    }
    if (operator == '/') {
        lastOperator = '/'
        return a / b
    }
    return equal(a, b, lastOperator)
}

function operation(operator) {
    console.log(historySum)
    historyDOM.textContent += `${displayDOM.textContent} ${operator} `
    let x = equal(+historySum, +displayDOM.textContent.toString(), operator)
    displayDOM.textContent = x
    historySum = x
    if (operator == '='){
        historySum = 0
    }

    noNum = true
    enableComma()
}

buttonAdd.addEventListener('click', e => {
    operation('+')
})
buttonSub.addEventListener('click', e => {
    operation('-')
})
buttonMult.addEventListener('click', e => {
    operation('*')
})
buttonDiv.addEventListener('click', e => {
    operation('/')
})
buttonEq.addEventListener('click', e => {
    operation('=')
})