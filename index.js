var canvas = document.querySelector('canvas');
const dim = Math.min(window.innerHeight, window.innerWidth) * 0.9;
canvas.height = canvas.width = dim
canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border: 0px none black; background-color: #d4913d"
var ctx = canvas.getContext('2d');
// var dict = {};

const gridSpacing = dim/16;
const padding = gridSpacing/2;
const whitePiece = "#FFFFFF"
const blackPiece = "#000000"

function drawGrid() {
    for (var x = padding; x <= dim; x += gridSpacing) {
        ctx.moveTo(x, padding);
        ctx.lineTo(x, dim - padding);
    }

    for (var y = padding; y <= dim; y += gridSpacing) {
        ctx.moveTo(padding, y);
        ctx.lineTo(dim - padding, y);
    }
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawPiece(x, y, color) {
	let xCoord = x * gridSpacing + padding	
	let yCoord = y * gridSpacing + padding	
	ctx.beginPath();
	ctx.arc(xCoord, yCoord, gridSpacing * 0.45, 0*Math.PI, 2*Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.stroke();
}

function initBoard() {
	let dict = {};
	for (var x = 0; x <= 16; x++) {
		dict[x] = {};
		for (var y = 0; y <= 16; y++) {
			dict[x][y] = 0;
		}
	}
	return dict;
}

function drawBoard(dict) {
	for (x in dict) {
		for (y in dict[x]) {
			if (dict[x][y] == 1) {
				drawPiece(x, y, blackPiece);
			} else if (dict[x][y] == 2) {
				drawPiece(x, y, whitePiece);
			}
		}
	}	
}

function addPiece(x, y, color) {
	drawPiece(x, y, color);
	dict[x][y] = (color == blackPiece)? 1 : 2; 
	colorString = (color == blackPiece)? "Black Piece" : "White Piece";
	console.log(colorString + " added at " + x + ", " + y);
}

const directions = [[0,1], [1,0], [1,1], [1,-1]]; // Vertical, Horizontal, Up right diag, up left diag

// function checkWin(x, y) {
// 	for (var dir in directions) {
// 		let counter = 1;
// 		let dir1 = dict[x][y];
// 		let dir2 = dict[x][y];
// 		const current = dict[x][y];
// 		while ()
// 	}
// }

drawGrid();
// drawPiece(3, 3, blackPiece);
dict = initBoard();
addPiece(2, 2, blackPiece);
addPiece(2, 3, whitePiece);
addPiece(3, 2, whitePiece);
drawBoard(dict);

// console.log(dict[3][4]);