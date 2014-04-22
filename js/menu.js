
//The menu is going to be dynamically created.

//makes file menu
function fileMenu() {
    $("#secondary").empty();
    var fileDiv = document.getElementById("secondary");
    str = '';
    str += '<ul><li><a onclick="Export()"> Export &emsp;</a></li>';
    str += '<li><a onclick="New()"> New &emsp;</a></li>';
    str += '<li><a onclick="about()"> About</a></li>';
    str += '</ul>';
    fileDiv.innerHTML += str;
}

//makes brushes menu
function brushMenu() {
    $("#secondary").empty();
    var brushDiv = document.getElementById("secondary");
    str = '';
    str += '<ul><li><a onclick="brush1()"> Brush 1 &emsp;</a></li>';
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
    str = '';
    str += '<ul><li id="rect"><a onclick="chooseShape(\'rect\')"> Rectangle &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'tri\')"> Triangle  &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'elli\')"> ellipse  &emsp;</a></li>';
    str += '<li><a onclick="chooseShape(\'circ\')"> Circle &emsp;</a></li>';
    str += '<li><a onclick="line()"> Line &emsp; </a></li>';
    str += '<li><a onclick="chooseShape(\'free\')"> Draw &emsp; </a></li>';
    str += '<li><a onclick="bezier()"> Bezier Curve </a></li>';
    str += '</ul>';
    shapesDiv.innerHTML += str;
}

//Makes edit menu
function editMenu() {
    $("#secondary").empty();
    var shapesDiv = document.getElementById("secondary");
    str = '';
    str += '<ul><li><a onclick="average()"> Average &emsp;</a></li>';
    str += '<li><a onclick="copy()"> Copy  &emsp;</a></li>';
    str += '<li><a onclick="delete()"> Delete &emsp;</a></li>';
    str += '<li><a onclick="flip()"> Flip &emsp; </a></li>';
    str += '<li><a onclick="pColor()"> PickColor &emsp; </a></li>';
    str += '<li><a onclick="rColor()"> Recolor  &emsp;</a></li>';
    str += '<li><a onclick="smooth()"> Smooth &emsp;</a></li>';
    str += '<li><a onclick="transform()"> Transform &emsp; </a></li>';
    str += '<li><a onclick="unselect()"> Unselect &emsp; </a></li>';
    str += '<li><a onclick="viewsrc()"> ViewSrc &emsp; </a></li>';
    str += '<li><a onclick="fix()"> fix </a></li>';
    str += '</ul>';
    shapesDiv.innerHTML += str;
}

//Makes grid menu
function grid() {
    $("#secondary").empty();
    var gridDiv = document.getElementById("secondary");
    str = ''
    str += '</br>'
    str += '<input type="radio" onclick="gridOne()" name="grid" value="yesgrid">Yes';
    str += '<input type="radio" onclick="clearGrid()" name="grid" value="nogrid">No';
    gridDiv.innerHTML += str;
}
