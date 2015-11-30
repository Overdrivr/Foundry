// Anchor creation
var anchordrag = d3.behavior.drag();
var currentConnectionId = -1;
var connections = [];

function addAnchor(node, config){
  node.append("circle")
        .attr("class","anchor")
        .attr("cx",6)
        .attr("cy",6)
        .attr("r", 8)
        .attr("id",anchorids++)
        .style("fill","#aea")
        .call(anchordrag);
  return node;
}

// Anchor behaviors
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
