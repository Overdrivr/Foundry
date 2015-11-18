jsPlumb.bind("ready", function() {

  // your jsPlumb related init code goes here
  jsPlumb.setContainer("conteneur");

  jsPlumb.draggable("item_left");
  jsPlumb.draggable("item_right");

  jsPlumb.addEndpoint("item_left", {
  endpoint:"Dot",
  isSource:true,
  isTarget:true,
  anchor:[ 1, 0.8, 1, 0 ]
  });


});

var nodeAmount = 0;

function createNode(){
  jsPlumb.setContainer("conteneur");
  var data = {
    inputs:5,
    outputs:3
  }

  var body = d3.select("div.cont");
  console.log(body)
  var div = body.append("div")
              .attr("class","item")
              .attr("id","toto");

      div.append("p")
        .text("Hey")

  console.log(div);

  jsPlumb.draggable("toto");
  jsPlumb.addEndpoint("toto", {
  endpoint:"Dot",
  isSource:true,
  isTarget:true,
  anchor:[ "Left", { shape:"Square" } ]
});
  nodeAmount++;
}
