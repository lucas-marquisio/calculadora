const buttonNumber = document.querySelectorAll('.button-number')
const buttonOperation = document.querySelectorAll('.button-operation')
const buttonClear = document.querySelector('.button-clear')
const buttonCalculate = document.querySelector('.button-calculate')
const screen = document.querySelector('.screen')
const screenPreview = document.querySelector('.preview')

let memoryCalculator = []
let isOperation = false

const setMemoryCalculator = (value) => {
  memoryCalculator.push(value)
  if(memoryCalculator.length == 2)  setPreview(memoryCalculator)
}
const resetMemoryCalculator = () => {
  memoryCalculator = []
}
const getValueScreen = () => {
  return screen.value
}
const addValueScreen = (valor) => {
  const Screen = getValueScreen()
  Screen == "0" ? screen.value = valor : screen.value += valor
}
const clearScreen = () => {
  screen.value = 0
}
const addNumber = (e) => {
  const number = e.target.value
  if(isOperation) {
    clearScreen()
    isOperation = false
    addValueScreen(number)
    return
  }
  addValueScreen(number)
} 
const addOperation = (e) => {
  const simbolOperation = e.target.value
  const valueScreen = getValueScreen()
  if(valueScreen == "0" || valueScreen == 0) return 

  if(memoryCalculator.length == 2) {
    setMemoryCalculator(valueScreen)
    const response = operationCalculate(memoryCalculator)
    resetMemoryCalculator()
    setMemoryCalculator(response)
    setMemoryCalculator(simbolOperation)
    clearScreen()
    addValueScreen(response)
    isOperation = true
    return 
  }
  if(memoryCalculator.length == 1){
    setMemoryCalculator(simbolOperation)
    clearScreen()
    return 
  } 
  setMemoryCalculator(valueScreen)
  setMemoryCalculator(simbolOperation)
  clearScreen()
}

const operationCalculate = (value) => {
  const [firstNum, operation, secondNum] = value
  const toCalc = `${firstNum}${operation}${secondNum}`
  const response = eval(toCalc)
  return response
}
const clearMemory = () => {
  resetMemoryCalculator()
  clearScreen()
}

const finalResult = () => {
  if(memoryCalculator.length == 3) {
    const response = operationCalculate(memoryCalculator)
    resetMemoryCalculator()
    setMemoryCalculator(response)
    clearScreen()
    addValueScreen(response)
    clearPreview()
    return
  }
  const [firstNum, operation] = memoryCalculator
  const valueScreen = getValueScreen()
  const calc = [firstNum, operation, valueScreen]
  const response = operationCalculate(calc)
  resetMemoryCalculator()
  setMemoryCalculator(response)
  clearScreen()
  addValueScreen(response)
  clearPreview()
}
const setPreview = (value) => {
  const [firstNumber, operation] = value
  if(operation) screenPreview.innerHTML = `${firstNumber} ${operation}`
  
}
const clearPreview = () => {
  screenPreview.innerHTML = ''
}

buttonCalculate.addEventListener('click', finalResult)
buttonOperation.forEach(button => button.addEventListener('click', addOperation))
buttonNumber.forEach(button => button.addEventListener('click', addNumber))
buttonClear.addEventListener('click', clearMemory)