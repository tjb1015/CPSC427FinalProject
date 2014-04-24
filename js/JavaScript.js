
var xmlns="http://www.w3.org/2000/svg"
var place;
var newpath;
var newcurve;
var grid=false
var thingclicked=false
var toolchosen="Rectangle"
var Chosen; //the object that has been selected with a mouseclick
var PG; //a group holding the physical points of a polygon
var PGon=false
var count=0;
var gridsize=25
var oldX, oldY
var first=true
var veryfirst=true
var scalestring=" scale(1,1)"
var gridcolor="#ff8888"
colors=new Array("#f88","#ff8","#8ff","#80f")
var globalcentral
offsets=new Array(0,.45,.55,1)
widgnames=new Array("Hue","Sat","Bri","Tra")
var w1=w2=.5
xmax=0
xmin=4000
ymax=0
ymin=4000
edge=2
var A=new Array()
function startup(evt){
    //svgDocument = evt.getTarget().getOwnerDocument();
    place = document.getElementById("place");
    bigR = document.getElementById("bigR");
    STEL = document.getElementById("STEL");
    EL = document.getElementById("EL");
    newline = document.createElementNS(xmlns,"line");
    newline.setAttribute("id", "L"); 
    place.setAttribute("onkeyup","keyHandle(evt)")
    hidenewline()
    newline.setAttribute("stroke", "black");
    newline.setAttribute("stroke-width", "1");
    place.appendChild(newline);
    newcurve = document.createElementNS(xmlns,"path");
    newcurve.setAttribute("id", "C"); 
    newcurve.setAttribute("stroke", "blue");
    newcurve.setAttribute("fill", "none");
    newcurve.setAttribute("stroke-width", "1");
    place.appendChild(newcurve);
    selectM = document.getElementById("selectM");
    toolM = document.getElementById("toolM");
    Marray=new Array(selectM,toolM)
    BuildMenus(Marray)
	
}
function detectHTML(v){
    HTMLpresent=v
}
function hidenewline(){
    newline.setAttribute("x1", 0); 
    newline.setAttribute("y1", 0); 
    newline.setAttribute("x2", 1); 
    newline.setAttribute("y2", 1); 
}
function begin(evt){
    if (PGon) place.removeChild(PG)
    PGon=false
    if (thingclicked){thingclicked=false;return}
    if (veryfirst){newp("path"); veryfirst=false}
    X=evt.clientX;
    Y=evt.clientY;
    if (grid){
        X=Math.floor(X/gridsize)*gridsize+gridsize/2
        Y=Math.floor(Y/gridsize)*gridsize+gridsize/2
    }
	
    eval(toolchosen)()
    oldX=X
    oldY=Y
}
function Polyline(){
	
    if (first){
        STEL.setAttribute("cx",X)
        STEL.setAttribute("cy",Y)
        first=false
        count++
        newp("path")
    }
    else{
        EL.setAttribute("cx",X)
        EL.setAttribute("cy",Y)
    }
    place.setAttribute("onmousemove","Polydraw(evt)")
    STEL.setAttribute("onmousemove","Polydraw(evt)")
    pathstring+=X+" "+Y+" "
    newpath.setAttribute("d", pathstring);
    first=false
}
function newp(p){
    pathstring="M "
    newpath = document.createElementNS(xmlns,p);
    newpath.setAttribute("fill", "none");
    CommonProps(newpath)
}
function Polydraw(evt){
    Commondraw(evt)
    newline.setAttribute("x1", oldX); 
    newline.setAttribute("y1", oldY); 
    newline.setAttribute("x2", X); 
    newline.setAttribute("y2", Y); 
	
}
function Xolygon(){
    newxoly = document.createElement(xmlns,"path");
    count++
	
    //starstring="M "+X+" "+Y+" "+100+" "+200+" "+200+" "+100+" z"
    xolystring="M "+X+" "+Y+" "
    n=Math.ceil(Math.random()*8)+2
    for (i=0;i<n;i++){
        nx=Math.floor(Math.random()*600)
        ny=Math.floor(Math.random()*400)
        xolystring+=nx+" "+ny+" "
    }
    xolystring+="z"
    newxoly.setAttribute("fill", color());
    newxoly.setAttribute("d", xolystring);
    CommonProps(newxoly)
    place.setAttribute("onmouseup","doneCommon(newxoly)")
    first=false
}
function Ngon(){
    Star(1)
}
function Star(permute){
	
    newstar = document.createElementNS(xmlns,"path");
    count++
    //alert(count)
    starstring="M "
    if (!permute==1) {
        n=Math.floor(Math.random()*12)+5
        permute=Math.floor(Math.random()*(n-4))+3
        if (Math.floor(n/permute)*permute==n) n++
		
		
    }
    else 	n=Math.floor(Math.random()*8)+3
    radius=100
    Ang=2*Math.PI/n
    Ax=new Array(n)
    Ay=new Array(n)
    for (i=0;i<n;i++){
		
        Ax[i]=X+Math.ceil(radius*Math.cos(i*Ang))
        Ay[i]=Y+Math.ceil(radius*Math.sin(i*Ang))
    }
    for (i=0;i<n;i++){
        starstring+=Ax[(i*permute)%n]+" "+Ay[(i*permute)%n]+" "
    }
    starstring+="z"
    newstar.setAttribute("fill", color());
    newstar.setAttribute("d", starstring);
    CommonProps(newstar)
    //place.setAttribute("onmousemove","Stardraw(evt)")
    place.setAttribute("onmouseup","doneCommon(newstar)")
    first=false
}
function Rectangle(x,y){
    newrect = document.createElementNS(xmlns,"path");
    count++
    var s="M "+x+" "+y+" "+(x+5)+" "+y+" "+(x+5)+" "+(y+5)+" "+x+" "+(y+5)+" z"
    newrect.setAttribute("d", s); 
    newrect.setAttribute("fill", color());
    CommonProps(newrect)
    place.setAttribute("onmousemove","Rectdraw(evt)")
    place.setAttribute("onmouseup","doneCommon(newrect)")
    first=false
}
function Rectdraw(evt){
    Commondraw(evt)
    var s="M "+oldX+" "+oldY+" "+(X)+" "+oldY+" "+(X)+" "+(Y)+" "+oldX+" "+(Y)+" z"
    newrect.setAttribute("d", s); 
    place.setAttribute("onmouseup","doneCommon(newrect)")
}

