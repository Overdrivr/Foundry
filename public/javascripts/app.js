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

  // Create node
  var div = body.append("div")
              .attr("class","item")
              .attr("id","node" + nodeAmount)
              .style("height",totalsize + "px")
              .style("width", "80px");
  // Make the node draggable
  jsPlumb.draggable(div.attr("id"));
  // Create header
  var header = div.append("div")
                .attr("class","nodetitle")
                .style("height",headersize + "px")
                //.append("p")
                //.text("Perlin2D");


  // Create each row
  for(var i = 0 ; i < data.inputs ; i++){
    // Create the row
    var e = div.append("div")
        .attr("class","noderow")
        .style("height",rowsize + "px")
        .style("width","100%")
        //.append("p")
        // /.text("input");

    if(i == 0 || i == 2 || i == 4 || i == 6){
      e.style("background","black")
    }


    var abspos = headersize + rowsize * i + rowsize/2;

    var relpos = abspos / totalsize;
    console.log(i,abspos)

    jsPlumb.addEndpoint(div.attr("id"), {
    endpoint:[ "Dot", { radius:5 } ],
    isSource:true,
    isTarget:true,
    radius: 5,
    anchor:[ 1, relpos, 1, 0 ]
  });

  }

  //anchor:[ "Right", { shape:"Square" } ]

  nodeAmount++;
}
