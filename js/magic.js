//svg namespace
var svgNS = "http://www.w3.org/2000/svg";

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

    alert(brwsr);
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
recCount = 0, triCount = 0, circCount = 0, elliCount = 0
cpCount = 0
follow = false
shapeFollow = false
remX = 0
remY = 0
fixY = 80


displacementX = new Array();
displacementY = new Array();

function chooseShape(shape) {
    chosenShape = shape
    // Resets all choices

    document.getElementById("mySVG").setAttribute("onmousedown", null)
    document.getElementById("mySVG").setAttribute("onmousemove", null)
    document.getElementById("mySVG").setAttribute("onmouseup", null)
    clearPoints()

    if (chosenShape == "rect") {

        document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
    }
    else if (chosenShape == "tri") {

        document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
    }
    else if (chosenShape == "circ") {

        document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
    }
    else if (chosenShape == "elli") {

        document.getElementById("mySVG").setAttribute("onmousedown", "startShape(evt)")
    }

}
function shapeStartMove(evt, shapeID) {
    clearPoints()
    shapeFollow = true
    whichClass = document.getElementById(shapeID).getAttribute("class")
    if (whichClass == "rect" || whichClass == "tri") {
        x = document.getElementById(shapeID).getAttribute("d")
        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        secondCoordX = x.split(" ")[4]
        secondCoordY = x.split(" ")[5]

        thirdCoordX = x.split(" ")[7]
        thirdCoordY = x.split(" ")[8]

        fourthCoordX = x.split(" ")[10]
        fourthCoordY = x.split(" ")[11]

        displacementX[0] = evt.clientX - firstCoordX
        displacementY[0] = evt.clientY - firstCoordY

        displacementX[1] = secondCoordX - evt.clientX
        displacementY[1] = evt.clientY - secondCoordY

        displacementX[2] = thirdCoordX - evt.clientX
        displacementY[2] = thirdCoordY - evt.clientY

        displacementX[3] = evt.clientX - fourthCoordX
        displacementY[3] = fourthCoordY - evt.clientY
    }
    document.getElementById(shapeID).setAttribute("onmousemove", "shapeMove(evt, id)")
    document.getElementById(shapeID).setAttribute("onmouseup", "shapeStop(id)")

}
function shapeMove(evt, shapeID) {
    whichClass = document.getElementById(shapeID).getAttribute("class")
    if (whichClass == "rect" && shapeFollow == true) {
        // Move Rectangle
        firstCoord = (evt.clientX - displacementX[0]).toString() + " " + (evt.clientY - displacementY[0]).toString()
        secondCoord = (evt.clientX + displacementX[1]).toString() + " " + (evt.clientY - displacementY[1]).toString()
        thirdCoord = (evt.clientX + displacementX[2]).toString() + " " + (evt.clientY + displacementY[2]).toString()
        fourthCoord = (evt.clientX - displacementX[3]).toString() + " " + (evt.clientY + displacementY[3]).toString()

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + fourthCoord + " L " + firstCoord

        document.getElementById(shapeID).setAttribute("d", newDimension)

    }
    else if (whichClass == "tri" && shapeFollow == true) {
        // Move Triangle
        firstCoord = (evt.clientX - displacementX[0]).toString() + " " + (evt.clientY - displacementY[0]).toString()
        secondCoord = (evt.clientX + displacementX[1]).toString() + " " + (evt.clientY - displacementY[1]).toString()
        thirdCoord = (evt.clientX + displacementX[2]).toString() + " " + (evt.clientY + displacementY[2]).toString()
        fourthCoord = (evt.clientX - displacementX[3]).toString() + " " + (evt.clientY + displacementY[3]).toString()

        newDimension = "M " + firstCoord + " L " + secondCoord + " L " + thirdCoord + " L " + fourthCoord

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
    if (whichClass == "rect" || whichClass == "tri") {
        addPoints(shapeID)
    }
    document.getElementById(shapeID).setAttribute("onmousemove", "")
    document.getElementById(shapeID).setAttribute("onmouseup", "")
}
function pointFollow() {
    follow = true
}
function pointMove(evt, CP, shapeID) {
    if (follow) {
        whichClass = document.getElementById(shapeID).getAttribute("class")
        if (whichClass == "rect" || whichClass == "tri") {
            if (CP.id == "C1") {
                // First Coordinates
                document.getElementById("B1").setAttribute("fill", "white")
                document.getElementById("B1").setAttribute("cx", evt.clientX)
                document.getElementById("B1").setAttribute("cy", evt.clientY - fixY)
                document.getElementById("F1").setAttribute("cx", evt.clientX)
                document.getElementById("F1").setAttribute("cy", evt.clientY - fixY)

                x = document.getElementById(shapeID).getAttribute("d")
                firstCoordX = x.split(" ")[1]
                firstCoordY = x.split(" ")[2]

                secondCoordX = x.split(" ")[4]
                secondCoordY = x.split(" ")[5]

                thirdCoordX = x.split(" ")[7]
                thirdCoordY = x.split(" ")[8]

                fourthCoordX = x.split(" ")[10]
                fourthCoordY = x.split(" ")[11]

                firstCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString() + " L "
                secondCoord = secondCoordX + " " + secondCoordY + " L "
                thirdCoord = thirdCoordX + " " + thirdCoordY + " L "
                fourthCoord = fourthCoordX + " " + fourthCoordY + " L "

                if (whichClass == "rect") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + fourthCoord + (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
                }
                else if (whichClass == "tri") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + (evt.clientX).toString() + " " + (evt.clientY - fixY).toString()
                }

                document.getElementById(shapeID).setAttribute("d", newDimension)

            }
            else if (CP.id == "C2") {
                // Second Coordinates
                document.getElementById("B2").setAttribute("fill", "white")
                document.getElementById("B2").setAttribute("cx", evt.clientX)
                document.getElementById("B2").setAttribute("cy", evt.clientY - fixY)
                document.getElementById("F2").setAttribute("cx", evt.clientX)
                document.getElementById("F2").setAttribute("cy", evt.clientY - fixY)

                x = document.getElementById(shapeID).getAttribute("d")
                firstCoordX = x.split(" ")[1]
                firstCoordY = x.split(" ")[2]

                secondCoordX = x.split(" ")[4]
                secondCoordY = x.split(" ")[5]

                thirdCoordX = x.split(" ")[7]
                thirdCoordY = x.split(" ")[8]

                fourthCoordX = x.split(" ")[10]
                fourthCoordY = x.split(" ")[11]

                firstCoord = firstCoordX + " " + firstCoordY + " L "
                secondCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString() + " L "
                thirdCoord = thirdCoordX + " " + thirdCoordY + " L "
                fourthCoord = fourthCoordX + " " + fourthCoordY + " L "

                if (whichClass == "rect") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + fourthCoord + firstCoordX + " " + firstCoordY
                }
                else if (whichClass == "tri") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + firstCoordX + " " + firstCoordY
                }

                document.getElementById(shapeID).setAttribute("d", newDimension)
            }
            else if (CP.id == "C3") {
                // Third Coordinates
                document.getElementById("B3").setAttribute("fill", "white")
                document.getElementById("B3").setAttribute("cx", evt.clientX)
                document.getElementById("B3").setAttribute("cy", evt.clientY - fixY)
                document.getElementById("F3").setAttribute("cx", evt.clientX)
                document.getElementById("F3").setAttribute("cy", evt.clientY - fixY)

                x = document.getElementById(shapeID).getAttribute("d")
                firstCoordX = x.split(" ")[1]
                firstCoordY = x.split(" ")[2]

                secondCoordX = x.split(" ")[4]
                secondCoordY = x.split(" ")[5]

                thirdCoordX = x.split(" ")[7]
                thirdCoordY = x.split(" ")[8]

                fourthCoordX = x.split(" ")[10]
                fourthCoordY = x.split(" ")[11]

                firstCoord = firstCoordX + " " + firstCoordY + " L "
                secondCoord = secondCoordX + " " + secondCoordY + " L "
                thirdCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString() + " L "
                fourthCoord = fourthCoordX + " " + fourthCoordY + " L "

                if (whichClass == "rect") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + fourthCoord + firstCoordX + " " + firstCoordY
                }
                else if (whichClass == "tri") {
                    newDimension = "M " + firstCoord + secondCoord + thirdCoord + firstCoordX + " " + firstCoordY
                }

                document.getElementById(shapeID).setAttribute("d", newDimension)
            }
            else if (CP.id == "C4") {
                // Fourth Coordinates
                document.getElementById("B4").setAttribute("fill", "white")
                document.getElementById("B4").setAttribute("cx", evt.clientX)
                document.getElementById("B4").setAttribute("cy", evt.clientY - fixY)
                document.getElementById("F4").setAttribute("cx", evt.clientX)
                document.getElementById("F4").setAttribute("cy", evt.clientY - fixY)

                x = document.getElementById(shapeID).getAttribute("d")
                firstCoordX = x.split(" ")[1]
                firstCoordY = x.split(" ")[2]

                secondCoordX = x.split(" ")[4]
                secondCoordY = x.split(" ")[5]

                thirdCoordX = x.split(" ")[7]
                thirdCoordY = x.split(" ")[8]

                fourthCoordX = x.split(" ")[10]
                fourthCoordY = x.split(" ")[11]

                firstCoord = firstCoordX + " " + firstCoordY + " L "
                secondCoord = secondCoordX + " " + secondCoordY + " L "
                thirdCoord = thirdCoordX + " " + thirdCoordY + " L "
                fourthCoord = (evt.clientX).toString() + " " + (evt.clientY - fixY).toString() + " L "

                newDimension = "M " + firstCoord + secondCoord + thirdCoord + fourthCoord + firstCoordX + " " + firstCoordY

                document.getElementById(shapeID).setAttribute("d", newDimension)

            }
        }
    }
}
function pointStop() {
    follow = false
    document.getElementById("B1").setAttribute("fill", "none")
    document.getElementById("B2").setAttribute("fill", "none")
    document.getElementById("B3").setAttribute("fill", "none")
    if (chosenShape == "rect") {
        document.getElementById("B4").setAttribute("fill", "none")
    }

}
function clearPoints() {
    if (cpCount > 0) {
        for (i = 0; i < cpCount; i++) {
            document.getElementById("mySVG").removeChild(document.getElementById("CP" + i))
        }
    }
    cpCount = 0
}
function addPoints(shapeID) {
    whichClass = document.getElementById(shapeID).getAttribute("class")
    clearPoints()
    if (whichClass == "rect" || whichClass == "tri") {
        // Gathering coordinates from the shape
        x = document.getElementById(shapeID).getAttribute("d")
        y = shapeID

        firstCoordX = x.split(" ")[1]
        firstCoordY = x.split(" ")[2]

        secondCoordX = x.split(" ")[4]
        secondCoordY = x.split(" ")[5]

        thirdCoordX = x.split(" ")[7]
        thirdCoordY = x.split(" ")[8]

        fourthCoordX = x.split(" ")[10]
        fourthCoordY = x.split(" ")[11]

        // Preparing the Control Points
        var G = document.createElementNS(xmlns, "g")
        G.setAttribute("id", "CP" + cpCount)
        cpCount++
        document.getElementById("mySVG").appendChild(G)


        var C1 = document.createElementNS(xmlns, "g")
        C1.setAttributeNS(null, "id", "C1")
        C1.setAttribute("onmousedown", "pointFollow()")
        C1.setAttribute("onmousemove", "pointMove(evt, this, y )")
        C1.setAttribute("onmouseup", "pointStop()")

        var B1 = document.createElementNS(xmlns, "circle")
        B1.setAttributeNS(null, "id", "B1")
        B1.setAttributeNS(null, "cx", firstCoordX)
        B1.setAttributeNS(null, "cy", firstCoordY)
        B1.setAttributeNS(null, "r", "150")
        B1.setAttributeNS(null, "fill", "none")
        B1.setAttributeNS(null, "fill-opacity", "0")
        C1.appendChild(B1)

        var F1 = document.createElementNS(xmlns, "circle")
        F1.setAttributeNS(null, "id", "F1")
        F1.setAttributeNS(null, "cx", firstCoordX)
        F1.setAttributeNS(null, "cy", firstCoordY)
        F1.setAttributeNS(null, "r", "5")
        F1.setAttributeNS(null, "stroke", "black")
        F1.setAttributeNS(null, "fill", "red")
        C1.appendChild(F1)
        G.appendChild(C1)

        var C2 = document.createElementNS(xmlns, "g")
        C2.setAttributeNS(null, "id", "C2")
        C2.setAttribute("onmousedown", "pointFollow()")
        C2.setAttribute("onmousemove", "pointMove(evt, this, y )")
        C2.setAttribute("onmouseup", "pointStop()")

        var B2 = document.createElementNS(xmlns, "circle")
        B2.setAttributeNS(null, "id", "B2")
        B2.setAttributeNS(null, "cx", secondCoordX)
        B2.setAttributeNS(null, "cy", secondCoordY)
        B2.setAttributeNS(null, "r", "150")
        B2.setAttributeNS(null, "fill", "none")
        B2.setAttributeNS(null, "fill-opacity", "0")
        C2.appendChild(B2)

        var F2 = document.createElementNS(xmlns, "circle")
        F2.setAttributeNS(null, "id", "F2")
        F2.setAttributeNS(null, "cx", secondCoordX)
        F2.setAttributeNS(null, "cy", secondCoordY)
        F2.setAttributeNS(null, "r", "5")
        F2.setAttributeNS(null, "stroke", "black")
        F2.setAttributeNS(null, "fill", "red")
        C2.appendChild(F2)
        G.appendChild(C2)

        var C3 = document.createElementNS(xmlns, "g")
        C3.setAttributeNS(null, "id", "C3")
        C3.setAttribute("onmousedown", "pointFollow()")
        C3.setAttribute("onmousemove", "pointMove(evt, this, y )")
        C3.setAttribute("onmouseup", "pointStop()")

        var B3 = document.createElementNS(xmlns, "circle")
        B3.setAttributeNS(null, "id", "B3")
        B3.setAttributeNS(null, "cx", thirdCoordX)
        B3.setAttributeNS(null, "cy", thirdCoordY)
        B3.setAttributeNS(null, "r", "150")
        B3.setAttributeNS(null, "fill", "none")
        B3.setAttributeNS(null, "fill-opacity", "0")
        C3.appendChild(B3)

        var F3 = document.createElementNS(xmlns, "circle")
        F3.setAttributeNS(null, "id", "F3")
        F3.setAttributeNS(null, "cx", thirdCoordX)
        F3.setAttributeNS(null, "cy", thirdCoordY)
        F3.setAttributeNS(null, "r", "5")
        F3.setAttributeNS(null, "stroke", "black")
        F3.setAttributeNS(null, "fill", "red")
        C3.appendChild(F3)
        G.appendChild(C3)

        if (whichClass == "rect") {
            var C4 = document.createElementNS(xmlns, "g")
            C4.setAttributeNS(null, "id", "C4")
            C4.setAttribute("onmousedown", "pointFollow()")
            C4.setAttribute("onmousemove", "pointMove(evt, this, y )")
            C4.setAttribute("onmouseup", "pointStop()")

            var B4 = document.createElementNS(xmlns, "circle")
            B4.setAttributeNS(null, "id", "B4")
            B4.setAttributeNS(null, "cx", fourthCoordX)
            B4.setAttributeNS(null, "cy", fourthCoordY)
            B4.setAttributeNS(null, "r", "150")
            B4.setAttributeNS(null, "fill", "none")
            B4.setAttributeNS(null, "fill-opacity", "0")
            C4.appendChild(B4)

            var F4 = document.createElementNS(xmlns, "circle")
            F4.setAttributeNS(null, "id", "F4")
            F4.setAttributeNS(null, "cx", fourthCoordX)
            F4.setAttributeNS(null, "cy", fourthCoordY)
            F4.setAttributeNS(null, "r", "5")
            F4.setAttributeNS(null, "stroke", "black")
            F4.setAttributeNS(null, "fill", "red")
            C4.appendChild(F4)
            G.appendChild(C4)
        }
    }
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
            R.setAttribute("onmousedown", "shapeStartMove(evt, id)")


            // Add Rect
            document.getElementById("mySVG").appendChild(R)
            document.getElementById("mySVG").setAttribute("onmousemove", "drawShape(evt)")
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
            T.setAttribute("onmousedown", "shapeStartMove(evt, id)")


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
            C.setAttribute("onmousedown", "shapeStartMove(evt, id)")

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

            E.setAttribute("onmousedown", "shapeStartMove(evt, id)")

            // Add Circle
            document.getElementById("mySVG").appendChild(E)
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
        document.getElementById(currentShape).setAttribute("r", newR)

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
        document.getElementById(currentShape).setAttribute("rx", newR * 2)
        document.getElementById(currentShape).setAttribute("ry", newR)

        document.getElementById("mySVG").setAttribute("onmouseup", "finishShape()")

    }
}
function finishShape() {
    document.getElementById("mySVG").setAttribute("onmousemove", null)
    document.getElementById("mySVG").setAttribute("onmouseup", null)

}

