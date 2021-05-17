//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');
// let gridSize = getGridSize();
const slider = document.querySelector('.input__slider');

//Cell Creation Function 
function createCanvasCells (gridSize) {
    gridSize = slider.value
    let currentCells = document.querySelectorAll('.canvas__cell');
    if(currentCells){
        currentCells.forEach(currentCell => {
            currentCell.remove();
        });
    }
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let canvasCell = document.createElement('div');
        canvasCell.classList = 'canvas__cell';
        canvasGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        canvasGrid.appendChild(canvasCell);
    };
}

slider.onmouseup = createCanvasCells;
window.onload = createCanvasCells;