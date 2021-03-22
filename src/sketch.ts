// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    
    RANDOM_SEED: 0,
    PERLIN_SEED: 0,
    NBLONGUEUR: 18,
    NBHAUTEUR : 18,
    MULTIPLE :5,
    multTransfo : 5,
    mouseMoving : false,
    Perlin : false,
    DarkMode : false,
    Download_Image: () => save(),
}

gui.add(params, "RANDOM_SEED",0, 1000, 1)
gui.add(params, "PERLIN_SEED",0, 1000, 1)
gui.add(params, "NBLONGUEUR", 0, 100, 1)
gui.add(params, "NBHAUTEUR", 0, 100, 1)
gui.add(params, "MULTIPLE", 1, 20, 1)
gui.add(params, "multTransfo", 0, 1000, 1)
gui.add(params, "mouseMoving")
gui.add(params, "Perlin")
gui.add(params, "DarkMode")
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------


let shiftBRXover;
let shiftTRXover;

let shiftBLYover;
let shiftBRYover;
function draw() {

    randomSeed(params.RANDOM_SEED);
    noiseSeed(params.PERLIN_SEED);
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

    if(params.DarkMode == true){
        background('black')
        stroke('white');
    } else {
        background('#FFFFFF')
        stroke('black');
    }
    

    
    for(let h=0; h < params.NBHAUTEUR; h++ ){
        
        //premiere ligne "zigzag"
        for(let i=0; i< params.NBLONGUEUR; i+=2){
            
            //on dessine les lignes
            lineCustom(beginPathX,beginPathY, beginPathX+shiftBRX, beginPathY+shiftBRY);
            lineCustom(beginPathX+shiftBRX, beginPathY+shiftBRY, beginPathX + shiftBRX + shiftTRX, +beginPathY);
            
            //on affecte les coordonnées a un tableau pour les réutiliser apres. 
            coordonateX[i] = beginPathX+shiftBRX;
            coordonateY[i] = beginPathY+shiftBRY;
            coordonateX[i+1] = beginPathX + shiftBRX + shiftTRX;
            coordonateY[i+1] = beginPathY;
            
            beginPathX =  beginPathX + shiftBRX + shiftTRX;
        }
        
        //ligne qui relie le haut et le bas
        coordonateX.forEach((x, i) => {

            
            lineCustom( x, coordonateY[i], x-shiftBRX, coordonateY[i]+shiftBLY);
            coordonateX[i] = x-shiftBRX;
            coordonateY[i] = coordonateY[i]+shiftBLY;
            
            
        });
    
        //on redessine la ligne qui rejoint les deux. 
        for(let i = 0;  i < coordonateX.length; i++ ){
            
            lineCustom( coordonateX[i],  coordonateY[i], coordonateX[i+1], coordonateY[i+1]);
        }

        let lastX = coordonateX[coordonateX.length-1];
        let lastY = coordonateY[coordonateY.length-1];
        
        lineCustom(lastX, lastY,lastX +shiftBRX, lastY + shiftBRY );

        beginPathX = coordonateX[0];
        beginPathY = coordonateY[0];


    }  

    

}

//Dessin d'une ligne en fonction des coordonnées qui sont données. 
//Utilisation de shifter pro car elle calcule la dispersion des points.
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
    
    
    //plus cest proche du centre, plus la chance de se faire move est grande.
    
    let mult = params.mouseMoving ? mouseX/500 : 1
    //
    if(params.Perlin){
        let vector = p5.Vector.fromAngle(noise(coordX, coordY)*mult);
    } else {
        let vector = p5.Vector.fromAngle(((sin(coordX * 12.9898 + coordY * 78.233) * 43758.5453) % 1) * TWO_PI * mult);
    }
    
    

    
    
    let vectorX = vector.mult((1-centerDistY)*(1-centerDistX)*params.multTransfo);
    
   

    return vectorX;


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