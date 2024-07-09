// --------- This Javascript File is to respond on Web app and Mobile too ---------//

let canvas = document.getElementById("canvas");
let brushSize = document.getElementById("brushSize");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

brushSize.addEventListener("input", function () {
  let bSize = parseInt(brushSize.value);
  ctx.lineWidth = bSize;
});

let prevX = null;
let prevY = null;

let draw = false;

function startDrawing(e) {
  draw = true;
  if (e.touches && e.touches.length > 0) {
    prevX = e.touches[0].clientX;
    prevY = e.touches[0].clientY;
  } else if (e.changedTouches && e.changedTouches.length > 0) {
    prevX = e.changedTouches[0].clientX;
    prevY = e.changedTouches[0].clientY;
  } else {
    prevX = e.clientX;
    prevY = e.clientY;
  }
}

function stopDrawing() {
  draw = false;
  prevX = null;
  prevY = null;
}

function drawLine(e) {
  e.preventDefault();

  if (!draw) return;

  let x, y;

  if (e.touches) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  prevX = x;
  prevY = y;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", drawLine);

document.addEventListener("touchstart", startDrawing);
document.addEventListener("touchend", stopDrawing);
document.addEventListener("touchmove", drawLine);

let colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", (e) => {
  let selectedColor = e.target.value;
  ctx.strokeStyle = selectedColor;
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketchimg.png";
  a.click();
});

canvas.addEventListener("touchstart", function (e) {
  e.preventDefault();
});
canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
});
