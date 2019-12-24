// ***************************************************************************
// Global
// ***************************************************************************
var State = {
    currentSize: 16,
    inkType: document.querySelector('input[name="ink"]:checked').value,
    canvasWidth: 600,
    canvasHeight: 600
};
const canvas = document.querySelector('#canvas');
const form = document.querySelector('form');
const resetBtn = document.getElementById('reset');
const sizeBtn = document.getElementById('size');


// ***************************************************************************
// Execution at start
// ***************************************************************************
canvas.style.width  = State.canvasWidth + 'px';
canvas.style.height = State.canvasHeight + 'px';
const row = createRow(16)


// ***************************************************************************
// Event Listeners
// ***************************************************************************

canvas.addEventListener('mouseover', paint);
form.addEventListener('mouseover', checkInkColor);
resetBtn.addEventListener('click', resetCanvas);
sizeBtn.addEventListener('click', resizeCanvas);


// ***************************************************************************
// Functions
// ***************************************************************************

// Create all the squares inside the canvas, by inserting in it one long
// row of length size^2
function createRow(size) {
    for (var i = 0; i < size * size; i++) {
        var singleSquare = document.createElement('div');
        singleSquare.classList.add('singleSquare');
        singleSquare.style.width = 600 / size + 'px';
        singleSquare.style.height = 600 / size + 'px';
        canvas.appendChild(singleSquare);
    }
    
    return 1;
}


// Color the square under the mouse pointer
function paint(e) {
    // Convert the english name of the color into an RGBA code
    if (State.inkType == 'black') inkColor = 'rgba(0,0,0,1)';
    if (State.inkType == 'grey') inkColor = 'rgba(100,100,100,1)';
    if (State.inkType == 'random') { 
        randomRGBA = 'rgba(' + 
                Math.floor(Math.random()*255) + ', ' +  // R
                Math.floor(Math.random()*255) + ', ' +  // G
                Math.floor(Math.random()*255) + ', ' +  // B
                '1)';                                   // A
        inkColor = randomRGBA;
    }

    // Color a square but only if its not already colored
    if (e.target.style.backgroundColor == '') {
        e.target.style.backgroundColor = inkColor;
    }
}


// Check the selected ink color radio button
function checkInkColor() {
    State.inkType = document.querySelector('input[name="ink"]:checked').value;
}


// Clear the canvas
function resetCanvas(e) {
    e.preventDefault();
    emptyCanvas();
    createRow(State.currentSize);
}


// Create a new canvas with a new size
function resizeCanvas(e) {
    e.preventDefault();
    var newSize = prompt('Enter the number of desired squares per row (1 through 30):', 10);
    State.currentSize = validateNewSize(newSize);
    emptyCanvas();
    createRow(State.currentSize);
}



// ***************************************************************************
// Helper Functions
// ***************************************************************************

// Empty the canvas
function emptyCanvas() {
    while(canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

// Make the input a valid number of squares
function validateNewSize(size) {
    var validSize = Math.floor(size);

    if (Number.isInteger(validSize)) {
        if (validSize < 1 || validSize > 30 ) {
            validSize = 16;
        }
    } else {
        validSize = 16;
    }
    
    return validSize;
}

