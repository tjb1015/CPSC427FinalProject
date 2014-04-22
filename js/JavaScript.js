//svg namespace
var svgNS = "http://www.w3.org/2000/svg";
function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}//used example from the internet http://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag

//makes grid
function gridOne() {
    var myDiv = document.getElementById('mySVG');
    hgt = myDiv.clientHeight
    finhgt = hgt / 10
    Content = ["", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500", "1600"]

    //running into crossbroswer issue, in regards to a grid, and sizing issues.


    for (var i = 0; i < finhgt; i++) {


        var myGrid = document.createElementNS(svgNS, 'line')
        myGrid.setAttribute("id", "linearY")
        myGrid.setAttribute("stroke-width", "1")
        myGrid.setAttribute("stroke", "lightgray")
        myGrid.setAttribute("x1", 0)
        myGrid.setAttribute("x2", "100%")
        myGrid.setAttribute("y1", i * 100)
        myGrid.setAttribute("y2", i * 100)
        document.getElementById("mySVG").appendChild(myGrid)

        var mygrid = document.createElementNS(svgNS, 'line')
        mygrid.setAttribute("id", "linearX")
        mygrid.setAttribute("stroke-width", "1")
        mygrid.setAttribute("stroke", "lightgray")
        mygrid.setAttribute("x1", i * 100)
        mygrid.setAttribute("x2", i * 100)
        mygrid.setAttribute("y1", 0)
        mygrid.setAttribute("y2", "100%")
        document.getElementById("mySVG").appendChild(mygrid)

        var yT = document.createElementNS(svgNS, "text")
        yT.setAttribute("font-size", 15)
        yT.setAttribute("font-weight", "bold")
        yT.setAttribute("fill", "black")
        yT.setAttribute("x", 0)
        yT.setAttribute("y", 15 + i * 100)
        yT.textContent = Content[i]
        document.getElementById("mySVG").appendChild(yT)

        var xT = document.createElementNS(svgNS, "text")
        xT.setAttribute("font-size", 15)
        xT.setAttribute("font-weight", "bold")
        xT.setAttribute("fill", "black")
        xT.setAttribute("x", 2.5 + i * 100)
        xT.setAttribute("y", 13)
        xT.textContent = Content[i]
        document.getElementById("mySVG").appendChild(xT)

    }

    //some browser inconsistancy issues		
    f = navigator.userAgent.search("Firefox");
    O = navigator.userAgent.search("Opera")

    if (f > -1) {
        //brwsr = "Firefox";
    }
    else if (O > -1) {
        //brwsr = "Opera";
    }

    //alert(brwsr);
}

//clears grid with jquery remove function
function clearGrid() {
    $('line').remove();
    $('text').remove();
}

//creating shapes
xmlns = "http://www.w3.org/2000/svg"
xlink = "http://www.w3.org/1999/xlink"

chosenShape = ""
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


    document.getElementById("mySVG").setAttribute("onmousedown", null)
    document.getElementById("mySVG").setAttribute("onmousemove", null)
    document.getElementById("mySVG").setAttribute("onmouseup", null)
    clearPoints()

    document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
}

