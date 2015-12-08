var d3 = require("./../d3/d3.js");
var tools = require("../tools.js");

// Anchor creation
var anchordrag = d3.behavior.drag();
var currentConnectionId = -1;
var connections = [];
var anchorids = 0;
var connectionids = 0;

module.exports = {
  add: function(node, x, y, name, type){
    var radius = 8;
    node.append("circle")
              .attr("class","anchor")
              .attr("cx",x)
              .attr("cy",y)
              .attr("r", radius)
              .attr("id",anchorids++)
              .style("fill","#aea")
              .call(anchordrag);

    t = node.append("text")
              .text(name);

    var textlength = t[0][0].getComputedTextLength();
    var xoffset = type.isInput ? 10 : - textlength - 10;
    var yoffset = radius / 2;

    t.attr("x", x + xoffset)
     .attr("y", y + yoffset);
  }
}

// Anchor behaviors
anchordrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();

    var x = d3.select(this).attr("cx");
    var y = d3.select(this).attr("cy");

    coords = tools.getTransformedCoords(x,y,this.getCTM());

    currentConnectionId = connectionids;

    currentpath = d3.select("svg#master").append("path")
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
    var currentpath = d3.select("#P" + currentConnectionId + "");

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
    coords = tools.getTransformedCoords(x,y,ctm);

    // Select currently dragged path
    var currentpath = d3.select("#P" + currentConnectionId + "");

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
      c = tools.getTransformedCoords(d3.select(this).attr("cx"),d3.select(this).attr("cy"),ctm);
      // Compute mouse release distance to anchor
      var d = tools.dst(coords.x,coords.y,c.x,c.y)

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
