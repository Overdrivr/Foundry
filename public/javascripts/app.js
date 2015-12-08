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
            .call(zoomListener)
            .append("g")
            .attr("x",0)
            .attr("y",0);

// Add the inner svg that will contain the nodes
container.append("svg")
            .attr("id","master")
            .attr("overflow","visible");

nodegraph.preview();
nodegraph.perlin();