function startShape(evt) {
    if (evt.target.nodeName == "svg" && follow == false) {
        clearPoints()
        if (chosenShape == "rect") {
            // Let's create a rectangle!
            var R = document.createElementNS(xmlns, "path")
            currentShape = "rect" + recCount
            R.setAttributeNS(null, "id", currentShape)
            recCount++
            R.setAttributeNS(null, "class", "rect")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            R.setAttributeNS(null, "d", "M " + firstCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            R.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            R.setAttributeNS(null, "stroke", "black")

            // Set Functions
            R.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            R.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Rect
            document.getElementById("mySVG").appendChild(R)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        } else if (chosenShape == "free") {
            drawItem()
        }
        else if (chosenShape == "tri") {
            // Time for the Triangle
            var T = document.createElementNS(xmlns, "path")
            currentShape = "tri" + triCount
            T.setAttributeNS(null, "id", currentShape)
            triCount++
            T.setAttributeNS(null, "class", "tri")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            remY = evt.clientY - fixY
            T.setAttributeNS(null, "d", "M " + firstCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            T.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            T.setAttributeNS(null, "stroke", "black")

            // Set Functions
            T.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            T.setAttribute("onclick", "editMenu(chosenShape)")


            // Add Rect
            document.getElementById("mySVG").appendChild(T)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "circ") {
            // You spin me round right baby right round
            var C = document.createElementNS(xmlns, "circle")
            currentShape = "circ" + circCount
            C.setAttributeNS(null, "id", currentShape)
            circCount++
            C.setAttributeNS(null, "class", "circ")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            C.setAttributeNS(null, "cx", evt.clientX)
            C.setAttributeNS(null, "cy", evt.clientY - fixY)
            C.setAttributeNS(null, "r", "1")

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            C.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            C.setAttributeNS(null, "stroke", "black")

            // Set Functions
            C.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            C.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Circle
            document.getElementById("mySVG").appendChild(C)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "elli") {
            // Ellipse: like a circle, but not
            var E = document.createElementNS(xmlns, "ellipse")
            currentShape = "elli" + elliCount
            E.setAttributeNS(null, "id", currentShape)
            elliCount++
            E.setAttributeNS(null, "class", "elli")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            E.setAttributeNS(null, "cx", evt.clientX)
            E.setAttributeNS(null, "cy", evt.clientY - fixY)
            E.setAttributeNS(null, "rx", "1")
            E.setAttributeNS(null, "ry", "1")

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            E.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            E.setAttributeNS(null, "stroke", "black")

            // Set Functions
            E.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            E.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Circle
            document.getElementById("mySVG").appendChild(E)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "line") {
            // Let's start a Line!
            var L = document.createElementNS(xmlns, "path")
            currentShape = "line" + lineCount
            L.setAttributeNS(null, "id", currentShape)
            lineCount++
            L.setAttributeNS(null, "class", "line")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()

            L.setAttributeNS(null, "d", "M " + firstCoord)

            // Black Stroke
            L.setAttributeNS(null, "stroke", "black")
            L.setAttributeNS(null, "stroke-width", "4")

            // Set Functions
            L.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            L.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Rect
            document.getElementById("mySVG").appendChild(L)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "ngon") {
            // Brace for NGon, To Infinity and Beyond!
            var N = document.createElementNS(xmlns, "path")
            currentShape = "ngon" + ngonCount
            N.setAttributeNS(null, "id", currentShape)
            ngonCount++
            N.setAttributeNS(null, "class", "ngon")

            // Set Sizes
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            N.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            N.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            N.setAttributeNS(null, "stroke", "black")

            // Black Stroke
            N.setAttributeNS(null, "stroke", "black")
            N.setAttributeNS(null, "stroke-width", "1")

            // Edit Menu
            N.setAttribute("onclick", "editMenu(chosenShape)")

            // Add NGon
            document.getElementById("mySVG").appendChild(N)
            document.getElementById("mySVG").setAttribute("onmousedown", "addNgonCorner(evt)")
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "pent") {
            // The Symbol of the Beast
            var P = document.createElementNS(xmlns, "path")
            currentShape = "pent" + pentCount
            P.setAttributeNS(null, "id", currentShape)
            pentCount++
            P.setAttributeNS(null, "class", "pent")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            P.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            P.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            P.setAttributeNS(null, "stroke", "black")

            // Black Stroke
            P.setAttributeNS(null, "stroke", "black")
            P.setAttributeNS(null, "stroke-width", "1")

            // Function time
            P.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            P.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Pentagon
            document.getElementById("mySVG").appendChild(P)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "oct") {
            // Stop Sign
            var O = document.createElementNS(xmlns, "path")
            currentShape = "oct" + octCount
            O.setAttributeNS(null, "id", currentShape)
            octCount++
            O.setAttributeNS(null, "class", "oct")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY
            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            O.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            O.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            O.setAttributeNS(null, "stroke", "black")

            // Black Stroke
            O.setAttributeNS(null, "stroke", "black")
            O.setAttributeNS(null, "stroke-width", "1")

            // Function time
            O.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            O.setAttribute("onclick", "editMenu(chosenShape)")

            // Add Pentagon
            document.getElementById("mySVG").appendChild(O)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
        else if (chosenShape == "arrow") {
            // Arrow head
            var A = document.createElementNS(xmlns, "path")
            currentShape = "arrow" + arrowCount
            A.setAttributeNS(null, "id", currentShape)
            arrowCount++
            A.setAttributeNS(null, "class", "arrow")

            // Set Sizes
            remX = evt.clientX
            remY = evt.clientY - fixY

            firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
            secondCoord = (evt.clientX + 1).toString() + " " + (evt.clientY - fixY + 1).toString()
            A.setAttributeNS(null, "d", "M " + firstCoord + " L " + secondCoord)

            // Random Colors
            red = Math.floor(Math.random() * 255);
            green = Math.floor(Math.random() * 255);
            blue = Math.floor(Math.random() * 255);

            // Fill Color, Black Stroke
            A.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
            A.setAttributeNS(null, "stroke", "black")

            // Black Stroke
            A.setAttributeNS(null, "stroke", "black")
            A.setAttributeNS(null, "stroke-width", "1")

            // Function time
            A.setAttribute("onmousedown", "startMove(evt, id)")

            // Edit Menu
            A.setAttribute("onclick", "editMenu(chosenShape)")


            // Add Arrow
            document.getElementById("mySVG").appendChild(A)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
        }
    }
}

function drawShape(evt) {
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
        newCX = (remX + evt.clientX) / 2
        newCY = (remY + evt.clientY - fixY) / 2

        oneSide = (remY - evt.clientY - fixY) ^ 2
        twoSide = (remX - evt.clientX) ^ 2

        newR = Math.sqrt(Math.abs(oneSide)) + Math.sqrt(Math.abs(twoSide))

        document.getElementById(currentShape).setAttribute("cx", newCX)
        document.getElementById(currentShape).setAttribute("cy", newCY)
        document.getElementById(currentShape).setAttribute("r", newR * 2)

        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")
    }
    else if (chosenShape == "elli") {
        // Extending the Ellipse: Electric Boogaloo 2
        newCX = (remX + evt.clientX) / 2
        newCY = (remY + evt.clientY - fixY) / 2

        oneSide = (remY - evt.clientY - fixY) ^ 2
        twoSide = (remX - evt.clientX) ^ 2

        newR = Math.sqrt(Math.abs(oneSide)) + Math.sqrt(Math.abs(twoSide))

        document.getElementById(currentShape).setAttribute("cx", newCX)
        document.getElementById(currentShape).setAttribute("cy", newCY)
        document.getElementById(currentShape).setAttribute("rx", newR * 2.5)
        document.getElementById(currentShape).setAttribute("ry", newR * 1.5)

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

    document.getElementById(shapeID).setAttribute("onmousemove", "shapeMove(evt, id)")
    document.getElementById(shapeID).setAttribute("onmouseup", "shapeStop(id)")
}

function shapeMove(evt, shapeID) {
    whichClass = document.getElementById(shapeID).getAttribute("class")
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

        document.getElementById(shapeID).setAttribute("d", newDimension)
    }
    else if (whichClass == "circ" || whichClass == "elli" && shapeFollow == true) {
        // Spin that record
        document.getElementById(shapeID).setAttribute("cx", evt.clientX)
        document.getElementById(shapeID).setAttribute("cy", evt.clientY - fixY)
    }
}

function shapeStop(shapeID) {
    shapeFollow = false
    whichClass = document.getElementById(shapeID).getAttribute("class")
    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
        addPoints(shapeID)
    }
    document.getElementById(shapeID).setAttribute("onmousemove", "")
    document.getElementById(shapeID).setAttribute("onmouseup", "")
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
    if (follow) {
        whichClass = document.getElementById(shapeID).getAttribute("class")
        if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
            num = CP.id.charAt(1)

            // Lets move the points
            document.getElementById("B" + num).setAttribute("fill", "white")
            document.getElementById("B" + num).setAttribute("cx", evt.clientX)
            document.getElementById("B" + num).setAttribute("cy", evt.clientY - fixY)
            document.getElementById("F" + num).setAttribute("cx", evt.clientX)
            document.getElementById("F" + num).setAttribute("cy", evt.clientY - fixY)

            // Now the shape
            x = document.getElementById(shapeID).getAttribute("d")
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

            document.getElementById(shapeID).setAttribute("d", newDimension)
        }
    }
}

