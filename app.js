//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');

//Control Varriables
const gridSizeSlider = document.querySelector('.input__slider');
const eraseCanvasButton = document.querySelector('.btn__clear');
const eraseCellButton = document.querySelector('.btn__eraser');
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
    // Add paint class to apply background via CSS and 'paint cell'
    if (e.target.matches('.canvas__cell') && eraseActive){
      e.target.classList.remove('paint');
    } else {
        e.target.classList.add('paint');
    }
  });

//Target button child with event delegation to toggle active class
eraseCellButton.addEventListener('click', function (e) {
  if (e.target.matches('.active')) {
       e.target.classList.remove('active');
       eraseActive = false;
    } else {
        e.target.classList.add('active');
        eraseActive = true;
    }
});
  
