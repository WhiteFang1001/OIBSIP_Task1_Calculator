class Calculator {
  constructor(ort, prt) {
    this.ort = ort
    this.prt = prt
    this.clear()
  }

  clear() {
    this.prd = ''
    this.ord = ''
    this.operation = undefined
  }

  delete() {
    this.prd = this.prd.toString().slice(0, -1)
  }

  jn(number) {
    if (number === '.' && this.prd.includes('.')) return
    this.prd = this.prd.toString() + number.toString()
  }

  co(operation) {
    if (this.prd === '') return
    if (this.ord !== '') {
      this.cm()
    }
    this.operation = operation
    this.ord = this.prd
    this.prd = ''
  }

  cm() {
    let fv
    const ov = parseFloat(this.ord)
    const cv = parseFloat(this.prd)
    if (isNaN(ov) || isNaN(cv)) return
    switch (this.operation) {
      case '+':
        fv = ov + cv
        break
      case '-':
        fv = ov - cv
        break
      case '*':
        fv = ov * cv
        break
      case '÷':
        fv = ov / cv
        break
      default:
        return
    }
    this.prd = fv
    this.operation = undefined
    this.ord = ''
  }

  sd(number) {
    const sn = number.toString()
    const id = parseFloat(sn.split('.')[0])
    const dd = sn.split('.')[1]
    let integerDisplay
    if (isNaN(id)) {
      integerDisplay = ''
    } else {
      integerDisplay = id.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (dd != null) {
      return `${integerDisplay}.${dd}`
    } else {
      return integerDisplay
    }
  }

  ud() {
    this.prt.innerText =
      this.sd(this.prd)
    if (this.operation != null) {
      this.ort.innerText =
        `${this.sd(this.ord)} ${this.operation}`
    } else {
      this.ort.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const ort = document.querySelector('[data-or]')
const prt = document.querySelector('[data-pr]')

const calculator = new Calculator(ort, prt)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.jn(button.innerText)
    calculator.ud()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.co(button.innerText)
    calculator.ud()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.cm()
  calculator.ud()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.ud()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.ud()
})