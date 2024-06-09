
function create(type, content = "", parent, ...classes)
{
  if(typeof(type) !== "string" || typeof(parent) !== "object") 
  {
    console.log("bad create parameters");
    return null;
  }

  const created = document.createElement(type);
  created.textContent = content;

  for (const classToAdd of classes) {
    created.classList.add(classToAdd);
  }
  
  parent.appendChild(created);

  return created;
}

const canvas = document.getElementById("canvas");

CreateNewCanvas(16);

const newButton = document.querySelector("#new-canvas");
newButton.addEventListener("click", (data) => 
{
    let size = Number(prompt("Enter canvas size"));
    CreateNewCanvas(size);
});

/* Is Mouse Down */
let isMouseDown = false;
let mouseDownID = 0;
document.addEventListener("mousedown", (data) =>
{ 
    isMouseDown = true;
    mouseDownID = data.button;
});
document.addEventListener("mouseup", (data) =>
{
    isMouseDown = false;
    mouseDownID = data.button;
});


function CreateNewCanvas(size)
{
    if(size > 64)
    {
        size = 64;
        console.log("Canvas size too big, max size is 64");
    }

    let collection = document.querySelectorAll(".square");

    for (let i = 0; i < collection.length; i++) {
        collection[i].remove();
    }

    for (let i = 0; i < size*size; i++) {
        const square = create("div", ``, canvas, "square");
    
        square.addEventListener("mouseenter", (data) =>
        {
            if(isMouseDown)
                paintSquare(square);
        });

        square.addEventListener("mousedown", (data) =>
        {
            mouseDownID = data.button;
            paintSquare(square);
        });
    }

    canvas.style.width = (size*12) + "px";

    console.log("New Canvas created. size: " + size);
}

function paintSquare(square)
{
    switch (mouseDownID) {
        case 0:
            square.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            break;
            
        case 2:
            square.style.backgroundColor = '#ffffff';
            break;
    }
}