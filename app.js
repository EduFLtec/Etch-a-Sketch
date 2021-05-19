//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');

//Control Varriables
const gridSizeSlider = document.querySelector('.input__slider');
const eraseCanvasButton = document.querySelector('.btn__clear');
const eraseCellButton = document.querySelector('.btn__eraser');
const canvasColorPicker = document.querySelector('#canvas-color');
const brushColorPicker = document.querySelector('#brush-color');
let eraseActive;


function createCanvasCells (gridSize) {
    gridSize = gridSizeSlider.value    
//Clear cells on resize
    clearCanvas();
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let canvasCell = document.createElement('div');
        canvasCell.classList = 'canvas__cell';
        canvasGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        canvasGrid.appendChild(canvasCell);
    };
}

function clearCanvas() {
    let currentCells = document.querySelectorAll('.canvas__cell');
    if(currentCells) {
        currentCells.forEach(currentCell => {
            currentCell.remove();
        });
    }
}

function eraseCanvas() {
    let paintedCells = document.querySelectorAll('.paint');
    if (paintedCells) {
        paintedCells.forEach(paintedCells => {
            paintedCells.style.background = null;
            paintedCells.classList.remove('paint');
        });
    }
}


//Event listeners
window.onload = createCanvasCells; 
gridSizeSlider.addEventListener('mouseup', createCanvasCells);
eraseCanvasButton.addEventListener('click', eraseCanvas);


//Target grid children with event delegation
canvasGrid.addEventListener('mouseover', function (e) {
    // Remove paint class to erase "painted cells'
    if (e.target.matches('.canvas__cell') && eraseActive){
      e.target.classList.remove('paint');
      e.target.style.background = null;
    // Add paint class to apply background via CSS and 'paint cell'
    } else {
        e.target.classList.add('paint');
        e.target.style.background = brushColorPicker.value;
    }
  });

//Event delgegation to toggle active class
eraseCellButton.addEventListener('click', function (e) {
  if (e.target.matches('.active')) {
       e.target.classList.remove('active');
       eraseActive = false;
    } else {
        e.target.classList.add('active');
        eraseActive = true;
    }
});
  
canvasColorPicker.addEventListener('change', function (e) {
    canvasGrid.style.background = e.target.value;
});

