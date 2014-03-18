//The menu is going to be dynamically created.
function fileMenu(){
 $( "#secondary" ).empty();
 var fileDiv = document.getElementById("secondary");
 str = '';
 str += '<ul><li><a onclick="save()"> Save &emsp;</a></li>';
 str += '<li><a onclick="Export()"> Export &emsp;</a></li>';
 str += '<li><a onclick="New()"> New &emsp;</a></li>';
 str += '<li><a onclick="about()"> About</a></li>';
 str += '</ul>';
 fileDiv.innerHTML += str; 
}

function brushMenu(){
 $( "#secondary" ).empty();
 var brushDiv = document.getElementById("secondary");
 str = '';
 str += '<ul><li><a onclick="brush1()"> Brush 1 &emsp;</a></li>';
 str += '<li><a onclick="brush2()"> Brush 2 &emsp;</a></li>';
 str += '<li><a onclick="brush3()"> Brush 3 &emsp;</a></li>';
 str += '<li><a onclick="brush4()"> Brush 4 </a></li>';
 str += '</ul>';
 brushDiv.innerHTML += str;
}

function shapesMenu(){
 $( "#secondary" ).empty();
 var shapesDiv = document.getElementById("secondary");
 str = '';
 str += '<ul><li><a onclick="rectangle()"> Rectangle &emsp;</a></li>';
 str += '<li><a onclick="star()"> Star  &emsp;</a></li>';
 str += '<li><a onclick="ngon()"> Ngon &emsp;</a></li>';
 str += '<li><a onclick="line()"> Line &emsp; </a></li>';
 str += '<li><a onclick="draw()"> Draw &emsp; </a></li>';
 str += '<li><a onclick="bezier()"> Bezier Curve </a></li>';
 str += '</ul>';
 shapesDiv.innerHTML += str;
}

function editMenu(){
 $( "#secondary" ).empty();
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
