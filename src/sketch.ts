// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    
    widthHead: 200,
    heightHead: 229,
    Download_Image: () => save(),
}
gui.add(params, "widthHead", 200, 1000, 1)
gui.add(params, "heightHead", 229, 1000, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {


}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}