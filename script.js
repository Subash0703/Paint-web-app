// --------- This Javascript File is to respond on Web app only ---------//


let canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext("2d");
ctx.lineWidth = 5;

let prevX = null;
let prevY = null;

let draw = false;

let colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", (e) => {
    let selectedColor = e.target.value;
    ctx.strokeStyle = selectedColor;
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketchimg.png";
    a.click();
})

window.addEventListener("mousedown", (e) => draw = true);
window.addEventListener("mouseup", (e) => draw = false);

window.addEventListener("mousemove", function(e){
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }

    let mouseX = e.clientX;
    let mouseY = e.clientY;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();

    prevX = e.clientX;
    prevY = e.clientY;
})