var nodeAmount = 0;

var nodelist = {
  "perlin":{
    "name":"perlin",
    "inputs":5,
    "outputs":3
  },
  "simplex":{
    "name":"simplex",
    "inputs":2,
    "outputs":1
  }
};


jsPlumb.bind("ready", function() {

  // your jsPlumb related init code goes here
  jsPlumb.setContainer("conteneur");

});

function createNode(nodeType){
  // TODO : Avoid calling that every time, also, improve code.
  // For testing only

  console.log(nodelist)

  var data = nodelist[nodeType];

  // Todo : Check node exists

  console.log(data);

  jsPlumb.setContainer("conteneur");


  var headersize = 30;
  var rowsize = 20;
  var totalsize = headersize + rowsize * (data.inputs + data.outputs)

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


  // Create inputs
  for(var i = 0 ; i < data.inputs ; i++){
    // Create the row
    var e = div.append("div")
        .attr("class","noderow")
        .style("height",rowsize + "px")
        .style("width","100%")
        //.append("p")
        // /.text("input");

    if((i % 2) == 0){
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
      anchor:[ 0, relpos, -1, 0 ]
    });
  }

  // Create outputs
  for(var i = 0 ; i < data.outputs ; i++){
    // Create the row
    var e = div.append("div")
        .attr("class","noderow")
        .style("height",rowsize + "px")
        .style("width","100%")
        //.append("p")
        // /.text("input");

    if((i % 2) == 1){
      e.style("background","black")
    }


    var abspos = headersize + rowsize * (i + data.inputs) + rowsize/2;

    var relpos = abspos / totalsize;

    jsPlumb.addEndpoint(div.attr("id"), {
      endpoint:[ "Dot", { radius:5 } ],
      isSource:true,
      isTarget:true,
      radius: 5,
      anchor:[1 , relpos, 1, 0 ]
    });
  }

  nodeAmount++;
}