function Ellipse(x,y){
    newelli = document.createElementNS(xmlns,"ellipse");
    count++
    newelli.setAttribute("cx", x); 
    newelli.setAttribute("cy", y); 
    newelli.setAttribute("rx", 1); 
    newelli.setAttribute("ry", 1); 
    newelli.setAttribute("fill", color());
    CommonProps(newelli)
    place.setAttribute("onmousemove","Ellidraw(evt)")
    place.setAttribute("onmouseup","doneCommon(newelli)")
    first=false
}
function Ellidraw(evt){
    Commondraw(evt)
    newelli.setAttribute("cx", oldX); 
    newelli.setAttribute("cy", oldY); 
    newx=Math.abs(X-oldX)
    newy=Math.abs(Y-oldY)
    offx=oldX-X
    offy=oldY-Y
    newelli.setAttribute("cx", X) //for controllling from center
    newelli.setAttribute("cy", Y)
    newelli.setAttribute("rx", newx)
    newelli.setAttribute("ry", newy);
}
function Freehand(){
    place.setAttribute("onmousemove","Freedraw(evt)")
    startX=X
    startY=Y
    count++
    pathData=sp="M "+X+" "+Y
    newpath = svgDocument.createElement("path");
    newpath.setAttribute("d", sp)
    CommonProps(newpath)
    newpath.setAttribute("onmouseup","Freedone(newpath)")
    newpath.setAttribute("opacity", 1.0);
    newpath.setAttribute("stroke-width", "2");
    newpath.setAttribute("fill", "none");
    first=false
}

function Freedraw(evt){
    x=evt.clientX
    y=evt.clientY
    pathData+= " " + x + " " + y;
    newpath.setAttribute("d", pathData);
}

