const doc = document

const canvas = doc.querySelector ('#canv')
ctx = canvas.getContext ('2d')
console.dir(ctx)

// //Draw square

// ctx.fillStyle = '#ff0000'
// ctx.fillRect (100, 50, 200,300)

// ctx.fillStyle = '#ff9900'
// ctx.fillRect (150, 150, 50, 50)

let system = {
	currentTool: null,
	currentColor: '#000', 
	brushSize: 5
}

function getCoordinates (evt) {
	doc.querySelector ('#x-coord').innerText = evt.offsetX
	doc.querySelector ('#y-coord').innerText = evt.offsetY
}

function renderSystem (elem, act) {
	system [elem] = act
}

function handleClick (evt) {
	if (evt.target.classList.contains ('tools-button')) {
		renderSystem ('currentTool', evt.target.dataset.name)
		// console.log (evt.target.dataset.name)
	}
}

function handleInput (evt) {
	if (evt.target.id === 'select-size') {
		renderSystem ('brushSize', evt.target.value)
		// console.log ('size ' + evt.target.value)
	}
	 if (evt.target.id === 'select-color') {
	 	renderSystem ('currentColor', evt.target.value)
		// console.log ('color ' + evt.target.value)
	}
}

function startDraw (evt) {
	if (system.currentTool === 'pencil') {
		pencil (evt)
	}
}
 
function endDraw () {
	canvas.onmousemove = null
}

//add Tools

function pencil () {
	canvas.onmousemove = function (evt) {
		let x = +doc.querySelector ('#x-coord').innerText
		let y = +doc.querySelector ('#y-coord').innerText
		ctx.fillStyle = system.currentColor
		ctx.fillRect (x, y, system.brushSize, system.brushSize)
	}
}

function brush () {
	canvas.onmousemove = function (evt) {
		let x = +doc.querySelector ('#x-coord').innerText
		let y = +doc.querySelector ('#y-coord').innerText
		ctx.fillStyle = system.currentColor
		ctx.fillRect (x, y, system.brushSize, system.brushSize)
	}
}

function reset () {
	system.currentTool = null,
	system.currentColor = '#000',
	system.brushSize = 5
}

function del() {
	context.globalCompositeOperation = 'destination-out'; // изменяем параметр, чтобы стиралось
	context.fillStyle="rgba(255,255,255,1)"; // зададим белый цвет, чтобы проверить, что не закрашивается
	context.beginPath(); 
	context.arc(120, 80, 70, 0, Math.PI*2, false); 
	context.closePath(); 
	context.fill(); 
	context.globalCompositeOperation = "source-over"; // возвращаем по-умолчанию
}

canvas.addEventListener ('mousemove', getCoordinates)
canvas.addEventListener ('mousedown', startDraw)
canvas.addEventListener ('mouseup', endDraw)
doc.addEventListener ('click', handleClick)
doc.addEventListener ('input', handleInput)

// canvas.addEventListener ('click', function () {
// 	ctx.fillStyle = system.currentColor
// 	if (system.currentTool === 'brush')
// 	{
// 		ctx.fillRect (+doc.querySelector ('#x-coord').innerText, +doc.querySelector ('#y-coord').innerText, system.brushSize, system.brushSize)
// 	} 
// })