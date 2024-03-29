/*
* Programmer : Dr.-Ing. Bader Juma
* Date       : June 21, 2019
* File       : branchFunctionScript.js
* Purpose    : contain all functions that used by main function
*/

//Validate input data
function checkInputFunction(matrixDimension){
	//declare variables
	var text;
	  // If matrixDimension is Not a Number or less than one or greater than 10
  if (isNaN(matrixDimension) || matrixDimension < 1 || matrixDimension > 10) 
      {
    text = "Input not valid";
       } else {
    text = "Input OK";
               }
			   return text;		   
}

// create the table cells
function createFaceFunction(matrixDimension, cL, fL) {	  
 //Define variables and array
  var i, j, k, text;
  var arr =[];
  
  for (k=0; k< 6; k++) {
  // put class and id arribute for each faces cell
  for (j = 0; j < matrixDimension; j++) {
   text = "<tr>";
   for (i = 0; i < matrixDimension; i++) {
	 text += "<td class="+"back"+" id="+cL[k]+((j+1)*10+(i+1))+">"+" "+"</td>";
	 }
     text  += "</tr>";
     arr[j] = text;}
    
	// create cells in face (table) choose by id attributes
	document.getElementById(fL[k]).innerHTML = arr[0];
    for (j = 1; j < matrixDimension; j++){
     $("#"+fL[k]).append(arr[j]);        }
                        }	
}


// create selector for cell location for rotation
function chooseCellLocationFunction(matrixDimension) {	  
 //Define variables and array
  var i, j, k, text;
  var arr =[];
  //removes the child elements of the selected element(s).
   $("#cellRotation").empty(); 
   for (i = 1; i < matrixDimension+1; i++) {
	 text += "<option value="+i+">"+i+"</option>" ;
	 }        
    $("#cellRotation").append(text); 
}



//color each cells separatelly
function colorCellsFunction(matrixDimension, cL, colorFace) {	
 //Define variables and array
  var i, j, k, temp;
  
for (k=0; k< 6; k++) {	
    // put color for each cell j is row and i is cols of matrix first cell is 0,0
   for (j = 0; j < matrixDimension; j++) {
      for (i = 0; i < matrixDimension; i++) {
        temp = (j+1)*10+(i+1);
					 $("#"+cL[k]+temp).css("background-color", colorFace[k]); 
                                            } 
                                        }									
                         }	
}

// give code for each color create virtual matrix that keep track to 
// the color on each cells because the color cells are not readable
function initializeMatrixFunction(backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, matrixDimension, colorCode){
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
                                                            }
 
 //rotate matrix around X-axis for cell in middle not edge give color
 // k repsent step rotation in middle in clock wise dircetion
 // axisVar = X, numStepRot = 1, 2, 3, cellLocation = middle;
function matrixXaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, rightsideArr, bottomArr, leftsideArr, topArr) {
 // define variables
   var j, i, k, ii, jj, temp;
   var squDimension = matrixDimension*matrixDimension-1;
  for(k=0; k < numStepRot; k++){
	j = 0;  	  
   for (i=matrixDimension-cellLocation; i < matrixDimension*matrixDimension; i=i+matrixDimension) {	
   
    ii = j+matrixDimension*(cellLocation-1);	
	 if (directionRot == "cw") {
	temp = rightsideArr[i];
	rightsideArr[i] = bottomArr[ii];
	bottomArr[ii] = leftsideArr[matrixDimension*(matrixDimension-1)-j*matrixDimension+(cellLocation-1)];
	leftsideArr[matrixDimension*(matrixDimension-1)-j*matrixDimension+(cellLocation-1)] = topArr[squDimension-ii];
	topArr[squDimension-ii] = temp;
	
	} else {
		
	temp = leftsideArr[(cellLocation-1)+j*matrixDimension];
	leftsideArr[(cellLocation-1)+j*matrixDimension] = bottomArr[cellLocation*matrixDimension-1-j];
	bottomArr[cellLocation*matrixDimension-1-j] = rightsideArr[matrixDimension*matrixDimension-cellLocation-j*matrixDimension];
	rightsideArr[matrixDimension*matrixDimension-cellLocation-j*matrixDimension] = topArr[matrixDimension*(matrixDimension-cellLocation)+j];
	topArr[matrixDimension*(matrixDimension-cellLocation)+j] = temp;
	
	}
	j++;
	 
                                                                     }
                             }						             
			   }

  //rotate matrix around Y-axis for cell in middle not edge give color
  // k repsent step rotation in middle in clock wise dircetion
  // axisVar = Y, numStepRot = 1,2,3, cellLocation = middle; 
 function matrixYaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, topArr, frontArr, bottomArr, backArr) {
   // define variables
   var i, k, temp;
   //console.log(topArr);
  for(k=0; k < numStepRot; k++){
	  	  
   for (i =(cellLocation-1); i< (matrixDimension*matrixDimension); i=i+matrixDimension) {	 
	 if (directionRot == "cw") {	
	 temp=topArr[i];
	 topArr[i] = frontArr[i];
	 frontArr[i] = bottomArr[i];
	 bottomArr[i] = backArr[matrixDimension*matrixDimension-1-i];
	 backArr[matrixDimension*matrixDimension-1-i] = temp; } else {
	 ///////////////////////
	 temp = bottomArr[i];
	 bottomArr[i] = frontArr[i];
	 frontArr[i] = topArr[i];
	 topArr[i] = backArr[matrixDimension*matrixDimension-1-i];
	 backArr[matrixDimension*matrixDimension-1-i] = temp; 
	 ///////////////////////
	 }	 
                                                                     }
                             }						 
}

 //rotate matrix around Z-axis for cell in middle not edge give color
 // k repsent step rotation in middle in clock wise dircetion
 // axisVar = Z, numStepRot = 1,2,3, cellLocation = middle;