function Freedone(O){
	

    O.setAttribute("onmouseover","seepath("+count+",'over')")
    O.setAttribute("onmouseout","seepath("+count+",'out')")
    O.setAttribute("onmousedown","grab(evt,'P"+count+"')")
    place.setAttribute("onmousemove",null)

    Chosen=O
    Average(false)
    Average(false)
    //Smooth(3)
    first=true
}
function CommonProps(O){
    O.setAttribute("id", "P"+count); 
    O.setAttribute("stroke", "black");
    O.setAttribute("stroke-width", 1);
    O.setAttribute("opacity", .5);
    O.setAttribute("onmousedown","grab(evt,'P"+count+"')")
    place.appendChild(O);
}
function Commondraw(evt){
    X=evt.clientX;
    Y=evt.clientY;
    if (grid){
        X=Math.floor(X/gridsize)*gridsize+gridsize/2
        Y=Math.floor(Y/gridsize)*gridsize+gridsize/2
    }
}
var opac=.5
function seepath(c,o){
    if (!first) return
	
    if (o=='over'){
        opac=document.getElementById("P"+c).getAttribute("opacity")
        document.getElementById("P"+c).setAttribute("stroke","red")
        document.getElementById("P"+c).setAttribute("stroke-width",3)
        document.getElementById("P"+c).setAttribute("opacity",3*opac/4)
		
        //Chosen=svgDocument.getElementById("P"+c)
    }
    else{
        document.getElementById("P"+c).setAttribute("stroke","black")
        document.getElementById("P"+c).setAttribute("opacity",opac)
        document.getElementById("P"+c).setAttribute("stroke-width",1)
    }
}
function donepath(){
    EL.setAttribute("cy",-100)
    pathstring+="z"
    newpath.setAttribute("d", pathstring);
    newpath.setAttribute("fill", color());
    doneCommon(newpath)
    hidenewline()
	
}
function doneCommon(O){
    STEL.setAttribute("cy",-100)
    O.setAttribute("onmouseover","seepath("+count+",'over')")
    O.setAttribute("onmouseout","seepath("+count+",'out')")
    O.setAttribute("onmousedown","grab(evt,'P"+count+"')")
    place.setAttribute("onmousemove",null)
    Chosen=O
    ShowPts()
    first=true
}
function color(){
    var s="#"
    for(i=0;i<6;i++) s+=Math.floor(Math.random()*16).toString(16)
    return s
}
function grab(evt, U){
    if (!first) return
    Chosen=document.getElementById(U);
    GT=getTransform(Chosen)
    oldX=evt.clientX - parseInt(GT[1]);
    oldY=evt.clientY - parseInt(GT[2]);
    place.setAttribute("onmousemove", "drag(evt)");
    Chosen.setAttribute("onmouseup", "selectIt()");
    thingclicked=true
    Chosen.setAttribute("stroke-width", 3);
    Chosen.setAttribute("stroke", "green");
    ShowPts()
}
function getTransform(O){
	
    gT="translate(0,0)"
    if (O.getAttribute("transform")) {
        gT=O.getAttribute("transform");
    }
    GT=gT.split(/[,\(\)]/)
    return GT
}
function selectIt(){
    unselect()
    Chosen.setAttribute("stroke-width", 2);
    Chosen.setAttribute("stroke", "red");
    place.setAttribute("onkeyup", "keyHandle(evt)");
    place.setAttribute("onmousemove", null);
    place.setAttribute("onmousedown", null);
    selectM.setAttribute("visibility","visible")
    ShowPts()
}
function unselect(){
    var B=document.getElementById("Bounder");
    B.setAttribute("visibility", "hidden");
    Chosen.setAttribute("stroke-width", 1);
    Chosen.setAttribute("stroke", "black");
    place.setAttribute("onmousemove", null);
    place.setAttribute("onmousedown", "begin(evt)");
    selectM.setAttribute("visibility","hidden")
    WID=document.getElementById("Widgets");
    WID.setAttribute("visibility","hidden")
}
function drag(evt){
    ShowPts()
    place.setAttribute("onmouseup", "stopdrag()");
    nX=evt.clientX-oldX;
    nY=evt.clientY-oldY;
    if (grid){
        nX=Math.floor(nX/gridsize)*gridsize+gridsize/2
        nY=Math.floor(nY/gridsize)*gridsize+gridsize/2
    }
    sT="translate("+(nX)+","+(nY)+")"
    Chosen.setAttribute("transform", sT);
    if (PGon) PG.setAttribute("transform", sT);
    Chosen.setAttribute("onmouseup", null);
}
function stopdrag(){
    place.setAttribute("onmousemove", null);
    place.setAttribute("onmouseup", null);
    Chosen.setAttribute("stroke", "black");
    Chosen.setAttribute("stroke-width", "1");
    finished=false
    first=true
    unselect()
    //place.setAttribute("onkeyup", null);
    selectM.setAttribute("visibility","hidden")
}
function keyHandle(evt){
    if(evt.shiftKey) {
        alert('shiftkey was down')
    }
    k=evt.keyCode;
    qk=String.fromCharCode(k);
	
    if (evt["ctrlKey"]){alert('control key'+k);return}
    if((k==46)||(k==8)||(k==127)||(k==68)) {Delete()}//delete or backspace or "D"
    else if (k==16){'shiftkey was down'}//SHIFT KEY
    else if (k==13) {if (PGon) place.removeChild(PG)
        PGon=false;unselect()}//return key
    else SMenu(qk)
}
function Delete(){
    place.removeChild(Chosen);
    if (PGon) place.removeChild(PG)
    PGon=false
    unselect()
}
function status(){
    ST=document.getElementById("gridstatus");
    GR=document.getElementById("gridrect");
    if (grid) {
        ST.getFirstChild().nodeValue="Off"
        gridcolor="#ff8888"
        GR.setAttribute("fill", gridcolor);
        STEL.setAttribute("rx",5)
        STEL.setAttribute("ry",5)
    }
    else {
        ST.getFirstChild().nodeValue="On"
        gridcolor="#88ff88"
        GR.setAttribute("fill", gridcolor);
        STEL.setAttribute("rx",gridsize/2)
        STEL.setAttribute("ry",gridsize/2)
    }
    grid=!grid
	
}
function BuildMenus(M){
    toolR = document.getElementById("toolRectInner");
    toolR.setAttribute("height", 	20*ToolMenuItems.length)
    toolRO = document.getElementById("toolRectOuter");
    toolRO.setAttribute("height", 20*ToolMenuItems.length+4)
    for (m in M){
        if (M[m]==toolM) MenuItems=ToolMenuItems
        else if (M[m]==selectM) MenuItems=SelectMenuItems
        for (i in MenuItems){
            var MI = document.createElementNS(xmlns,"text");
            var MV=MenuItems[i].split(" ")
            var MT=document.createTextNode(MV[1]+" - "+MV[0]);
            MI.setAttribute("id","mt"+m+"_"+i)
            MI.appendChild(MT)
            MI.setAttribute("y",(18*i)+18)
            MI.setAttribute("x",5)
            if (M[m]==toolM) MI.setAttribute("onmousedown","TMenu('"+MV[2]+"')")
            else if (M[m]==selectM) MI.setAttribute("onclick","SMenu('"+MV[2]+"')")
            //MI.setAttribute("onmouseover","HiLight('mt"+m+"_"+i+"')")
            MI.setAttribute("onmouseover","document.getElementById('mt"+m+"_"+i+"').setAttribute('fill','red')")
            MI.setAttribute("onmouseout","document.getElementById('mt"+m+"_"+i+"').setAttribute('fill','black')")
            M[m].appendChild(MI);/**/
		
        }
    }
}
function SMenu(c){
    for (i in SelectMenuItems){
        MV=SelectMenuItems[i].split(" ")
        if (c==MV[2]) eval(MV[1])()
    }
}
function TMenu(c){
    var TS=document.getElementById("toolstatus")
	
    for (i in ToolMenuItems){
        MV=ToolMenuItems[i].split(" ")
        //if (c==MV[2]) svgDocument.getElementById("toolstatus").nodeValue=MV[1]
        if (c==MV[2]) {
            TS.firstChild.nodeValue=MV[1]
            toolchosen=MV[1]
        }
    }
}
function ToolsView(){
    toolM.setAttribute('visibility','visible')
    toolM.setAttribute("onmousedown","toolM.setAttribute('visibility','hidden')")
    document.getElementById('toolButton').setAttribute('fill','#88ffff')
}
function Copy(){
    var Upath=Chosen.getAttribute("d")
    count++
    newp("path")
    var CP=document.getElementById("P"+count);
    CP.setAttribute("fill",Chosen.getAttribute("fill"))
    GT=getTransform(Chosen)
    var tX=gridsize+parseInt(GT[1]);
    var tY=gridsize+parseInt(GT[2]);
    CP.setAttribute("transform","translate("+tX+","+tY+")")
    CP.setAttribute("d",Upath)
    unselect()
    doneCommon(CP)
	
}
function Flip(){
    var UP=FindPoints()
    UP.pop()
    for (i=0;i<UP.length;i++)UP[i]=parseInt(UP[i])
    var xavg=yavg=0
    for (i in UP){
        if (i%2==0) xavg+=UP[i]
        else yavg+=UP[i]
    }
    var xcenter=xavg*2/UP.length
    var ycenter=yavg*2/UP.length
    Chosen.setAttribute("transform","translate("+2*xcenter+",0) scale(-1,1) ")
    unselect()
}
function ShowPts(){
    if (PGon) return
    PGon=true
    UP=FindPoints()
    PG=document.createElementNS(xmlns,"g");
    place.appendChild(PG);
    GT=getTransform(Chosen)
    pX=parseInt(GT[1])
    pY=parseInt(GT[2])
    sT="translate("+(pX)+","+(pY)+")"
    PG.setAttribute("transform", sT);
    for (i in UP){
        if (UP[i]=="Q") continue
        if (UP[i]=="C") {return}
        if (i%2==0) rememberx=UP[i]
        else{
            var cx=eval(rememberx)
            var cy=eval(UP[i])
            var pt=Math.floor(i/2)
            var NewE=document.createElementNS(xmlns,"ellipse");
            NewE.setAttribute("stroke-width", 1);
            NewE.setAttribute("stroke", "black");
            NewE.setAttribute("fill", "green");
            NewE.setAttribute("id", "pt"+pt)
            NewE.setAttribute("cx", cx)
            NewE.setAttribute("cy", cy);
            NewE.setAttribute("rx", 4);
            NewE.setAttribute("ry", 4);
            NewE.setAttribute("onmouseover", "pointHi('"+pt+"')");
            NewE.setAttribute("onmouseout", "pointLo('"+pt+"')");
            NewE.setAttribute("onmousedown", "pointGrab('"+pt+"')");
            PG.appendChild(NewE);
        }
    }
    return UP
}
function pointHi(n){
    TP=document.getElementById("pt"+n);
    TP.setAttribute("fill", "yellow");
}
function pointLo(n){
    TP=document.getElementById("pt"+n);
    TP.setAttribute("fill", "green");
}
function STELHI(n){
    STEL.setAttribute("fill", "yellow");
}
function STELLO(n){
    STEL.setAttribute("fill", "red");
}
function pointGrab(n){
    TP=document.getElementById("pt"+n);
    place.setAttribute("onmousemove", "pointDrag(evt,'"+n+"')");
    place.setAttribute("onmousedown", "null");//new
    TP.setAttribute("fill", "cyan");
}
function pointDrag(evt,ptn){
    TP=document.getElementById("pt"+ptn);
    X=evt.clientX;
    Y=evt.clientY;
    pathstring="M "
    GT=getTransform(Chosen)
    pX=parseInt(GT[1])
    pY=parseInt(GT[2])
    X=evt.clientX -pX;
    Y=evt.clientY - pY;
    if (grid){
        X=Math.floor(X/gridsize)*gridsize+gridsize/2
        Y=Math.floor(Y/gridsize)*gridsize+gridsize/2
    }
    UP=FindPoints()
    UP[ptn*2]=X
    UP[ptn*2+1]=Y
    for (i in UP){
        pathstring+=UP[i]+" "
    }
    pathstring+="z"
    Chosen.setAttribute("d",pathstring)
    TP.setAttribute("cx", X);
    TP.setAttribute("cy", Y);
    place.setAttribute("onmouseup", "stopPointDrag(evt,"+ptn+")");
	
}
function Transform(){
    UP=FindPoints()
    if (PGon) place.removeChild(PG)
    PGon=false
    place.setAttribute("onkeyup", "keyHandle(evt)");
    xmax=0
    xmin=4000
    ymax=0
    ymin=4000
    edge=2
    for (i=0;i<UP.length;i++){
        UP[i]=parseInt(UP[i])
	
        if (i%2==0) {
            if (UP[i]>xmax) xmax=UP[i]
            if (UP[i]<xmin) xmin=UP[i]
        }
        else{
            if (UP[i]>ymax) ymax=UP[i]
            if (UP[i]<ymin) ymin=UP[i]
        }
    }
    GT=getTransform(Chosen)
    pX=parseInt(GT[1])
    pY=parseInt(GT[2])
    xmin=xmin+pX
    xmax=xmax+pX
    ymin=ymin+pY
    ymax=ymax+pY
    var B=document.getElementById("Bounder");
    B.setAttribute("visibility", "visible");
    var BIn=document.getElementById("BIn");
    var BOut=document.getElementById("BOut");
    BOut.setAttribute("x",xmin-edge)
    BOut.setAttribute("width",xmax-xmin+2*edge)
    BOut.setAttribute("y",ymin-edge)
    BOut.setAttribute("height",ymax-ymin+2*edge)
    BIn.setAttribute("x",xmin)
    BIn.setAttribute("width",xmax-xmin)
    BIn.setAttribute("y",ymin)
    BIn.setAttribute("height",ymax-ymin)
}
function Edge(){
    var BIn=document.getElementById("BIn");
    var BOut=document.getElementById("BOut");
    BOut.setAttribute("stroke","red")
}
function unEdge(){
    var BIn=document.getElementById("BIn");
    var BOut=document.getElementById("BOut");
    BOut.setAttribute("stroke","black")
}
function edgeGrab(evt){
	
    oldX=X=evt.clientX;
    oldY=Y=evt.clientY;
    le=false
    to=false
    ri=false
    bo=false
    if (X<xmin+edge) le=true
    if (Y<ymin+edge) to=true
    if (X>xmax-edge) ri=true
    if (Y>ymax-edge) bo=true
    GT=getTransform(Chosen)
    pX=parseInt(GT[1])
    pY=parseInt(GT[2])
    place.setAttribute("onmousemove","edgeDrag(evt,"+le+","+to+","+ri+","+bo+","+pX+","+pY+")")
    var BIn=document.getElementById("BIn");
    BIn.setAttribute("onmousemove","edgeDrag(evt,"+le+","+to+","+ri+","+bo+","+pX+","+pY+")")
    place.setAttribute("onmouseup", "stopEdgeDrag();")
    BIn.setAttribute("onmouseup", "stopEdgeDrag();")
}
function edgeDrag(evt,l,t,r,b,px,py){
    document.getElementById("BOut").setAttribute("stroke","blue")
    X=evt.clientX -pX;
    Y=evt.clientY -pY;
    var xs=ys=1
    var xo=yo=0
    var stranslate=xo+","+yo
    var sscale=xs+","+ys
	
    if (l) {xs=(xmax-X)/(xmax - xmin);xo=(X-xs*xmin)}//left
    if (t) {ys=(ymax-Y)/(ymax - ymin);yo=(Y-ys*ymin)} //top
    if (r) {xs=(X-xmin)/(xmax - xmin);xo=(X-xs*xmax)} //right
    if (b) {ys=(Y-ymin)/(ymax - ymin);yo=(Y-ys*ymax)}  //bottom
    stranslate=Math.ceil(xo)+","+Math.ceil(yo); 
    sscale=xs+","+ys 
	
    Chosen.setAttribute("transform","translate("+stranslate+") scale("+sscale+") ")
}
function stopEdgeDrag(evt){
    place.setAttribute("onmousemove", null);
    place.setAttribute("onmouseup", null);
    var BIn=document.getElementById("BIn");
    BIn.setAttribute("onmousemove",null)
    var B=document.getElementById("Bounder");
    B.setAttribute("visibility", "hidden");
    ApplyTransforms(Chosen)
    unselect()
}
function hide(O){
    O.setAttribute('visibility','hidden')
}
function stopPointDrag(evt,ptn){
    TP=document.getElementById("pt"+ptn);
    TP.setAttribute("fill", "green");
    pathstring="M "
    place.setAttribute("onmousedown", "begin(evt)")
    place.setAttribute("onmousemove", null);
    place.setAttribute("onmouseup", null);
}
function ApplyTransforms(O){
    Chosen=O
    TF=O.getAttribute("transform").split(" ")
    for (i in TF) eval(TF[i])
}
function translate(){
    //alert("translate"+arguments[0]+","+arguments[1])
    pathstring="M "
    for (i in R=FindPoints()) {
        if (i%2==0) R[i]=eval(R[i])+eval(arguments[0])
        else R[i]=eval(R[i])+eval(arguments[1])
        pathstring+=R[i]+" "
    }
    pathstring+="z"
    Chosen.setAttribute("d",pathstring)
	
}
function scale(){
    pathstring="M "
    for (i in R=FindPoints()) {
        if (i%2==0) R[i]=eval(R[i])*eval(arguments[0])
        else R[i]=eval(R[i])*eval(arguments[1])
        pathstring+=R[i]+" "
    }
    pathstring+="z"
    Chosen.setAttribute("d",pathstring)
    Chosen.setAttribute("transform","")
}
function rotate(){
    alert("rotate")
    alert(arguments[0])
	
}
function FindPoints(){
    var Upath=Chosen.getAttribute("d")
    var UP=Upath.split(" ")
    UP.shift()
    UP.pop()
    for (i in UP) if (UP[i]=="Q") UP.splice(i,1)
    return UP
}
function Recolor(){
    Chosen.setAttribute("fill",color())
}
function PickColor(){
    ViewWidgets()
}
function MakeGrad(central){
    globalcentral=central
    rg = document.getElementById("rhue")
    nbands=4
    band=new Array(nbands)
    colors[1]=colors[2]=central
    for (i=0;i<nbands;i++){
        band[i]=document.getElementById("ro"+i)
        band[i].setAttribute("style","stop-color: "+colors[i])
    }
}
function HSBPrep(s){
    document.getElementById(s).setAttribute("onmousemove",s+"(evt)")
}
function Hue(evt){
    X=(evt.clientX - 250)/50;
    CommonColor()
    if (middle) colstring=globalcentral
    else{
        for (i=1;i<4;i++){
            a=parseInt(RGBc[i],16)
            b=parseInt(RGB1[i],16)
            avg=Math.ceil((w1*a+w2*b)*16)
            colstring+=avg.toString(16)
        }}
    Chosen.setAttribute("fill",colstring)
}
function CommonColor(){
    RGBc=colors[1].split(/.{0}/)
    middle=false
    var w1=w2=.5
    if (X<offsets[1]){
        RGB1=colors[0].split(/.{0}/)
        w1=X/offsets[1]
        w2=1-w1
    }
    else if (X>offsets[2]){
        RGB1=colors[3].split(/.{0}/)
        w2=(X-offsets[2])/(1-offsets[2])
        w1=1-w2
    }
    else middle=true
    colstring="#"
}
function Tra(evt){
    X=(evt.clientX - 460)/50;
    CommonColor()
    if (middle) opa=.5
    else{ opa=X
    }
    Chosen.setAttribute("opacity",opa)
}
function ViewWidgets(){
    chosencolor=Chosen.getAttribute("fill")
    WID=document.getElementById("Widgets");
    WID.setAttribute("visibility","visible")
    WidT=new Array(4)
    for (i in widgnames) {
        WidT[i]=document.getElementById(widgnames[i]);
        if (i==0) WidT[i].setAttribute("fill","url(#rhue)");
        else WidT[i].setAttribute("fill",chosencolor);
    }
	
    MakeGrad(chosencolor)
}
function HideWidgets(){
    WID=document.getElementById("Widgets");
    WID.setAttribute("visibility","hidden")
}
function Average(closepath){
    UP=FindPoints()
    pathstring="M "
    for (i=0;i<UP.length;i++){
        UP[i]=parseInt(UP[i])
        if (i%4==0) rx=UP[i]
        if (i%4==1) ry=UP[i]
        if (i%4==2) pathstring+=(eval(UP[i])+eval(rx))/2+" "
        if (i%4==3) pathstring+=(eval(UP[i])+eval(ry))/2+" "
    }
    if (closepath) pathstring+="z"
    Chosen.setAttribute("d",pathstring)
    pathstring="M "
    unselect()
}
function Smooth(){
    UP=FindPoints()
    for (i=0;i<UP.length;i++)UP[i]=parseInt(UP[i])
    var x1=UP[0]
    var y1=UP[1]
    var x2=UP[2]
    var y2=UP[3]
    var x3=xn=UP[UP.length-2]
    var y3=yn=UP[UP.length-1]
    smx=midx1=(x1+x2)/2
    smy=midy1=(y1+y2)/2
    nmx=(x1+xn)/2
    nmy=(y1+yn)/2
    pathstring="M "+nmx+" "+nmy+" Q "+x1+" "+y1+" "+midx1+" "+midy1
    for (i=4;i<UP.length-1;i+=2){
        x3=UP[i]
        y3=UP[i+1]
        midx1=(x2+x1)/2
        midy1=(y2+y1)/2
        midx2=(x2+x3)/2
        midy2=(y2+y3)/2
        pathstring+=" Q "+x2+" "+y2+" "+midx2+" "+midy2
        x1=x2
        y1=y2
        x2=x3
        y2=y3
    }
    pathstring+=" Q "+xn+" "+yn+" "+nmx+" "+nmy
    pathstring+=" z"
    Chosen.setAttribute("d",pathstring)
    pathstring="M "
    unselect()
}
function Fix(){
    var id=Chosen.getAttribute("id")
    unselect()
    Chosen.setAttribute("stroke","none")
    Chosen.setAttribute("onmouseup", "rearm('"+id+"')");
    Chosen.setAttribute("onmouseover", null);
    Chosen.setAttribute("onmouseout", null);
    Chosen.setAttribute("onmousedown", null);
}
function rearm(id){
    Q=document.getElementById(id);
    Q.setAttribute("stroke","black")
    Q.setAttribute("onmousedown","unFix("+Q+")")
}
function unFix(id){
    Q=document.getElementById(id);
    Q.setAttribute("stroke","black")
    Q.setAttribute("onmousedown","grab(evt,"+Q+")")
    Q.setAttribute("onmouseover", null);
    Q.setAttribute("onmouseout", null);
}
function ViewSrc(){
    //if this SVG page has been embedded in an HTML document, then the scripts of
    //that document will have rewritten the "x" attribute of the object named "R" as
    //a signal that its (more complete) I/O apparatus may be accessed.
    //for running the SVG document in stand-alone mode, the simpler self-contained 
    //function, "ViewSrcLivesInSVG()",  is invoked
    HTML=document.getElementById("R");
    HTMLpresent=HTML.getAttribute("x")
    if(HTMLpresent==0)	top.ViewSource(Chosen)
    else ViewSrcLivesInSVG()
}
function ViewSrcLivesInSVG(){
    if(Chosen.nodeName!="path") return
    s="<path "
    var attr=Chosen.attributes
    for (i=0; i<attr.length; i++){ 
        s+=attr.item(i).name + " = \"" + attr.item(i).value + "\" "
    }
    s+="/\>"
    alert(s)
    return s
	
}
//function Bezier(){alert('bezier')}
armed=true;
finished=false
first=true
function Bezier(){
    place.setAttribute("onmouseup","doneplace(evt)" )
    place.setAttribute("onmousedown","army(evt)" )
    place.setAttribute("onmousemove","Bdraw(evt)")
    STEL.setAttribute("onmousemove","Bdraw(evt)")
    a0X=startX=X
    a0Y=startY=Y
    A[0]=a0X+" "+a0Y
    count++
    sp="M "+X+" "+Y
    newcurve.setAttribute("d", sp)
    newpath = document.createElementNS(xmlns,"path");
    CommonProps(newpath)
    newpath.setAttribute("fill", "none");
    oldstX=X
    oldstY=Y
    oldX=X
    oldY=Y
    STEL.setAttribute("cx", X); 
    STEL.setAttribute("cy", Y); 
    STEL.setAttribute("onmousedown", "finish(evt)")
    first=false
}
function doneplace(){
    if(finished) return
    s="M "+A[0]
    sq=" C "+" "+oldstX+" "+oldstY+" "+stX+" "+stY+" "+startX+" "+startY
    if (A.length==1) sq=" Q "+" "+oldstX+" "+oldstY+" "+startX+" "+startY
    A.push(sq)
    for (i=1;i<A.length;i++){
        s+=A[i]
    }
    newpath.setAttribute("d", s);
    oldX=startX
    oldY=startY
    oldstX=X
    oldstY=Y
    armed=false
}
function Bdraw(evt){
    if (!armed) {
        return
    }
    X=evt.clientX;
    Y=evt.clientY;
    stX=2*startX-X
    stY=2*startY-Y
    asX=2*a0X-X
    asY=2*a0Y-Y
    newline.setAttribute("x1", stX); 
    newline.setAttribute("y1", stY); 
    newline.setAttribute("x2", X); 
    newline.setAttribute("y2", Y); 
    sp="M "+oldX+" "+oldY+" C "+" "+oldstX+" "+oldstY+" "+stX+" "+stY+" "+startX+" "+startY+" Q "+X+" "+Y+" "+A[0]
    newcurve.setAttribute("d",sp)
	
}
function Bstopdrag(U){
    L=document.getElementById(U);
    place.setAttribute("onmousemove", "Bdraw(evt)");
    place.setAttribute("onmouseup", "doneplace(evt)");
    L.setAttribute("fill",color())
    L.setAttribute("stroke", "black");
    L.setAttribute("stroke-width", "1");
    finished=false
    first=true
    sp=""
    A=new Array()
}
function army(evt){
    if (finished) return
    startX=evt.clientX;
    startY=evt.clientY;
    if (first) begin(evt) 
    else{
        EL.setAttribute("cx", startX); 
        EL.setAttribute("cy", startY); 
    }
    armed=true;
}
function finish(evt){
    finished=true
    place.setAttribute("onmousemove", "lastcurve(evt)");
    place.setAttribute("onmouseup", "lastfinish()");
}
function lastcurve(evt){
    X=evt.clientX;
    Y=evt.clientY;
    staX=2*a0X-X
    staY=2*a0Y-Y
    EL.setAttribute("cx", staX); 
    EL.setAttribute("cy", staY); 
    A1=A[1].split(" ")
    newline.setAttribute("x1", staX); 
    newline.setAttribute("y1", staY); 
    newline.setAttribute("x2", X); 
    newline.setAttribute("y2", Y); 
    var spT="M "+oldX+" "+oldY+" C "+oldstX+" "+oldstY+" "+staX+" "+staY+" "+a0X+" "+a0Y
    sp="C "+oldstX+" "+oldstY+" "+staX+" "+staY+" "+a0X+" "+a0Y
    newcurve.setAttribute("d",spT)
}
function lastfinish(){
    s="M "+A[0]
    for (i=1;i!=A.length;i++) s+=A[i]
    s+=sp
    newpath.setAttribute("d", s);
    STEL.setAttribute("onmousedown","donepath()")
    EL.setAttribute("cy", -100); 
    newline.setAttribute("x1", -100); 
    newline.setAttribute("y1", -100); 
    newline.setAttribute("x2", -100); 
    newline.setAttribute("y2", -100); 
    newcurve.setAttribute("d","M -1 -1 -1 -1")
    Bstopdrag("P"+count)
    place.setAttribute("onmouseup", "doneplace(evt)");
    doneCommon(newpath)
}
function doneCommon(O){
    STEL.setAttribute("cy",-100)
    O.setAttribute("onmouseover","seepath("+count+",'over')")
    O.setAttribute("onmouseout","seepath("+count+",'out')")
    O.setAttribute("onmousedown","grab(evt,'P"+count+"')")
    place.setAttribute("onmousemove",null)
    Chosen=O
    ShowPts()
    first=true
}
function exportFull(){
    var tempString=""
    var newOut=""
    SVGRoot=svgDocument.documentElement.getElementById("place")
    stringEx="<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>"
    for (i=0;i<SVGRoot.childNodes.length;i++){
        if ((SVGRoot.childNodes.item(i).id)&&
            (SVGRoot.childNodes.item(i).id!="bigR")&&
            (SVGRoot.childNodes.item(i).id!="EL")&&
            (SVGRoot.childNodes.item(i).id!="L")&&
            (SVGRoot.childNodes.item(i).id!="C")){
            var attr=SVGRoot.childNodes.item(i).attributes
            stringEx+="<"+SVGRoot.childNodes.item(i).nodeName+" "
            for (j=0; j<attr.length; j++){ 
                if (attr.item(j).name.substring(0,2)!="on")
                    stringEx+=attr.item(j).name + " = \"" + attr.item(j).value + "\" "
            }
            stringEx+=" /\>"
        }
    }
    stringEx+="</svg>"
    top.doit(stringEx);
		
}
var SelectMenuItems=new Array("a Average A","c Copy C", "d Delete D", "f Flip F", "p PickColor P","r Recolor R", "s Smooth S", "t Transform T","u unselect U","v ViewSrc V","x Fix X")
var ToolMenuItems=new Array("r Rectangle R", "b Bezier B", "e Ellipse E", "f Freehand F", "n Ngon N", "p Polyline P", "s Star S","x Xolygon X")
//note: menu items are of the form    v Command k
//Command is the function to be run
//v is the description of the keyboard shortcut given to the user
//k is the keycode associated with the keystroke
//]]>
</script>
<defs id="DEF">
<linearGradient id="rhue" x1="0" x2="50" y1="0" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0" id="ro0" style="stop-color: red"/>
<stop offset=".45" id="ro1" style="stop-color: blue"/>
<stop offset=".55" id="ro2" style="stop-color: red"/>
<stop offset="1" id="ro3" style="stop-color: blue"/>
</linearGradient>
</defs>
<g id="place" onmousedown="begin(evt);">
<rect id="bigR" x="0" y="0" width="100%" height="100%" fill="#ffe" />
<ellipse id="EL" cx="400" cy="-100" rx="3" ry="3" stroke="black" stroke-width="1" fill="green"></ellipse>
</g>
<ellipse id="STEL" cx="400" cy="-100" rx="5" ry="5" stroke="black" onmouseover="STELHI()" onmouseout="STELLO()" onmousedown="donepath()" stroke-width="1" fill="red"></ellipse>
<g id="menubar">
<rect x="0" y="0" width="100%" height="22" fill="#ddd" stroke="black" stroke-width="1" />
<text x="350" y="15">Click below to draw</text>
<g id="gridgroup">
<rect 
id="gridrect" x="35" y="0" width="40" height="20" fill="#FF8888" 
stroke="black" stroke-width="2" onclick="status()" 
onmouseover="document.getElementById('gridrect').setAttribute('fill','#ffff88')"
onmouseout="document.getElementById('gridrect').setAttribute('fill',gridcolor)"
/>
<text x="8" y="15">Grid</text>
<text id="gridstatus" x="45" y="15" onclick="status()"
onmouseover="document.getElementById('gridrect').setAttribute('fill','#ffff88')"
onmouseout="document.getElementById('gridrect').setAttribute('fill',gridcolor)"
>
Off</text>
</g>
<g id="selectM" visibility="hidden">
<rect x="0" y="0" width="90" height="250" fill="#eee" stroke="black" stroke-width="2"/>
</g>
<g id="toolgroup" transform="translate(85,0)">
<rect id="toolButton" x="40" y="0" width="65" height="20" onmousedown="ToolsView()"
onmouseover="document.getElementById('toolButton').setAttribute('fill','#ffff88')"
onmouseout="document.getElementById('toolButton').setAttribute('fill','#88ffff')"
fill="#88ffff" stroke="black" stroke-width="2"/>
<text x="8" y="15">Tool</text>
<text id="toolstatus" x="45" y="15" 
onmouseover="document.getElementById('toolButton').setAttribute('fill','#ffff88')"
onmouseout="document.getElementById('toolButton').setAttribute('fill','#88ffff')"
onmousedown="ToolsView()">Rectangle</text>
<g id="toolM" visibility="hidden">
<rect id="toolRectOuter" x="0" y="0" width="94" height="144" stroke="black" stroke-width="1"
fill="#ddd" onmouseout="hide(toolM)"/>
<rect id="toolRectInner" x="4" y="0" width="86" height="140" 
fill="#eee"/>
</g>
</g>
</g>
<g id="Bounder" visibility="hidden">
<rect id="BOut" x="4" y="0" width="86" height="140" 
fill="none" opacity=".4" stroke="black" stroke-width="5" 
onmouseover="Edge()" onmouseout="unEdge()" onmousedown="edgeGrab(evt)"/>
<rect id="BIn" x="0" y="0" width="94" height="144" stroke="black" stroke-width="1"
fill="#ddf" opacity=".1"/>
</g>
<g id="Widgets" visibility="hidden">
<g id="ColGrads" transform="translate(250,2)">
	<text x="-10" y="15">H</text>
	<rect id="Hue" x="0" y="0" width="50" height="18" fill="#f00" onmouseover="HSBPrep('Hue')"/>
	<text x="60" y="15">S</text>
	<rect id="Sat" x="70" y="0" width="50" height="18" fill="#f00" onmouseover="HSBPrep('Sat')"/>
	<text x="130" y="15">B</text>
	<rect id="Bri" x="140" y="0" width="50" height="18" fill="#f00" onmouseover="HSBPrep('Bri')"/>
	<text x="200" y="15">T</text>
	<rect id="Tra" x="210" y="0" width="50" height="18" fill="#f00" onmouseover="HSBPrep('Tra')"/>
	<g id="closebutton" transform="translate(270,6)">
		<rect x="0" y="0" width="15" height="10" stroke="#888800" stroke-width="2"
fill="#fdd" onclick="HideWidgets()"/>
<line x1="0" y1="0" x2="15" y2="10" stroke="#888800" stroke-width="2" onclick="HideWidgets()"/>
<line x1="15" y1="0" x2="0" y2="10" stroke="#888800" stroke-width="2" onclick="HideWidgets()"/>
</g>
</g>
</g>
<g onclick="top.about()">
<ellipse cx="700" cy="11" rx="10" ry="10" stroke="black" stroke-width="2" fill="yellow"/>
<text x="700" y="17" font-size="16" pointer-events="none" text-anchor="middle">?</text>
</g>
<g transform="translate(620,0)">
	<rect id="expButton" x="0" y="0" rx="5" width="60" height="20" onclick="exportFull()"
onmouseover="svgDocument.getElementById('expButton').setAttribute('fill','#ffff88')"
onmouseout="svgDocument.getElementById('expButton').setAttribute('fill','pink')"
fill="pink" stroke="black" stroke-width="2"/>
<text x="30" y="15" pointer-events="none" text-anchor="middle">Export</text>
</g>
<rect id="R" x="100" y="-100" width="4" height="4" fill="#f00" />
</svg>
