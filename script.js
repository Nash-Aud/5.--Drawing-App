const canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d');

let isDrawing = false;

//setting canvas width/height 
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const startDraw = () => {
    isDrawing = true;
}

const drawing = (e) => {
    if(!isDrawing) return; //if isDrawing is false return from here

    //creating line according to the mouse poiner
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke(); //drawing line with color
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);