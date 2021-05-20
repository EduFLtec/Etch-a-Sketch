//Grid Varriables
const canvasGrid = document.querySelector('.canvas__grid');

//Control Varriables
const gridSizeSlider = document.querySelector('.input__slider');
const eraseCanvasButton = document.querySelector('.btn__clear');
const eraseCellButton = document.querySelector('.btn__eraser');
const canvasColorPicker = document.querySelector('#canvas-color');
const brushColorPicker = document.querySelector('#brush-color');
const rainbowButton = document.querySelector('.btn__rainbow');
const shaderButton = document.querySelector('.btn_shader');
let eraseActive;
let rainbowActive;


function createCanvasCells (gridSize) {
    gridSize = gridSizeSlider.value    
//Clear cells on resize
    clearCanvas();
//Toggle rainbow or eraser button off on resize 
    setEraserBtnOff();
    setRainbowBtnOff();
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

function paintCells (e) {
// Remove paint class to erase "painted cells'
    if (e.target.matches('.canvas__cell') && eraseActive){
        e.target.classList.remove('paint');
        e.target.style.background = null;
    // Add paint class to apply background via CSS and 'paint cell'
    } else {
        e.target.classList.add('paint');
        if(rainbowActive) {
            let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
            let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
            let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
            e.target.style.background = `rgb(${r}, ${g}, ${b})`;
        } else {
            e.target.style.background = brushColorPicker.value;
        };
    };
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

function toggleEraseCell(e) {
    if (e.target.matches('.active')) {
        setEraserBtnOff();
     } else {
         e.target.classList.add('active');
         eraseActive = true;
         //Toogle rainbow button off when eraser is on
         setRainbowBtnOff();
     };
};

function setRainbowBtnOff() {
    rainbowButton.classList.remove('active');
    rainbowActive = false;
};

function toggleRainbow(e) {
    if (e.target.matches('.active')) {
        setRainbowBtnOff();
      } else {
          e.target.classList.add('active');
          rainbowActive = true;
          //Toogle eraser button off when rainbow is on
         setEraserBtnOff();
      };
}


//Event listeners
window.onload = createCanvasCells; 
gridSizeSlider.addEventListener('mouseup', createCanvasCells);
eraseCanvasButton.addEventListener('click', eraseCanvas);
canvasColorPicker.addEventListener('change', selectCanvasColor);
canvasColorPicker.addEventListener('input', selectCanvasColor);
canvasGrid.addEventListener('mouseover', paintCells);
eraseCellButton.addEventListener('click', toggleEraseCell);
rainbowButton.addEventListener('click', toggleRainbow);