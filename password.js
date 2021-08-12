const output = document.getElementById("result")
const generate = document.getElementById("btn")
const lent = document.getElementById("length")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("characters")


const funcs = {
	lower: randomLower,
	upper: randomUpper,
	number: randomNumber,
	symbol: randomSymbol
}

generate.addEventListener("click", function(){
	const islength = +lent.value
	const isLower = lowercase.checked
	const isUpper = uppercase.checked
	const isNumber = numbers.checked
	const isSymbol = symbols.checked
    
	output.innerText = generatePassword(isUpper, isLower, isNumber,isSymbol, islength)

	let getLocalStorage = localStorage.getItem("New Passwords")
	if (getLocalStorage === null){
		store = []
	}
	else {
		store = JSON.parse(getLocalStorage)
	}
	
	store.push(output.innerText)
	window.localStorage.setItem("New Passwords", JSON.stringify(store))
})

function generatePassword(upper, lower, number, symbol, length){
	let password = ''

	const typeCount = lower + upper + number + symbol

	const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

	if (typeCount === 0) {
		return ''
	}

	for (let i = 0; i < length; i+= typeCount) {
		typeArr.forEach(type => {
			const funcname = Object.keys(type)[0]

			password += funcs[funcname]()
		})
	}

	const final = password.slice(0, length)

	return final
}

function randomUpper(){
 const capital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
 return capital[Math.floor(Math.random() * 26)]
}

function randomLower(){
	const smaller = 'abcdefghijklmnopqrstuvwxyz'
	return smaller[Math.floor(Math.random() * 26)]
}

function randomNumber(){
	return String.fromCharCode(Math.floor(Math.random() *10 +48))
}

function randomSymbol(){
	const sym = "'!@#$%^&*(){}:[],<>./?"
	return sym[Math.floor(Math.random() * sym.length)]
}
