//The menu is going to be dynamically created.
var subMenu = document.getElementById('menu')
//makes file menu
function fileMenu() {
    $("#secondary").empty();
    var fileDiv = document.getElementById("secondary");
    fileDiv.style.backgroundColor = "#64AAD0"
    str = '';
    str += '<ul id="Menu"><li><a onclick="Export()"> Export &emsp;</a></li>';
    str += '<li><a onclick="New()"> New &emsp;</a></li>';
    str += '<li><a onclick="alert('meow')"> About</a></li>';
    str += '</ul>';
    fileDiv.innerHTML += str;
}

//makes brushes menu
function brushMenu() {
    $("#secondary").empty();
    var brushDiv = document.getElementById("secondary");
    brushDiv.style.backgroundColor = "#04859D"
    str = '';
    str += '<ul id="menu1"><li><a onclick="brush1()"> Brush 1 &emsp;</a></li>';
    str += '<li><a onclick="brush2()"> Brush 2 &emsp;</a></li>';
    str += '<li><a onclick="brush3()"> Brush 3 &emsp;</a></li>';
    str += '<li><a onclick="brush4()"> Brush 4 </a></li>';
    str += '</ul>';
    brushDiv.innerHTML += str;
}

//makes shapes menu
function shapesMenu() {
    $("#secondary").empty();
    var shapesDiv = document.getElementById("secondary");
    shapesDiv.style.backgroundColor = "#015666"
    str = '';
    str += '<ul id="menu2"><li id="rect"><a onclick="chooseShape(\'rect\')"> Rectangle &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'tri\')"> Triangle  &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'elli\')"> Ellipse  &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'circ\')"> Circle &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'line\')"> Line &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'ngon\')"> Ngon &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'pent\')"> Pentagon &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'oct\')"> Octagon &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'arrow\')"> Arrow &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'free\')"> Draw &emsp; </a></li>';
    str += '<li><a onclick="drawStar()"> Star </a></li>';
    str += '<li><a onclick="bezier()"> Bezier Curve </a></li>';
    str += '</ul>';
    shapesDiv.innerHTML += str;
}

//Makes edit menu
function editMenu(chosenShape) {
    $("#secondary").empty();
    var editDiv = document.getElementById("secondary");
    editDiv.style.backgroundColor = "#37B6CE"
    str = '';
    str += '<ul id="menu3"><li><a onclick="average(chosenShape)"> Average &emsp;</a></li>';
    str += '<li><a onclick="copy(chosenShape)"> Copy  &emsp;</a></li>';
    str += '<li><a onclick="del(chosenShape)"> Delete &emsp;</a></li>';
    str += '<li><a onclick="flip(chosenShape)"> Flip &emsp; </a></li>';
    str += '<li><a onclick="pColor(chosenShape)"> PickColor &emsp; </a></li>';
    str += '<li><a onclick="rColor(chosenShape)"> Recolor  &emsp;</a></li>';
    str += '<li><a onclick="smooth(chosenShape)"> Smooth &emsp;</a></li>';
    str += '<li><a onclick="unselect(chosenShape)"> Unselect &emsp; </a></li>';
    str += '<li><a onclick="viewsrc(chosenShape)"> ViewSrc &emsp; </a></li>';
    str += '</ul>';
    editDiv.innerHTML += str;
}

//Makes grid menu
function grid(){
 $( "#secondary" ).empty();
 var gridDiv = document.getElementById("secondary");
 gridDiv.style.backgroundColor="#5FBDCE"
 str = ''
 str += '<ul id="Menu">'
 str += '<li><input type="radio" onclick="clearGrid(\'yes\')" name="grid" value="yesgrid" >Yes</li>';
 str += '<li><input type="radio" onclick="clearGrid(\'no\')" name="grid" value="nogrid">No</li>';
 str += '</ul>'
 gridDiv.innerHTML += str; 
}
