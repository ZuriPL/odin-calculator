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

const buttonClear = document.getElementById('clear')
const buttonDel = document.getElementById('delete')

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

let a = null
let b = null
let operation = ''

let noHistory = false
let noNum = true

displayDOM.textContent = "0"

function clear() {
    a = null
    b = null
    operation = ''

    noHistory = false
    noNum = true

    displayDOM.textContent = "0"
    historyDOM.textContent = ""
}

allButtons.forEach(button => {
    button.addEventListener('click', () => {
        addNum(button.innerText)
    })
})

buttonComma.addEventListener('click', () => {
    if (displayDOM.textContent.indexOf('.') < 0)
        addNum(buttonComma.innerText)
        noNum = false
})

function roundAnswer(inp) {
    return inp.slice(0, 12)
}

function addNum(x) {
    if (noHistory) {
        historyDOM.textContent = ''
        noHistory = false
    }
    if (noNum && x !== '.') {
        displayDOM.textContent = ""
        noNum = false
    }
    displayDOM.textContent += x.toString()
    displayDOM.textContent = roundAnswer(displayDOM.textContent)
    a = +displayDOM.textContent
}


function equal() {
    let answer;
    if (operation == '+') {
        answer = roundAnswer('' + (b + a))
    }
    if (operation == '-') {
        answer = roundAnswer('' + (b - a))
    }
    if (operation == '*') {
        answer = roundAnswer('' + (b * a))
    }
    if (operation == '/') {
        answer = roundAnswer('' + (b / a))
        if (a == 0) {
            answer = "lmao"
            noNum = true
            a = null
            b = null
        }

    }
    displayDOM.textContent = answer
    return answer
}


function operate(operator) {
    if (noHistory) {
        historyDOM.textContent = ''
        noHistory = false
    }
    
    historyDOM.textContent += `${displayDOM.textContent} ${operator} `
    if (a != null && b != null) {
        a = equal()
    }
    operation = operator
    b = a
    noNum = true


}

buttonAdd.addEventListener('click', e => {
    operate('+')
})
buttonSub.addEventListener('click', e => {
    operate('-')
})
buttonMult.addEventListener('click', e => {
    operate('*')
})
buttonDiv.addEventListener('click', e => {
    operate('/')
})
buttonEq.addEventListener('click', e => {
    historyDOM.textContent += `${displayDOM.textContent} = `
    noHistory = true
    equal()
})

buttonDel.addEventListener('click', e => {
    displayDOM.textContent = displayDOM.textContent.slice(0, displayDOM.textContent.length - 1)
    a = +displayDOM.textContent
})
buttonClear.addEventListener('click', e => {
    clear()
})