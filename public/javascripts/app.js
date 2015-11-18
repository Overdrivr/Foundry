jsPlumb.bind("ready", function() {

  // your jsPlumb related init code goes here
  jsPlumb.setContainer("conteneur");

});

var nodeAmount = 0;

function createNode(){
  jsPlumb.setContainer("conteneur");
  var data = {
    inputs:5,
    outputs:3
  }

  var headersize = 30;
  var rowsize = 20;
  var totalsize = headersize + rowsize * (data.inputs + data.outputs)
  console.log(totalsize);
  var body = d3.select("div.cont");
  var div = body.append("div")
              .attr("class","item")
              .attr("id","node" + nodeAmount)
              .style("height",totalsize + "px")
              .style("width", "80px");
  var header = div.append("div")
                .style("height",headersize)
                .append("p")
                .text("Perlin2D");

              div.append("hr");

  console.log(div);

  jsPlumb.draggable(div.attr("id"));
  jsPlumb.addEndpoint(div.attr("id"), {
  endpoint:"Dot",
  isSource:true,
  isTarget:true,
  anchor:[ 1, 0.8, 1, 0 ]
  //anchor:[ "Right", { shape:"Square" } ]
});
  nodeAmount++;
}
