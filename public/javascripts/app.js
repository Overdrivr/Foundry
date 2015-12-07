var d3 = require("./d3/d3.js");
var nodegraph = require("./nodegraph-ui/nodes.js");

// create the zoom listener
var zoomListener = d3.behavior.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomHandler);

// function for handling zoom event
function zoomHandler() {
  d3.select(this).select("g")
    .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// select the svg
var container = d3.select("#node-editor-container")
            //.attr("width","300px")
            //.attr("height","300px")
            //.attr("viewBox","0 0 500 200")
            .call(zoomListener)
            .append("g")
            .attr("x",0)
            .attr("y",0);

var master = container.append("svg")
                  .attr("overflow","visible");


var anchorids = 0;
var connectionids = 0;

nodegraph.preview(master);
nodegraph.perlin(master);
//var node1 = appendNode(master,perlin);
//var node2 = appendNode(master,simplex);
//var node3 = appendNode(master,preview);
