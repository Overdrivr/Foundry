// Create first node
var nodex = 10;
var nodey = 20;
var nodeids = 0;

 /*
  *  Node creation function
  *
  *
  */
function appendNode(parent, config){
  console.log(Object.keys(config.inputs).length)

  var n = parent.append("g");
  
  n.attr("x",nodex)
    .attr("y",nodey)
    .attr("id",nodeids++)
    .attr("transform","translate("+ nodex +","+ nodey +")")
    .call(nodedrag);

  n.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width", 60)
      .attr("height", 80)
      .style("fill","#aaa");

  return n;
}

/*
 *  Node behavior definition
 *
 *
 */

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
