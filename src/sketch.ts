// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    
    N: 0,
    NBLONGUEUR: 5,
    NBHAUTEUR : 5,
    MULTIPLE :5,
    multTransfo : 5,
    Download_Image: () => save(),
}
gui.add(params, "N",0, 1000, 1)
gui.add(params, "NBLONGUEUR", 0, 100, 1)
gui.add(params, "NBHAUTEUR", 0, 100, 1)
gui.add(params, "MULTIPLE", 1, 20, 1)
gui.add(params, "multTransfo", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------


let shiftBRXover;
let shiftTRXover;

let shiftBLYover;
let shiftBRYover;
function draw() {

    randomSeed(params.N);
    print("coucou")
    let beginPathX = random(1,5)*params.MULTIPLE;
    let beginPathY = random(1,5)*params.MULTIPLE;

    //the right bottom shift;
    let shiftBRX = random(1,3)*params.MULTIPLE;
    shiftBRXover = shiftBRX;
    let shiftBRY = random(1,3)*params.MULTIPLE;
    shiftBRYover = shiftBRY;
    
    

    //the top right shift;
    let shiftTRX = random(5,10)*params.MULTIPLE;
    shiftTRXover = shiftTRX;
    //bottomleft shift
    let shiftBLY = random(1,5)*params.MULTIPLE;
    shiftBLYover = shiftBLY;

    
    
    
    let coordonateX = [];
    let coordonateY = [];
    background('black')

    stroke('white');

    
    for(let h=0; h < params.NBHAUTEUR; h++ ){
        
        for(let i=0; i< params.NBLONGUEUR; i+=2){
            
            
            // let vector = shifterPro(beginPathX, beginPathY);
            // let vector2 = shifterPro(beginPathX+shiftBRX, beginPathY+shiftBRY);
            // let vector3 = shifterPro(beginPathX + shiftBRX + shiftTRX, beginPathY);
            lineCustom(beginPathX,beginPathY, beginPathX+shiftBRX, beginPathY+shiftBRY);
            lineCustom(beginPathX+shiftBRX, beginPathY+shiftBRY, beginPathX + shiftBRX + shiftTRX, +beginPathY);
    
            coordonateX[i] = beginPathX+shiftBRX;
            coordonateY[i] = beginPathY+shiftBRY;
            coordonateX[i+1] = beginPathX + shiftBRX + shiftTRX;
            coordonateY[i+1] = beginPathY;
    
            beginPathX =  beginPathX + shiftBRX + shiftTRX;
        }

        coordonateX.forEach((x, i) => {

            
            lineCustom( x, coordonateY[i], x-shiftBRX, coordonateY[i]+shiftBLY);
            coordonateX[i] = x-shiftBRX;
            coordonateY[i] = coordonateY[i]+shiftBLY;
            
            
        });
    
        for(let i = 0;  i < coordonateX.length; i++ ){
            
            lineCustom( coordonateX[i],  coordonateY[i], coordonateX[i+1], coordonateY[i+1]);
        }

        let lastX = coordonateX[coordonateX.length-1];
        let lastY = coordonateY[coordonateY.length-1];
        // let vectorLast = shifterPro(lastX, lastY);
        lineCustom(lastX, lastY,lastX +shiftBRX, lastY + shiftBRY );

        beginPathX = coordonateX[0];
        beginPathY = coordonateY[0];


    }  

    

}

function lineCustom(x1, y1, x2, y2){
    let vector = shifterPro(x1, y1);
    let vector2 = shifterPro(x2, y2);

    line(vector.x + x1, vector.y + y1, vector2.x + x2, vector2.y + y2);
}

//calcul du décalage en fonction de la disposition dans la forme
function shifterPro(coordX, coordY){
    let distanceX = (shiftBRXover + shiftTRXover)*params.NBLONGUEUR;
    let middleX = distanceX/4; 
    let distanceY = (shiftBRXover + shiftBLYover)*params.NBHAUTEUR;
    let middleY = distanceY/2; 

    let centerDistX = abs(middleX - coordX)/middleX;
    let centerDistY = abs(middleY - coordY)/middleY;
    print(centerDistX +"   "+ middleX);
    
    //plus cest proche du centre, plus la chance de se faire move est grande.
    let vector = p5.Vector.fromAngle(((sin(coordX * 12.9898 + coordY * 78.233) * 43758.5453) % 1) * TWO_PI);
    let vectorX = vector.mult((1-centerDistY)*(1-centerDistX)*params.multTransfo);

    return vectorX;

    

    // let randomX = floor(random(0,100));

    // switch(randomX){
    //     case 0 > randomX && randomX < 5 : 

    //     break;
    // }



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