function matrixZaxisRotationFunction(directionRot, cellLocation, numStepRot, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr) {
 // define variables
 var i, k, temp; 
 for(k=0; k < numStepRot; k++){	 
   for (i = (cellLocation-1)*matrixDimension; i<(matrixDimension+matrixDimension*(cellLocation-1)); i++) {
    if (directionRot == "cw") {		
	 temp=backArr[i];
	 backArr[i] = rightsideArr[i];
	 rightsideArr[i] = frontArr[i];
	 frontArr[i] = leftsideArr[i];
	 leftsideArr[i] = temp;	 } else {
	 /////////////////
	 temp = leftsideArr[i];
	 leftsideArr[i]= frontArr[i];
	 frontArr[i] = rightsideArr[i];
	 rightsideArr[i] = backArr[i];
	 backArr[i] = temp; }
	 /////////////////
                                                                                                          }
                             }
			   }

// ClockWise 
// rotation of front matrix when cell location = 1, leftside matrix when cell location = matrix dimension
// top martix when cell location = 1
function clockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, tempArr, chooseMatrix) { 
   
	// define variables
    var i, j, jj, jj1, jj2, jj3, ii, ij, k;	
	var arr = [];
	for(k=0; k < numStepRot; k++){	
	// create temperory matrix to save data for swaping edges
	for (i = 0; i < matrixDimension*matrixDimension; i++) 
	    arr[i] = tempArr[i];
		
	jj  = 0;
	jj1 = 0;
	jj2 = 0;
	jj3 = 0;
	
	for (i = 0; i < matrixDimension; i++) {
		for ( j = 0; j < matrixDimension ; j++ ) {	
		
			if (i == 0) {
               ij = matrixDimension*(matrixDimension-1)+j;	
			   tempArr[jj] = arr[ij];
			   jj = jj + matrixDimension;}
			
			
			if (j == (matrixDimension-1)){
			   ii = matrixDimension*(matrixDimension-1)+i;	
			   ii1 = matrixDimension*matrixDimension-1-jj1;
			   tempArr[ii] = arr[ii1];
               jj1 = jj1 + matrixDimension;}
			   
			if (i == (matrixDimension-1)){
			   tempArr[matrixDimension*matrixDimension-1-jj2] = arr[matrixDimension-1-j];
			   jj2 = jj2 + matrixDimension;}
			
			if(j == 0) {
			   tempArr[(matrixDimension-1)-i] = arr[jj3];
			   jj3 = jj3 + matrixDimension;}
			
		}
	}
			
	}
	
	if (chooseMatrix == 2)
		for (i = 0; i < matrixDimension*matrixDimension; i++) frontArr[i] = tempArr[i];
	else if (chooseMatrix == 3)
		for (i = 0; i < matrixDimension*matrixDimension; i++) leftsideArr[i] = tempArr[i];
	else if (chooseMatrix == 4)
		for (i = 0; i < matrixDimension*matrixDimension; i++) topArr[i] = tempArr[i];
	else if (chooseMatrix == 5)
		for (i = 0; i < matrixDimension*matrixDimension; i++) bottomArr[i] = tempArr[i];
	else if (chooseMatrix == 1)
		for (i = 0; i < matrixDimension*matrixDimension; i++) rightsideArr[i] = tempArr[i];
	else if (chooseMatrix == 0)
		for (i = 0; i < matrixDimension*matrixDimension; i++) backArr[i] = tempArr[i];	
	else
		window.alert("No or wrong number have been choosen for chooseMatrix");
}

