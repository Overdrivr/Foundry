
// create the zoom listener
var zoomListener = d3.behavior.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomHandler);

// function for handling zoom event
function zoomHandler() {
  d3.select(this).select("g")
    .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// create the svg
var container = d3.select("#tree-body").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .call(zoomListener)
            .append("g")
            .attr("x",0)
            .attr("y",0);

var master = container.append("svg")
                  .attr("overflow","visible");


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

// Create first node
var nodex = 10;
var nodey = 20;

var node1 = master.append("g")
              .attr("x",nodex)
              .attr("y",nodey)
              .attr("transform","translate("+ nodex +","+ nodey +")")
              .call(nodedrag);

node1.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa")


// Create second node
nodex = 100;
nodey = 160;
var node2 = master.append("g")
        .attr("x",nodex)
        .attr("y",nodey)
        .attr("transform","translate("+ nodex +","+ nodey +")")
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
    //console.log(coords.x, coords.y);

    currentpath = master.append("path")
      .attr("d","M"+coords.x+" "+coords.y+" L"+coords.x+" "+coords.y)
      .attr("startx",coords.x)
      .attr("starty",coords.y)
      .style("stroke","red")
      .style("stroke-width","2")
      .style("fill","none");
  })
  .on("drag",function(){


    var x = d3.mouse(this.parentNode.parentNode)[0];
    var y = d3.mouse(this.parentNode.parentNode)[1];
    //console.log(x,y)

    //coords = getTransformedCoords(x,y,this.getCTM());

    // TODO: temporary
    var currentpath = master.select("path");


    var startx = currentpath.attr("startx");
    var starty = currentpath.attr("starty");
    currentpath
      .attr("d","M"+ startx + " " + starty + " L" + x + " " + y)


    //console.log("movetanchor");
  })
  .on("dragend",function(){
    var x = d3.mouse(this)[0];
    var y = d3.mouse(this)[1];

    var ctm = this.getCTM();
    // Convert mouse release coordinates to nearest <svg>
    coords = getTransformedCoords(x,y,ctm);

    // List of connection candidates
    var selectedAnchors = []

    // Select all anchors
    var anchors = d3.selectAll(".anchor");

    // TODO : Except the start anchor

    // Check if released mouse position is within an anchor
    anchors.each(function(){
      // Convert anchor position relative to nearest <svg>
      ctm = this.parentNode.getCTM();
      c = getTransformedCoords(d3.select(this).attr("cx"),d3.select(this).attr("cy"),ctm);
      // Compute mouse release distance to anchor
      var d = distanceToAnchor(coords.x,coords.y,c.x,c.y)

      // Found a connection anchor candidate
      if(d <= d3.select(this).attr("r")) {
        selectedAnchors.push(d3.select(this));
      }
    });

    // Check if at least one anchor was found
    if(selectedAnchors.length > 0){
      // Connection established !
      console.log("Connection established.");
    }
    else {
      // Destroy path
      console.log("Connection failed.")
      // TODO: temporary
      var currentpath = master.select("path").remove();
    }
  })


node1.append("circle")
    .attr("class","anchor")
    .attr("cx",6)
    .attr("cy",6)
    .attr("r", 8)
    .style("fill","#aea")
    .call(anchordrag)

node2.append("circle")
    .attr("class","anchor")
    .attr("cx",6)
    .attr("cy",24)
    .attr("r", 8)
    .style("fill","#aea")
    .call(anchordrag)

function getTransformedCoords(x, y, ctm) {
    var xn = x * ctm.a + y * ctm.c + ctm.e;
    var yn = x * ctm.b + y * ctm.d + ctm.f;
    return {
      x: xn,
      y: yn
    };
}

function distanceToAnchor(x,y,cx,cy){
  return Math.sqrt((cx - x)*(cx - x) + (cy - y)*(cy - y));
}
