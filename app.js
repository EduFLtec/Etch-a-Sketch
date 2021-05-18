//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');

//Control Varriables
const slider = document.querySelector('.input__slider');


function createCanvasCells (gridSize) {
    gridSize = slider.value
    let currentCells = document.querySelectorAll('.canvas__cell');
//Clear cells on resize
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


//Event listeners
window.onload = createCanvasCells; 
slider.onmouseup = createCanvasCells;

//Target grid children with event delegation
canvasGrid.addEventListener('mouseover', function (e) {
    // Add paint class to apply background via CSS
    if (e.target.matches('.canvas__cell')) {
      e.target.classList.add('paint');
    }
  });