function pointStop(shapeID) {
    follow = false
    x = document.getElementById(shapeID).getAttribute("d")
    whichClass = document.getElementById(shapeID).getAttribute("class")
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
    whichClass = document.getElementById(shapeID).getAttribute("class")
    clearPoints()

    if (whichClass == "rect" || whichClass == "tri" || whichClass == "line" || whichClass == "ngon" || whichClass == "pent" || whichClass == "oct" || whichClass == "arrow") {
        // Gathering coordinates from the shape
        y = shapeID

        x = document.getElementById(shapeID).getAttribute("d")
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
    path.setAttributeNS(null, "stroke_width", "5");
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
    if (chosenShape == 'rect') {
        console.log('copyRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('copyTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('copyCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('copyElli')
    }
    else if (chosenShape == "line") {
        console.log('copyLine')
    }
    else if (chosenShape == "ngon") {
        console.log('copyNgon')
    }
    else if (chosenShape == "pent") {
        console.log('copyPent')
    }
    else if (chosenShape == "oct") {
        console.log('copyOct')
    }
    else if (chosenShape == "arrow") {
        console.log('copyArrow')
    }
}

//Delete
function del(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('deleteRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('deleteTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('deleteCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('deleteElli')
    }
    else if (chosenShape == "line") {
        console.log('deleteLine')
    }
    else if (chosenShape == "ngon") {
        console.log('deleteNgon')
    }
    else if (chosenShape == "pent") {
        console.log('deletePent')
    }
    else if (chosenShape == "oct") {
        console.log('deleteOct')
    }
    else if (chosenShape == "arrow") {
        console.log('deleteArrow')
    }
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
function pColor(chosenShape) {
    if (chosenShape == 'rect') {
        console.log('pcRectangle')
    }
    else if (chosenShape == 'tri') {
        console.log('pcTriangle')
    }
    else if (chosenShape == 'circ') {
        console.log('pcCircle')
    }
    else if (chosenShape == 'elli') {
        console.log('pcElli')
    }
    else if (chosenShape == "line") {
        console.log('pcLine')
    }
    else if (chosenShape == "ngon") {
        console.log('pcNgon')
    }
    else if (chosenShape == "pent") {
        console.log('pcPent')
    }
    else if (chosenShape == "oct") {
        console.log('pcOct')
    }
    else if (chosenShape == "arrow") {
        console.log('pcArrow')
    }
}

//Re Color
function rColor(chosenShape) {
    //grabs current shape
    cs = document.getElementById(currentShape)

    //sets random RGB values
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);

    if (chosenShape == 'rect') {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == 'tri') {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == 'circ') {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == 'elli') {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == "line") {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == "ngon") {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == "pent") {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == "oct") {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
    else if (chosenShape == "arrow") {
        cs.setAttributeNS(null, "fill", "RGB(" + red + "," + green + "," + blue + ")")
    }
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
