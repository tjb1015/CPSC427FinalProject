//svg namespace
var svgNS = "http://www.w3.org/2000/svg";
function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}//used example from the internet http://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag


//svg namespace
var svgNS = "http://www.w3.org/2000/svg"; 

//makes grid but has it hidden, so it is always on the bottom
function gridOne(){
var myDiv = document.getElementById('mySVG');
hgt=myDiv.clientHeight
finhgt=hgt/10
Content=["","100","200","300","400","500","600","700","800","900","1000","1100","1200","1300","1400","1500","1600"]

    //running into crossbroswer issue, in regards to a grid, and sizing issues.
    var G=document.createElementNS(svgNS, "g")
    G.setAttribute("id", "griddy")
    document.getElementById("mySVG").appendChild(G)
    griddy.style.visibility="hidden"
    for (var i=0;i<finhgt;i++){
	
	
                var myGrid = document.createElementNS(svgNS,'line')
		myGrid.setAttribute("id","linearY")
                myGrid.setAttribute("stroke-width","1")
                myGrid.setAttribute("stroke","lightgray")
                myGrid.setAttribute("x1",0)
                myGrid.setAttribute("x2","100%")
                myGrid.setAttribute("y1",45+i*100)
		myGrid.setAttribute("y2",45+i*100)
                G.appendChild(myGrid)
				
		var mygrid = document.createElementNS(svgNS,'line')
		mygrid.setAttribute("id","linearX")
                mygrid.setAttribute("stroke-width","1")
                mygrid.setAttribute("stroke","lightgray")
                mygrid.setAttribute("x1",i*100)
                mygrid.setAttribute("x2",i*100)
                mygrid.setAttribute("y1",45)
		mygrid.setAttribute("y2","100%")
                G.appendChild(mygrid)
				
		var yT=document.createElementNS(svgNS,"text")
		yT.setAttribute("font-size",15)
		yT.setAttribute("font-weight","bold")
		yT.setAttribute("fill","black")
		yT.setAttribute("x",0)
		yT.setAttribute("y",60+i*100)
		yT.textContent = i * 100;
		G.appendChild(yT)
				
		var xT=document.createElementNS(svgNS,"text")
		xT.setAttribute("font-size",15)
		xT.setAttribute("font-weight","bold")
		xT.setAttribute("fill","black")
		xT.setAttribute("x",2.5+i*100)
		xT.setAttribute("y",60)
		xT.textContent = i * 100;
		G.appendChild(xT)
				
	}
	

 //some browser inconsistancy issues		
 f=navigator.userAgent.search("Firefox");
 O=navigator.userAgent.search("Opera")
 
  if (f>-1){
    //brwsr = "Firefox";
    }
  else if(O>-1){
    //brwsr = "Opera";
    }
	
    //alert(brwsr);
 }

//Grid is the first thing called so it is the bottom element, this function simply hides and unhides it.
function clearGrid(grid){
   if (grid=='yes'){
       dd = document.getElementById("griddy");
       dd.style.visibility = "visible";
	}
	if (grid=='no'){
	    pewpew = document.getElementById("griddy");
	    pewpew.style.visibility = "hidden";
	}
}

function init() {
    clearColor(false);
    gridOne();
}

//opens up About section in new window
function about(){
    var newWindow = window.open("./about.html", "", "fullscreen=no","bgcolor='white'")
}

//creating shapes
xmlns = "http://www.w3.org/2000/svg"
xlink = "http://www.w3.org/1999/xlink"

chosenShape = "";
chosenShapeObject = "";
copyShape = ""
recCount = 0, triCount = 0, circCount = 0, elliCount = 0, lineCount = 0, ngonCount = 0
pentCount = 0, octCount = 0, arrowCount = 0
cpCount = 0
follow = false
shapeFollow = false
remX = 0, remY = 0
fixY = 65

displacementX = new Array();
directionX = new Array();

displacementY = new Array();
directionY = new Array();

function chooseShape(shape) {
    chosenShape = shape
    clearColor(false);
    document.getElementById("mySVG").setAttribute("onmousedown", null)
    document.getElementById("mySVG").setAttribute("onmousemove", null)
    document.getElementById("mySVG").setAttribute("onmouseup", null)
    clearPoints()

    document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")

    if (chosenShape == "free") {
        drawItem()
    }

}

