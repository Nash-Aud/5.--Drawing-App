const canvas = document.querySelector('canvas'),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
ctx = canvas.getContext('2d');

//global variables with default value
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5;

//setting canvas width/height 
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

const drawRect = (e) => {
    //if fillcolor isnt checked draw a rect with border, else rect with color background
    if(!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY); //mathod that draws rec, no fill        
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); //new path to draw circle
    //getting radius for circle according to mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    //mathod that draws arc, no fill        
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); 
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY); //moving triangle to mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY);//first line of triangle according mouse pointer
    ctx.lineTo(prevMouseX *2 - e.offsetX, e.offsetY); //bottom line of triangle
    ctx.closePath(); //closing path of triangle
    ctx.stroke();
}

const startDraw = (e) => {
    isDrawing = true;    
    prevMouseX = e.offsetX; //passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; //passing current mouseY position as prevMouseY value   
    ctx.beginPath(); //starts a new drawing
    ctx.lineWidth = brushWidth; //passing brushSize as lineWidth
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); //copies pixel data 

}

const drawing = (e) => {
    if(!isDrawing) return; //if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); //put imagedata back to canvas

    if(selectedTool === "brush") {
    //creating line according to the mouse poiner
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke(); //drawing line with color        
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if(selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { //adding click event to all tool option
        //removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    })
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousemove", drawing);