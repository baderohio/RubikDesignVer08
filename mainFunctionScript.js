/*
* Programmer : Dr.-Ing. Bader Juma
* Date       : June 21, 2019
* File       : mainFunctionScript.js
* Purpose    : Create GUI and rotation function
*/

 // declare global variables and arrays
 var matrixDimension, chooseMatrix;
 var cL = ["ba", "ri","fr","le","to","bo"]; // cell id
 var fL = ["back", "rightside","front","leftside", "top", "bottom"]; // table id
 var colorFace = ["Green", "Tan", "RoyalBlue", "DarkRed", "Yellow", "White"]; // faces color
 //var colorFace = ["#08960A", "#CD9834", "#3364FB", "#BC0B00", "#FFFB03", "#FFFDFF"];
 var colorCode=["0", "1", "2", "3", "4", "5"]; // code number for color faces
 var backArr =[], rightsideArr =[], frontArr =[], leftsideArr =[], topArr =[], bottomArr =[], tempArr =[]; 
 
//initialization disable Display button   
$("#btnRun").attr("disabled", true);
// validate input data
function dataVaidateFunction(){
     // Get the value of the input field with id="numb"
      matrixDimension = parseInt(document.getElementById("numb").value); 
      document.getElementById("demo").innerHTML = checkInputFunction(matrixDimension);	  
	  if(checkInputFunction(matrixDimension)=="Input OK")
	       $("#btnRun").attr("disabled", false);
       else {
		   $("#btnRun").attr("disabled", true);
	   window.alert(checkInputFunction(matrixDimension));}
}
// Create GUI for face
function guiFunction() { 
  // put row and columns to table choose by id save in fL(face label)
  createFaceFunction(matrixDimension, cL, fL);
  // color the cells
  colorCellsFunction(matrixDimension, cL, colorFace);
} 
//initialize matrix code color function for faces
function initializeFunction() {
		// declare variable
	var i;
	// initialize matrix face with color code
    for (i = 0; i < matrixDimension*matrixDimension; i++) {
         backArr[i]= colorCode[0];
         rightsideArr[i] = colorCode[1];
         frontArr[i] = colorCode[2];
         leftsideArr[i] = colorCode[3];
         topArr[i] = colorCode[4];
         bottomArr[i] = colorCode[5];
                                                          }
	 document.getElementById("demo1").innerHTML = "Successful matrix initilization";
                               }

  // rotation around Axis X, Y, Z
function rotationFunction() { 
 //Read data
 var axisVar = $( "#axisRotation" ).val();       //choose axis
 var directionRot = $( "#typeRotation" ).val(); // direction of rotation ClockWise always in this code
 var numStepRot = parseInt($( "#stepRotation" ).val());    // number step of rotation
 var cellLocation = parseInt($( "#cellRotation" ).val());  // cell location on faces to rotate

    //rotation around X-axis
  if ( axisVar == "x" ) {
	// rotate matrix around X axis for selected cell in the middle not edge
	matrixXaxisRotationFunction(cellLocation, numStepRot, matrixDimension,  rightsideArr, bottomArr, leftsideArr, topArr);
   // rotate front matrix edges 
   if (cellLocation == 1) {
    clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, frontArr, 2);	
	}	
   if (cellLocation == matrixDimension) {
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, backArr, 0);
	} 
	}
	
    // rotation around Y-axis
 if ( axisVar == "y" ) { 
    //rotate matrix around Y axis for selected cell in the middle not edge
    matrixYaxisRotationFunction(cellLocation, numStepRot, matrixDimension, topArr, frontArr, bottomArr, backArr);	
	// rotate rightside matrix edges 
   if (cellLocation == 1) {	
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, rightsideArr, 1);
	}
   // rotate leftside matrix edges 
   if (cellLocation == matrixDimension) {
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, leftsideArr, 3);
	} 
	}
	
   //rotation around Z-axis
 if ( axisVar == "z" ) {
   //rotate matrix around Z axis for selected cell in the middle not edge
   matrixZaxisRotationFunction(cellLocation, numStepRot, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr);
   //rotate top matrix edges 
   if (cellLocation == 1) {
	clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, topArr, 4);
	} 
   if (cellLocation == matrixDimension) {	
	antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, bottomArr, 5);
	}
    }
	// give cells faces color
	cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace);	
                             }

                                  

