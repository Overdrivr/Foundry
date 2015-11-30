
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
    var x = parseInt(d3.select(this).attr("x"),10) + d3.event.dx;
    var y = parseInt(d3.select(this).attr("y"),10) + d3.event.dy;
    var node = d3.select(this)
      .attr("x", x)
      .attr("y", y)
      .attr("transform","translate("+x+","+y+")");

    // Select all anchors associated with this node
    var anchors = node.selectAll(".anchor");

    // Select all associated connections
    anchors.each(function(){
      c = getTransformedCoords(d3.select(this).attr("cx"),d3.select(this).attr("cy"),this.getCTM());
      // Start anchors
      var connectionsToUpdate = master.selectAll("path[startanchor='"+d3.select(this).attr("id")+"']")
                .each(function(){
                    // Update connections to match the new dragged position
                    var segments = this.pathSegList;
                    segments.getItem(0).x = c.x;
                    segments.getItem(0).y = c.y;
                });
      // End anchors
      var connectionsToUpdate = master.selectAll("path[endanchor='"+d3.select(this).attr("id")+"']")
                .each(function(){
                    // Update connections to match the new dragged position
                    var segments = this.pathSegList;
                    // TODO: Index -1 ?
                    segments.getItem(1).x = c.x;
                    segments.getItem(1).y = c.y;
                });
    });
  })
  .on("dragend",function(){
  })

// Create first node
var nodex = 10;
var nodey = 20;
var nodeids = 0;
var anchorids = 0;
var connectionids = 0;

var node1 = master.append("g")
              .attr("x",nodex)
              .attr("y",nodey)
              .attr("id",nodeids++)
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
        .attr("id",nodeids++)
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
var currentConnectionId = -1;
var connections = [];

anchordrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();

    var x = d3.select(this).attr("cx");
    var y = d3.select(this).attr("cy");

    coords = getTransformedCoords(x,y,this.getCTM());

    currentConnectionId = connectionids;

    currentpath = master.append("path")
      .attr("startanchor",d3.select(this).attr("id"))
      .attr("id","P" + connectionids++)
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

    // Select currently dragged path
    var currentpath = master.select("#P" + currentConnectionId + "");

    if(currentpath[0][0] == null){
      console.error("on drag : Current path with id #P"+currentConnectionId+" not found.");
      return;
    }

    var startx = currentpath.attr("startx");
    var starty = currentpath.attr("starty");
    currentpath
      .attr("d","M"+ startx + " " + starty + " L" + x + " " + y);


  })
  .on("dragend",function(){
    var x = d3.mouse(this)[0];
    var y = d3.mouse(this)[1];

    var ctm = this.getCTM();
    // Convert mouse release coordinates to nearest <svg>
    coords = getTransformedCoords(x,y,ctm);

    // Select currently dragged path
    var currentpath = master.select("#P" + currentConnectionId + "");

    if(currentpath[0][0] == null){
      console.error("on dragend : Current path with id #P"+currentConnectionId+" not found.");
      return;
    }

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
      console.log(selectedAnchors)
      currentpath.attr("endanchor",selectedAnchors[0].attr("id"))
    }
    else {
      // Drag did not end close enough to an anchor, so remove path
      currentpath.remove();
    }

    currentConnectionId = -1;
  })


node1.append("circle")
    .attr("class","anchor")
    .attr("cx",6)
    .attr("cy",6)
    .attr("r", 8)
    .attr("id",anchorids++)
    .style("fill","#aea")
    .call(anchordrag)

node2.append("circle")
    .attr("class","anchor")
    .attr("cx",6)
    .attr("cy",24)
    .attr("r", 8)
    .attr("id",anchorids++)
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
