//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');

//Control Varriables
const gridSizeSlider = document.querySelector('.input__slider');
const eraseCanvasButton = document.querySelector('.btn__clear');
const eraseCellButton = document.querySelector('.btn__eraser');
const canvasColorPicker = document.querySelector('#canvas-color');
const brushColorPicker = document.querySelector('#brush-color');
const rainbowButton = document.querySelector('.btn__rainbow');
let eraseActive;
let rainbowActive;


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
};

function clearCanvas() {
    let currentCells = document.querySelectorAll('.canvas__cell');
    if(currentCells) {
        currentCells.forEach(currentCell => {
            currentCell.remove();
        });
    }
};

function eraseCanvas() {
    let paintedCells = document.querySelectorAll('.paint');
    //toggle rainbow or eraser button off 
   setEraserBtnOff();
   setRainbowBtnOff();
    if (paintedCells) {
        paintedCells.forEach(paintedCells => {
            paintedCells.style.background = null;
            paintedCells.classList.remove('paint');
        });
    }
};

function selectCanvasColor(e) {
    canvasGrid.style.background = e.target.value;
}; 


function setEraserBtnOff() {
    eraseCellButton.classList.remove('active');
    eraseActive = false;
};

function setRainbowBtnOff() {
    rainbowButton.classList.remove('active');
    rainbowActive = false;
};

//Event listeners
window.onload = createCanvasCells; 
gridSizeSlider.addEventListener('mouseup', createCanvasCells);
eraseCanvasButton.addEventListener('click', eraseCanvas);
canvasColorPicker.addEventListener('change', selectCanvasColor);
canvasColorPicker.addEventListener('input', selectCanvasColor);


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
    };
  });

//Event delgegation to toggle active class
eraseCellButton.addEventListener('click', function (e) {
  if (e.target.matches('.active')) {
       setEraserBtnOff();
    } else {
        e.target.classList.add('active');
        eraseActive = true;
        //Toogle rainbow button off when eraser is on
        setRainbowBtnOff();
    };
});
  
rainbowButton.addEventListener('click', function (e) {
    if (e.target.matches('.active')) {
        setRainbowBtnOff();
      } else {
          e.target.classList.add('active');
          rainbowActive = true;
          //Toogle eraser button off when rainbow is on
         setEraserBtnOff();
      };
  });
