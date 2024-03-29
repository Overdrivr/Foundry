// Create first node
var nodex = 10;
var nodey = 20;
var nodeids = 0;

var perlin = {
  "title": "perlin",
  "inputs":{
    "coords":"float,float",
    "scale":"float"
  },
  "outputs":{
    "density":"float"
  }
};

var simplex = {
  "title": "simplex",
  "inputs":{
    "coords":"float,float",
    "scale":"float"
  },
  "outputs":{
    "density":"float"
  }
};

var preview = {
  "title": "preview",
  "inputs":{
    "color":"color",
    "coords":"float,float"
  },
  "outputs":{
  }
};

 /*
  * Create "preview" node
  *
  */

function addNode_preview(master){
  var n = appendNode(master,preview);
  n.append("image")
      .attr("xlink:href","https://raw.githubusercontent.com/Overdrivr/ZNoise/master/example-images/simplex2d.bmp")
      .attr("x", 1)
      .attr("y", 90)
      .attr("height","84px")
      .attr("width","118px");
}

/*
 * Create "perlin" node
 *
 */
function addNode_perlin(master){
 var n = appendNode(master,perlin);
 }

 /*
  * Create "perlin" node
  *
  */
 function addNode_perlin(master){
  var n = appendNode(master,perlin);
  }

 /*
  *  Node creation function
  *
  *
  */
// TODO : Create function object with closures and internal properties
function appendNode(parent, config){
  //console.log(Object.keys(config.inputs).length)
  var nodewidth = 120;
  var nodeheight = 180;
  var vpadding = 3;
  var IOy = 20;
  // Create the g
  var n = parent.append("g");

  n.attr("x",nodex)
    .attr("y",nodey)
    .attr("id",nodeids++)
    .attr("transform","translate("+ nodex +","+ nodey +")")
    .call(nodedrag);
  // Append background
  n.append("rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width", nodewidth)
      .attr("height", nodeheight)
      .style("fill","#aaa");

  /// HEADER ///
  // Add title
  var title = n.append("text")
      .attr("font-family","Roboto")
      .attr("text-anchor","middle")
      .attr("font-size",20)
      .text(config.title);
  // Compute title size
  var dimensions = title[0][0].getBBox();

  var headerheight = dimensions.height;

  title
    .attr("x", nodewidth/2)
    .attr("y",dimensions.height * 0.75)

  /// IOs ///
  // Compute IOs size
  var inputAmount = Object.keys(config.inputs).length;
  var outputAmount = Object.keys(config.outputs).length;

  var IOheight = (Math.max(inputAmount,outputAmount) + 1) * IOy;

  // Place IO anchors
  var type = [];
  type['isInput'] = true;
  var i = 1;

  // inputs
  for (var key in config.inputs) {
    if (!config.inputs.hasOwnProperty(key)) {
        continue;
    }

    var x = 0;
    var y = dimensions.height + vpadding + i * IOy;
    i++;
    addAnchor(n,x,y,key,type);
  }

  // outputs
  type['isInput'] = false;
  i = 1;
  for (var key in config.outputs) {
    if (!config.outputs.hasOwnProperty(key)) {
        continue;
    }

    var x = nodewidth;
    var y = dimensions.height + vpadding + i * IOy;
    i++;
    addAnchor(n,x,y,key,type);
  }
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