function startShape(evt) {
    evt = evt || window.event;
    pauseEvent(evt);
    if (evt.target.nodeName == "svg" && follow == false) {
        clearPoints()
        var shape;
        if (chosenShape == "rect") {
            // Let's create a rectangle!
            shape = document.createElementNS(xmlns, "path")
            currentShape = "rect" + recCount
            shape.setAttributeNS(null, "id", currentShape)
            recCount++
            shape.setAttributeNS(null, "class", "rect")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            shape.setAttributeNS(null, "d", "M " + firstCoord)

        }
        else if (chosenShape == "tri") {
            // Time for the Triangle
            shape = document.createElementNS(xmlns, "path")
            currentShape = "tri" + triCount
            shape.setAttributeNS(null, "id", currentShape)
            triCount++
            shape.setAttributeNS(null, "class", "tri")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            remY = evt.clientY - fixY
            shape.setAttributeNS(null, "d", "M " + firstCoord)
            
        }
        else if (chosenShape == "circ") {
            // You spin me round right baby right round
            shape = document.createElementNS(xmlns, "circle")
            currentShape = "circ" + circCount
            shape.setAttributeNS(null, "id", currentShape)
            circCount++
            shape.setAttributeNS(null, "class", "circ")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            shape.setAttributeNS(null, "cx", evt.clientX)
            shape.setAttributeNS(null, "cy", evt.clientY - fixY)
            shape.setAttributeNS(null, "r", "1")

        }
        else if (chosenShape == "elli") {
            // Ellipse: like a circle, but not
            shape = document.createElementNS(xmlns, "ellipse")
            currentShape = "elli" + elliCount
            shape.setAttributeNS(null, "id", currentShape)
            elliCount++
            shape.setAttributeNS(null, "class", "elli")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            shape.setAttributeNS(null, "cx", evt.clientX)
            shape.setAttributeNS(null, "cy", evt.clientY - fixY)
            shape.setAttributeNS(null, "rx", "1")
            shape.setAttributeNS(null, "ry", "1")

        }
        else if (chosenShape == "line") {
            // Let's start a Line!
            shape = document.createElementNS(xmlns, "path")
            currentShape = "line" + lineCount
            shape.setAttributeNS(null, "id", currentShape)
            lineCount++
            shape.setAttributeNS(null, "class", "line")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()

            shape.setAttributeNS(null, "d", "M " + firstCoord)

        }
        else if (chosenShape == "ngon") {
            // Brace for NGon, To Infinity and Beyond!
            shape = document.createElementNS(xmlns, "path")
            currentShape = "ngon" + ngonCount
            shape.setAttributeNS(null, "id", currentShape)
            ngonCount++
            shape.setAttributeNS(null, "class", "ngon")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            shape.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)


        }
        else if (chosenShape == "pent") {
            // The Symbol of the Beast
            shape = document.createElementNS(xmlns, "path")
            currentShape = "pent" + pentCount
            shape.setAttributeNS(null, "id", currentShape)
            pentCount++
            shape.setAttributeNS(null, "class", "pent")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            shape.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)


        }
        else if (chosenShape == "oct") {
            // Stop Sign
            shape = document.createElementNS(xmlns, "path")
            currentShape = "oct" + octCount
            shape.setAttributeNS(null, "id", currentShape)
            octCount++
            shape.setAttributeNS(null, "class", "oct")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            shape.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

        }
        else if (chosenShape == "arrow") {
            // Arrow head
            shape = document.createElementNS(xmlns, "path")
            currentShape = "arrow" + arrowCount
            shape.setAttributeNS(null, "id", currentShape)
            arrowCount++
            shape.setAttributeNS(null, "class", "arrow")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY

            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            shape.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

        } 


        // Fill Color, Black Stroke
        shape.setAttributeNS(null, "fill", randColor())
        shape.setAttributeNS(null, "stroke", "black")
        shape.setAttributeNS(null, "stroke-width", "3")

        // Set Functions
        shape.setAttribute("onmousedown", "startMove(evt, id)")

        // Edit Menu   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        
        shape.onclick = function () { chosenShapeObject = this; editMenu(); }
        document.getElementById("drawArea").appendChild(shape);
        document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)");
    }
}



