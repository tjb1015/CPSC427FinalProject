//The menu is going to be dynamically created.
var subMenu = document.getElementById('menu')
//makes file menu
function fileMenu() {
    $("#secondary").empty();
    var fileDiv = document.getElementById("secondary");
    fileDiv.style.backgroundColor = "#64AAD0"
    str = '';
    str += '<ul id="Menu">'
    str += '<li><a onclick="New()"> New &emsp;</a></li>';
    str += '<li><a onclick="about()"> About</a></li>';
    str += '</ul>';
    fileDiv.innerHTML += str;
}

//makes brushes menu
function brushMenu() {
    $("#secondary").empty();
    var brushDiv = document.getElementById("secondary");
    brushDiv.style.backgroundColor = "#04859D"
    str = '';
    str += '<ul id="menu1">';
    str += '<li><a onclick="chooseShape(\'free\')"> Draw &emsp; </a></li>';
    str += '<li><a onclick="brush1()"> Brush 1 &emsp;</a></li>';
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
    str += '<li><a onclick="chooseShape(\'star\')"> Star </a></li>';
    str += '<li><a onclick="bezier()"> Bezier Curve </a></li>';
    str += '</ul>';
    shapesDiv.innerHTML += str;
}

//Makes edit menu
function editMenu() {
    $("#secondary").empty();
    
    var editDiv = document.getElementById("secondary");
    var shape = chosenShape.id;
   // alert(chosenShape+shape)
    editDiv.style.backgroundColor = "#37B6CE"
    str = '';
    str += '<ul id="menu3"><li><a onclick="average()"> Average &emsp;</a></li>';
    str += '<li><a onclick="clearColor(false);copy()"> Copy  &emsp;</a></li>';
    str += '<li><a onclick="clearColor(false);del()"> Delete &emsp;</a></li>';
    str += '<li><a onclick="clearColor(false);flip()"> Flip &emsp; </a></li>';
    str += '<li><a onclick="clearColor(false);pColor()"> PickColor &emsp; </a></li>';
    str += '<li><a onclick="clearColor(false);rColor()"> Recolor  &emsp;</a></li>';
    str += '<li><a onclick="clearColor(false);smooth()"> Smooth &emsp;</a></li>';
    str += '<li><a onclick="clearColor(false);unselect()"> Unselect &emsp; </a></li>';
    str += '<li><a onclick="clearColor(false);viewsrc()"> ViewSrc &emsp; </a></li>';
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
