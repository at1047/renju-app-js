var canvas = document.querySelector('canvas');
const dim = Math.min(window.innerHeight, window.innerWidth) * 0.9;
canvas.height = canvas.width = dim
canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border: 0px none black; background-color: #d4913d"
var ctx = canvas.getContext('2d');

const boardSize = 16;
const gridSpacing = dim/boardSize;
const padding = gridSpacing/2;
const whitePiece = "#FFFFFF"
const blackPiece = "#000000"
const directions = [[0,1], [1,0], [1,1], [1,-1]]; // Vertical, Horizontal, Up right diag, up left diag
let turn = 1;

function drawGrid() {
    ctx.beginPath();
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
    for (var x = 0; x <= boardSize; x++) {
        dict[x] = {};
        for (var y = 0; y <= boardSize; y++) {
            dict[x][y] = 0;
        }
    }
    drawGrid();
    return dict;
}

function drawAllPieces(dict) {
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
    dict[x][y] = (color == blackPiece)? 1 : 2; 
    colorString = (color == blackPiece)? "Black Piece" : "White Piece";
    console.log(colorString + " added at " + x + ", " + y);
}

function rmPiece(x, y) {
    dict[x][y] = 0;
}

function checkLength(x, y) {
    let counter;
    let infoObj = {0: undefined, 1: undefined, 2: undefined, 3: undefined, "win": -1};
    let lengthInfo;
    for (var i = 0; i < directions.length; i++) {
        counter = 1;
        lengthInfo = {}
        const basePiece = dict[x][y];
        const dir = directions[i]; 
        const dirX = dir[0];
        const dirY = dir[1]; 
        let x1 = x2 = x;
        let y1 = y2 = y;
        while (x1 > 0 && x1 < boardSize && y1 > 0 && y1 < boardSize && dict[x1 + dirX][y1 + dirY] == basePiece) {
            x1 += dirX;
            y1 += dirY;
            counter++;
        }
        lengthInfo["a"] = [x1, y1];
        while (x2 > 0 && x2 < boardSize && y2 > 0 && y2 < boardSize && dict[x2 - dirX][y2 - dirY] == basePiece) {
            x2 -= dirX;
            y2 -= dirY;
            counter++;
        }
        lengthInfo["b"] = [x2, y2];
        lengthInfo["len"] = counter;
        infoObj[i] = lengthInfo;
        if (counter >= 5) {
            infoObj["win"] = i;
        }
    }
    return infoObj; 
}

function redrawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawAllPieces(dict);
}

function coordToPos(x, y) {
    x = Math.floor(x / gridSpacing);
    y = Math.floor(y / gridSpacing);
    return [x,y];
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    [xCoord,yCoord] = coordToPos(x,y);
    console.log("x: " + xCoord + " y: " + yCoord);
    const currentTurn = (turn == 1)? blackPiece : whitePiece;
    if (dict[xCoord][yCoord] == 0) {
        addPiece(xCoord, yCoord, currentTurn);
        redrawEverything();
        infoObj = checkLength(xCoord, yCoord);
        if (infoObj["win"] != -1) {
            const currentPlayer = (turn == 1)? "Black" : "White";
            alert(currentPlayer + " won!")
        }
        turn *= -1
    }
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
})

dict = initBoard();
redrawEverything();


// addPiece(2, 2, blackPiece);
// addPiece(2, 3, whitePiece);
// addPiece(3, 2, whitePiece);
// addPiece(1, 4, whitePiece);
// addPiece(0, 5, whitePiece);
// addPiece(4, 1, whitePiece);
// redrawEverything(dict);
// console.log(checkLength(2, 3));