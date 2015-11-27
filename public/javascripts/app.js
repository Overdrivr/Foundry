
// create the zoom listener
var zoomListener = d3.behavior.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomHandler);

// function for handling zoom event
function zoomHandler() {
  d3.select(this).select("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// create the svg
var master = d3.select("#tree-body").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .call(zoomListener)
          .append("g")
          .attr("transform","translate(0,0) scale(1)");


// Node creation
var nodedrag = d3.behavior.drag();
nodedrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();
  })
  .on("drag",function(){
    var prex = parseInt(d3.select(this).attr("x"),10);
    var prey = parseInt(d3.select(this).attr("y"),10);
    d3.select(this)
      .attr("x",d3.event.dx + prex)
      .attr("y",d3.event.dy + prey);
    d3.select(this)
      .attr("transform","translate("+prex+","+prey+")");
  })
  .on("dragend",function(){
  })

var node1 = master.append("g")
              .attr("x",10)
              .attr("y",20)
              .call(nodedrag);

node1.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa")


var node2 = master.append("g")
        .attr("x",60)
        .attr("y",80)
        .call(nodedrag)

node2.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa");

// Anchor creation
var anchordrag = d3.behavior.drag();

anchordrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();

    var x = d3.select(this).attr("cx");
    var y = d3.select(this).attr("cy");

    coords = getTransformedCoords(x,y,this.getCTM());
    console.log(coords.x, coords.y);

    currentpath = master.append("path")
      .attr("d","M"+coords.x+" "+coords.y+" L"+coords.x+" "+coords.y)
      .attr("startx",coords.x)
      .attr("starty",coords.y)
      .style("stroke","red")
      .style("stroke-width","2")
      .style("fill","none");
  })
  .on("drag",function(){


    var x = d3.mouse(this)[0];
    var y = d3.mouse(this)[1];

    coords = getTransformedCoords(x,y,this.getCTM());

    // temporary
    var currentpath = master.select("path");


    var startx = currentpath.attr("startx");
    var starty = currentpath.attr("starty");
    currentpath
      .attr("d","M"+ startx + " " + starty + " L" + coords.x + " " + coords.y)


    //console.log("movetanchor");
  })
  .on("dragend",function(){
    //console.log("endanchor");
    // Find if there is another anchor at this point
  })

node1.append("circle")
    .attr("cx",6)
    .attr("cy",6)
    .attr("r", 8)
    .style("fill","#aea")
    .call(anchordrag)

// The magic function.
function getTransformedCoords(x, y, ctm) {
    var xn = ctm.e + x * ctm.a;
    var yn = ctm.f + y * ctm.d;
    return { x: xn, y: yn };
}