function drawShape(evt) {
    evt = evt || window.event;
    pauseEvent(evt);
    if (chosenShape == "rect") {
        // Drawing Rectangle in progress
        x = document.getElementById(currentShape).getAttribute("d")
        firstCordX = x.split(" ")[1]
        firstCordY = x.split(" ")[2]

        secondCordX = (evt.clientX).toString()
        secondCordY = (evt.clientY - fixY).toString()

        // New Coordinates
        firstCord = firstCordX + " " + firstCordY
        secondCord = firstCordX + " " + secondCordY
        thirdCord = secondCordX + " " + secondCordY
        fourthCord = secondCordX + " " + firstCordY

        newDimension = "M " + firstCord + " L " + secondCord + " L " + thirdCord + " L " + fourthCord + " L " + firstCord

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "tri") {
        // Drawing Triangle in progress
        x = document.getElementById(currentShape).getAttribute("d")
        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        secondCoordX = evt.clientX
        secondCoordY = evt.clientY - fixY

        if (remY > secondCoordY) {
            // Coordinates Case A 
            firstCoord = firstCoordX + " " + firstCoordY
            secondCoord = secondCoordX + " " + firstCoordY
            thirdCoord = ((secondCoordX + parseInt(firstCoordX)) / 2).toString() + " " + secondCoordY

        }
        else if (remY < secondCoordY) {
            // Coordinates Case B
            firstCoord = firstCoordX + " " + secondCoordY
            secondCoord = secondCoordX + " " + secondCoordY
            thirdCoord = ((secondCoordX + parseInt(firstCoordX)) / 2).toString() + " " + remY
        }

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + firstCoord

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "circ") {
        // Rounding the circle!

        var shape = document.getElementById(currentShape)
        var point1 = new dot(parseInt(shape.getAttributeNS(null, "cx")), parseInt(shape.getAttributeNS(null, "cy")));
        var point2 = new dot(evt.clientX, evt.clientY - fixY)
        var newR = distanceTwoPoints(point1,point2)

        document.getElementById(currentShape).setAttribute("r", newR)

        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "elli") {
        // Extending the Ellipse: Electric Boogaloo 2 

        var shape = document.getElementById(currentShape)

        var point1 = new dot(parseInt(shape.getAttributeNS(null, "cx")), parseInt(shape.getAttributeNS(null, "cy")));
        var point2 = new dot(evt.clientX, evt.clientY - fixY)

        newR = distanceTwoPoints(point1, point2)

        document.getElementById(currentShape).setAttribute("rx", newR *2)
        document.getElementById(currentShape).setAttribute("ry", newR )

        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "line") {
        // Stretching the Line
        x = document.getElementById(currentShape).getAttribute("d")

        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        secondCoordX = (evt.clientX).toString()
        secondCoordY = (evt.clientY - fixY).toString()

        newDimension = "M " + firstCoordX + " " + firstCoordY + " L " + secondCoordX + " " + secondCoordY

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "ngon") {
        // Don't cut the corners!
        x = document.getElementById(currentShape).getAttribute("d")
        xLength = x.split(" ").length
        newDimension = ""

        for (i = 0; i < xLength - 2; i++) {
            newDimension += x.split(" ")[i] + " "
        }

        newDimension += (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
        document.getElementById(currentShape).setAttribute("d", newDimension)
    }
    else if (chosenShape == "pent") {
        // Reticulating pentagon splines
        x = document.getElementById(currentShape).getAttribute("d")
        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        midX = [remX + evt.clientX] / 2
        midY = [remY + evt.clientY - fixY] / 2

        // Coordinates Case A 
        firstCoord = (midX).toString() + " " + (remY).toString()
        secondCoord = (evt.clientX).toString() + " " + (Math.abs((remY + midY) / 2)).toString()
        thirdCoord = (Math.abs((evt.clientX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()
        fourthCoord = (Math.abs((remX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()
        fifthCoord = (remX).toString() + " " + (Math.abs((remY + midY) / 2)).toString()

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + fourthCoord + " L " + fifthCoord + " L " + firstCoord

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "oct") {
        // Ocatgon, stop. Hammer time
        x = document.getElementById(currentShape).getAttribute("d")
        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        midX = (remX + evt.clientX) / 2
        midY = (remY + evt.clientY - fixY) / 2

        // Coordinates Case A 
        firstCoord = (Math.abs((remX + midX) / 2)).toString() + " " + (remY).toString()
        secondCoord = (Math.abs((evt.clientX + midX) / 2)).toString() + " " + (remY).toString()

        thirdCoord = (evt.clientX).toString() + " " + (Math.abs((remY + midY) / 2)).toString()
        fourthCoord = (evt.clientX).toString() + " " + (Math.abs((midY + evt.clientY - fixY) / 2)).toString()

        fifthCoord = (Math.abs((evt.clientX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()
        sixthCoord = (Math.abs((remX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()

        seventhCoord = (remX).toString() + " " + (Math.abs((midY + evt.clientY - fixY) / 2)).toString()
        eigthCoord = (remX).toString() + " " + (Math.abs((remY + midY) / 2)).toString()

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + fourthCoord + " L " + fifthCoord + " L " + sixthCoord + " L " + seventhCoord + " L " + eigthCoord + " L " + firstCoord

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "arrow") {
        // Reticulating pentagon splines
        x = document.getElementById(currentShape).getAttribute("d")
        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        midX = (remX + evt.clientX) / 2
        midY = (remY + evt.clientY - fixY) / 2

        // Coordinates Case A 
        firstCoord = (Math.abs(midX)).toString() + " " + (remY).toString()

        secondCoord = (Math.abs(evt.clientX)).toString() + " " + (midY).toString()
        thirdCoord = ((Math.abs((evt.clientX + midX) / 2))).toString() + " " + (midY).toString()

        fourthCoord = (Math.abs((evt.clientX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()
        fifthCoord = (Math.abs((remX + midX) / 2)).toString() + " " + (evt.clientY - fixY).toString()

        sixthCoord = (Math.abs((remX + midX) / 2)).toString() + " " + (midY).toString()
        seventhCoord = (remX).toString() + " " + (midY).toString()

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + fourthCoord + " L " + fifthCoord + " L " + sixthCoord + " L " + seventhCoord + " L " + firstCoord

        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
}

function finishShape() {
    document.getElementById("mySVG").setAttribute("onmousemove", null)
    document.getElementById("mySVG").setAttribute("onmouseup", null)
}

function addNgonCorner(evt) {
    evt = evt || window.event;
    pauseEvent(evt);
    x = document.getElementById(currentShape).getAttribute("d")
    firstCoordX = x.split(" ")[1]
    firstCoordY = x.split(" ")[2]

    if (evt.clientX > parseInt(firstCoordX) - 10 && evt.clientX < parseInt(firstCoordX) + 10 && evt.clientY - fixY > parseInt(firstCoordY) - 10 && evt.clientY - fixY < parseInt(firstCoordY) + 10) {
        newDimension = x + " L " + firstCoordX + " " + firstCoordY
        document.getElementById(currentShape).setAttribute("d", newDimension)
        document.getElementById(currentShape).setAttribute("onmousedown", "startMove(evt, id)")
        document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
        finishShape()
    }
    else {
        x += " L " + (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
        document.getElementById(currentShape).setAttribute("d", x)
    }
}

function startMove(evt, shapeID) {
   
    evt = evt || window.event;
    pauseEvent(evt);
    clearPoints()
    shapeFollow = true
    displacementX.length = 0
    displacementY.length = 0
    directionX.length = 0
    directionY.length = 0
    whichClass = document.getElementById(shapeID).getAttribute("class")

    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
        x = document.getElementById(shapeID).getAttribute("d")
        loopLength = x.split("L").length

        for (i = 0; i < loopLength; i++) {
            val1 = x.split("L")[i]
            val2 = x.split("L")[i]

            val1 = parseInt(val1.split(" ")[1])
            val2 = parseInt(val2.split(" ")[2])

            displacementX[i] = Math.abs(evt.clientX - val1)
            displacementY[i] = Math.abs(evt.clientY - fixY - val2)

            if (evt.clientX < val1) {
                directionX[i] = "+"
            }
            else if (evt.clientX > val1) {
                directionX[i] = "-"
            }

            if (evt.clientY - fixY < val2) {
                directionY[i] = "+"
            }
            else if (evt.clientY - fixY > val2) {
                directionY[i] = "-"
            }
        }
    }

    //document.getElementById(shapeID).setAttribute("onmousemove", "shapeMove(evt, id)")
   // document.getElementById(shapeID).setAttribute("onmouseup", "shapeStop(id)")
    document.getElementById("mySVG").setAttribute("onmousemove", "shapeMove(evt," + shapeID + ")")
    document.getElementById("mySVG").setAttribute("onmouseup", "shapeStop(" + shapeID + ")")
}

function shapeMove(evt, shapeID) {

    evt = evt || window.event;
    pauseEvent(evt);
    whichClass = shapeID.getAttribute("class")
    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow" && shapeFollow == true) {
        // Move Shapes
        loopLength = displacementX.length
        newDimension = ""

        for (i = 0; i < loopLength; i++) {
            if (i == 0) {
                newDimension = "M "
            }
            else {
                newDimension += "L "
            }

            if (directionX[i] == "+") {
                newX = (evt.clientX + displacementX[i]).toString() + " "
            }
            else if (directionX[i] == "-") {
                newX = (evt.clientX - displacementX[i]).toString() + " "
            }

            if (directionY[i] == "+") {
                newY = (evt.clientY - fixY + displacementY[i]).toString() + " "
            }
            else if (directionY[i] == "-") {
                newY = (evt.clientY - fixY - displacementY[i]).toString() + " "
            }
            newDimension += newX + newY
        }

        shapeID.setAttribute("d", newDimension)
    }
    else if (whichClass == "circ" || whichClass == "elli" && shapeFollow == true) {
        // Spin that record
        shapeID.setAttribute("cx", evt.clientX)
        shapeID.setAttribute("cy", evt.clientY - fixY)
    }
}

function shapeStop(shapeID) {
    shapeFollow = false
    whichClass = shapeID.getAttribute("class")
    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
        addPoints(shapeID)
    }
    document.getElementById("mySVG").setAttribute("onmousemove", "")
    document.getElementById("mySVG").setAttribute("onmouseup", "")
}

function clearPoints() {
    if (cpCount > 0) {
        for (i = 0; i < cpCount; i++) {
            document.getElementById("mySVG").removeChild(document.getElementById("CP" + i))
        }
    }
    cpCount = 0
}

function pointFollow() {
    follow = true
}

function pointMove(evt, CP, shapeID) {
    evt = evt || window.event;
    pauseEvent(evt);
    if (follow) {
        whichClass = shapeID.getAttribute("class")
        if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
            num = CP.id.charAt(1)

            // Lets move the points
            document.getElementById("B" + num).setAttribute("fill", "white")
            document.getElementById("B" + num).setAttribute("cx", evt.clientX)
            document.getElementById("B" + num).setAttribute("cy", evt.clientY - fixY)
            document.getElementById("F" + num).setAttribute("cx", evt.clientX)
            document.getElementById("F" + num).setAttribute("cy", evt.clientY - fixY)

            // Now the shape
            x = shapeID.getAttribute("d")
            loopLength = x.split("L").length
            lp = loopLength

            if (whichClass != "line") {
                lp -= 1
            }

            newDimension = "M "

            for (i = 0; i < loopLength; i++) {
                val1 = x.split("L")[i]
                val2 = x.split("L")[i]

                val1 = parseInt(val1.split(" ")[1])
                val2 = parseInt(val2.split(" ")[2])
                point = i + 1

                if (num == point || num == "1" && i == lp) {
                    val1 = evt.clientX
                    val2 = evt.clientY - fixY
                }

                if (i > 0) {
                    newDimension += " L "
                }
                newDimension += val1 + " " + val2
            }

            shapeID.setAttribute("d", newDimension)
        }
    }
}

function pointStop(shapeID) {
    follow = false
    x = shapeID.getAttribute("d")
    whichClass = shapeID.getAttribute("class")
    loopLength = x.split("L").length

    if (whichClass != "line") {
        loopLength -= 1
    }

    for (i = 0; i < loopLength; i++) {
        num = i + 1
        document.getElementById("B" + num).setAttribute("fill", "none")
    }
}

function addPoints(shapeID) {
    whichClass = shapeID.getAttribute("class")
    clearPoints()

    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
        // Gathering coordinates from the shape
        y = shapeID

        x = shapeID.getAttribute("d")
        loopLength = x.split("L").length
        if (whichClass != "line") {
            loopLength -= 1
        }

        var G = document.createElementNS(xmlns, "g")
        G.setAttribute("id", "CP" + cpCount)
        cpCount++
        document.getElementById("mySVG").appendChild(G)

        for (i = 0; i < loopLength; i++) {
            val1 = x.split("L")[i]
            val2 = x.split("L")[i]

            val1 = parseInt(val1.split(" ")[1])
            val2 = parseInt(val2.split(" ")[2])
            num = i + 1

            var C1 = document.createElementNS(xmlns, "g")
            C1.setAttributeNS(null, "id", "C" + num)
            C1.setAttribute("onmousedown", "pointFollow()")
            C1.setAttribute("onmousemove", "pointMove(evt, this, y )")
            C1.setAttribute("onmouseup", "pointStop(y)")

            var B1 = document.createElementNS(xmlns, "circle")
            B1.setAttributeNS(null, "id", "B" + num)
            B1.setAttributeNS(null, "cx", val1)
            B1.setAttributeNS(null, "cy", val2)
            B1.setAttributeNS(null, "r", "150")
            B1.setAttributeNS(null, "fill", "none")
            B1.setAttributeNS(null, "fill-opacity", "0")
            C1.appendChild(B1)

            var F1 = document.createElementNS(xmlns, "circle")
            F1.setAttributeNS(null, "id", "F" + num)
            F1.setAttributeNS(null, "cx", val1)
            F1.setAttributeNS(null, "cy", val2)
            F1.setAttributeNS(null, "r", "5")
            F1.setAttributeNS(null, "stroke", "black")
            F1.setAttributeNS(null, "fill", "red")
            C1.appendChild(F1)
            G.appendChild(C1)
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


function drawItem() {

    var svg = document.getElementById("mySVG");


    var path = document.createElementNS(xmlns, "path");
    path.dotAry = [];
    path.setAttributeNS(null, "stroke", "black");
    path.setAttributeNS(null, "stroke-width", "5");
    path.setAttributeNS(null, "fill", "none");
    path.data = "M";

    path.setColor = function (color) {

    }
    path.drawIt = function (evt) {
        evt = evt || window.event;
        pauseEvent(evt);
        path.dotAry.push(new dot(evt.clientX, evt.clientY - fixY));
        path.display()
    };
    path.display = function () {
        path.data = "M "
        for (var i = 0; i < this.dotAry.length; i++) {
            this.data += this.dotAry[i].x + " " + this.dotAry[i].y + " "
        }
        path.setAttributeNS(null, "d", path.data);
    }
    path.onclick = function () {
        svg.setAttribute("onmousedown", function (evt) {
            evt = evt || window.event;
            pauseEvent(evt);
            

        });
    }

    svg.onmousedown = function (evt) {
        svg.appendChild(path)
        path.drawIt
        svg.onmousemove = path.drawIt;
        svg.onmouseup = function (evt) {
            var svg = document.getElementById("mySVG");
            svg.setAttribute("onmousemove", null);
            svg.setAttribute("onmouseup", null);
            svg.setAttribute("onmousedown", null);
            drawItem()
        };
    };
}

function drawStar() {
    //adobted from Dr.D's code.
    var svg = document.getElementById("mySVG");
    svg.setAttribute("onmousedown", null);


    var path = document.createElementNS(xmlns, "path");
    var permute = randInt(30, 5)
    path.dotAry = [];
    path.setAttributeNS(null, "stroke", "black");
    path.setAttributeNS(null, "stroke-width", "5");
    path.setAttributeNS(null, "fill", "none");
    path.data = "M";
    path.setAttributeNS(null, "fill", randColor());
    path.setAttributeNS(null, "stroke-width", "5");

    var starstring = "M "
    n = Math.floor(Math.random() * 8) + 3
    radius = 100
    Ang = 2 * Math.PI / n
    Ax = new Array(n)
    Ay = new Array(n)
    for (i = 0; i < n; i++) {

        Ax[i] = X + Math.ceil(radius * Math.cos(i * Ang))
        Ay[i] = Y + Math.ceil(radius * Math.sin(i * Ang))
    }
    for (i = 0; i < n; i++) {
        starstring += Ax[(i * permute) % n] + " " + Ay[(i * permute) % n] + " "
    }
    starstring += "z"

    path.setAttributeNS(null, "d", starstring);



    path.onclick = function () {

    }

    svg.onmousedown = function (evt) {
        svg.appendChild(path)
        path.drawIt
        svg.onmousemove = path.drawIt;
        svg.onmouseup = function (evt) {
            var svg = document.getElementById("mySVG");
            svg.setAttribute("onmousemove", null);
            svg.setAttribute("onmouseup", null);
            svg.setAttribute("onmousedown", null);
            drawStar()
        };
    };
}

function randInt(high, low) { return Math.floor(Math.random() * (high - low + 1)) + low; }

function randColor() { return ("RGB(" + randInt(255, 0) + "," + randInt(255, 0) + "," + randInt(255, 0) + ")"); }

function dot(x, y) {
    this.x = x;
    this.y = y;
}

function distanceTwoPoints(point1, point2) // distence between two points  <-------->
{
    var a = Math.abs(Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)));
    //alert (a)
    return a;
}

function iPoint(p1, p2, p3, p4)//finds the intersection point given four point on two different lines <----->
    // p1 and p2 on line one, p3 and p4 on line two. Returns 0,0 if parallel
{
    //alert("in funk")
    var iP = new point(0, 0);
    //alert("var iP")
    var denom = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));

    //alert("denom: " + denom)
    if (denom != 0) {
        iP.x = (((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x)) - ((p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x))) / denom;
        iP.y = (((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x))) / denom;
        return iP;
    } else
        return iP

}
//editing functions


//colorPicker
picked=""
hv=document.getElementById("HV")


  function selecthue() {
     document.getElementById("mySVG").setAttribute("onmousemove","movehue(evt)")
     document.getElementById("mySVG").setAttribute("onmouseup","stop()") 
    }
    
  function selectsat() {
     document.getElementById("mySVG").setAttribute("onmousemove","movesat(evt)")
     document.getElementById("mySVG").setAttribute("onmouseup","stop()") 
    }
    
   function selectlit() {
      document.getElementById("mySVG").setAttribute("onmousemove","movelit(evt)")
      document.getElementById("mySVG").setAttribute("onmouseup","stop()") 
    }
        

   function movehue(evt) {
       evt = evt || window.event;
       pauseEvent(evt);

       var hv = document.getElementById("HV");
       var hue = document.getElementById("hue");
       var hh = Math.ceil((evt.clientX - 90));
	
	  if ((evt.clientX>90)&&(evt.clientX<450)){
	      hue.setAttribute("x1", evt.clientX);
	      hue.setAttribute("x2", evt.clientX);
	      hv.textContent = hh;
	      finalC();
       }
   }
	  
   function movesat(evt) {
       evt = evt || window.event;
       pauseEvent(evt);

       var sv = document.getElementById("SV");
       var sat = document.getElementById("sat");
       var ss = Math.ceil((evt.clientX - 545) / 2);
	   
	   if ((evt.clientX>545)&&(evt.clientX<745)){
	       sat.setAttribute("x1", evt.clientX);
	       sat.setAttribute("x2", evt.clientX);
	       sv.textContent = ss;
	       finalC();
       }
   }
	  
   function movelit(evt) {
       evt = evt || window.event;
       pauseEvent(evt);

       var lv = document.getElementById("LV");
       var lit = document.getElementById("lit");
       var ll = Math.ceil((evt.clientX - 862) / 2);
	   
	   if ((evt.clientX>862)&&(evt.clientX<1062)){
	       lit.setAttribute("x1", evt.clientX);
	       lit.setAttribute("x2", evt.clientX);
	       lv.textContent = ll;
	       finalC();
       }
   }
  
  function finalC(){

   cc=document.getElementById("sc")
   cd=document.getElementById("ss")
   Hh=document.getElementById("HV").textContent
   Ss=document.getElementById("SV").textContent
   Ll=document.getElementById("LV").textContent
   
   cc.setAttribute("stop-color", "hsl(" + Hh + ", 100%, 50%)")
   cd.setAttribute("stop-color", "hsl(" + Hh + ", 15%, 50%)")
   
   chosenShapeObject.setAttributeNS(null, "fill", "hsl(" + Hh + "," + Ss + "%," + Ll + "%)")
   
  }
  
  function stop(){
    document.getElementById("mySVG").setAttribute("onmousemove",null)
    document.getElementById("mySVG").setAttribute("onmouseup",null)
    }

  function clearColor(color) {
      var CP = document.getElementById("colorPick");
      if (color) {
          CP.style.visibility = "visible";
      }else{
          CP.style.visibility = "hidden";
      }
  }
//average
function average(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('averageRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('averageTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('averageCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('averageElli')
    }
    else if (chosenShape == "line") {
        console.log('averageLine')
    }
    else if (chosenShape == "ngon") {
        console.log('averageNgon')
    }
    else if (chosenShape == "pent") {
        console.log('averagePent')
    }
    else if (chosenShape == "oct") {
        console.log('averageOct')
    }
    else if (chosenShape == "arrow") {
        console.log('averageArrow')
    }

}

//copy
function copy(chosenShape) {
    copyShape = chosenShapeObject;
}

//Delete
function del(chosenShape) {

    document.getElementById("drawArea").removeChild(chosenShapeObject);
}

//flip
function flip(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('flipRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('flipTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('flipCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('flipElli')
    }
    else if (chosenShape == "line") {
        console.log('flipLine')
    }
    else if (chosenShape == "ngon") {
        console.log('flipNgon')
    }
    else if (chosenShape == "pent") {
        console.log('flipPent')
    }
    else if (chosenShape == "oct") {
        console.log('flipOct')
    }
    else if (chosenShape == "arrow") {
        console.log('flipArrow')
    }
}

//pick color
function pColor() {    
    clearColor(true);
}

//Re Color
function rColor() {
    //grabs current shape
    chosenShapeObject.setAttributeNS(null, "fill", randColor())
}

//Smooth
function smooth(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('smoothRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('smoothTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('smoothCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('smoothElli')
    }
    else if (chosenShape == "line") {
        console.log('smoothLine')
    }
    else if (chosenShape == "ngon") {
        console.log('smoothNgon')
    }
    else if (chosenShape == "pent") {
        console.log('smoothPent')
    }
    else if (chosenShape == "oct") {
        console.log('smoothOct')
    }
    else if (chosenShape == "arrow") {
        console.log('smoothArrow')
    }
}

//Unselect
function unselect(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('unRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('unTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('unCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('unElli')
    }
    else if (chosenShape == "line") {
        console.log('unLine')
    }
    else if (chosenShape == "ngon") {
        console.log('unNgon')
    }
    else if (chosenShape == "pent") {
        console.log('unPent')
    }
    else if (chosenShape == "oct") {
        console.log('unOct')
    }
    else if (chosenShape == "arrow") {
        console.log('unArrow')
    }
}

//view src
function viewsrc(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('vsRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('vsTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('vsCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('vsElli')
    }
    else if (chosenShape == "line") {
        console.log('vsLine')
    }
    else if (chosenShape == "ngon") {
        console.log('vsNgon')
    }
    else if (chosenShape == "pent") {
        console.log('vsPent')
    }
    else if (chosenShape == "oct") {
        console.log('vsOct')
    }
    else if (chosenShape == "arrow") {
        console.log('vsArrow')
    }
}