// Anti ClockWise 
// rotation of back matrix when cell location = matrix dimension, rightside matrix when cell location = 1
// bottom martix when cell location = matrix dimension
function antiClockWiseMatrixaxisRotationFunction(numStepRot, matrixDimension, tempArr, chooseMatrix) { 
	// define variables
      var i, j, k, jj, jj1, jj2, jj3;	
	var arr = [];
	for(k=0; k < numStepRot; k++){	
	// create temperory matrix to save data for swaping edges
	for (i = 0; i < matrixDimension*matrixDimension; i++) { 
	    arr[i] = tempArr[i];}
		
	jj  = 0; 
	jj1 = 0; 
	jj2 = 0; 
	jj3 = 0; 
	
	for (i = 0; i < matrixDimension; i++) {
		for ( j = 0; j < matrixDimension ; j++ ) {	
		
			if (i == 0) {
			   tempArr[matrixDimension*matrixDimension-1-j] = arr[matrixDimension*(matrixDimension-1)-jj];
			   jj = jj + matrixDimension;}
			
			if (j == (matrixDimension-1)){
			   tempArr[matrixDimension-1+jj1] = arr[matrixDimension*matrixDimension-1-i];
               jj1 = jj1 + matrixDimension;}
			   
			if (i == (matrixDimension-1)){
			   tempArr[j] = arr[matrixDimension-1+jj2];
			   jj2 = jj2 + matrixDimension;}
			
			if(j == 0) {
				tempArr[matrixDimension*(matrixDimension-1)-jj3] = arr[i];
				jj3 = jj3 + matrixDimension;}
			
		}
	}
			
	}
	
	if (chooseMatrix == 0)
		for (i = 0; i < matrixDimension*matrixDimension; i++) backArr[i] = tempArr[i];
	else if (chooseMatrix == 1)
		for (i = 0; i < matrixDimension*matrixDimension; i++) rightsideArr[i] = tempArr[i];
	else if (chooseMatrix == 5)
		for (i = 0; i < matrixDimension*matrixDimension; i++) bottomArr[i] = tempArr[i];
	else if (chooseMatrix == 4)
		for (i = 0; i < matrixDimension*matrixDimension; i++) topArr[i] = tempArr[i];
	else if (chooseMatrix == 3)
		for (i = 0; i < matrixDimension*matrixDimension; i++) leftsideArr[i] = tempArr[i];
	else if (chooseMatrix == 2)
		for (i = 0; i < matrixDimension*matrixDimension; i++) frontArr[i] = tempArr[i];
	else
		window.alert("No or wrong number have been choosen for chooseMatrix");
}



function cellColorXYZaxisRotationFunction(cL, cellLocation, matrixDimension, backArr, rightsideArr, frontArr, leftsideArr, topArr, bottomArr, colorFace) {
  //Define variables
  // k represent the face
 var i, j, k, temp, tempVar,tempColor;	
 
 for (k=0; k< 6; k++) {	
    // put color for each cell j is row and i is cols of matrix first cell is 0,0
	tempVar = -1;
   for (j = 0; j < matrixDimension; j++) {
      for (i = 0; i < matrixDimension; i++) {
        temp = (j+1)*10+(i+1);
 
              tempVar++;	
                        if(k==0) tempColor= backArr[tempVar];
						 else if(k==1) tempColor= rightsideArr[tempVar];
						  else if(k==2) tempColor= frontArr[tempVar];
						   else if(k==3) tempColor = leftsideArr[tempVar];
						    else if(k==4) tempColor= topArr[tempVar];
							 else          tempColor =  bottomArr[tempVar];
 
    $("#"+cL[k]+temp).css("background-color", colorFace[tempColor]);				 
                                            }              										
                         }
}
}


								 

								 
								 
						

