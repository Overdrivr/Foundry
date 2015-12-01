
// create the zoom listener
var zoomListener = d3.behavior.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomHandler);

// function for handling zoom event
function zoomHandler() {
  d3.select(this).select("g")
    .attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

// create the svg
var container = d3.select("#tree-body").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .call(zoomListener)
            .append("g")
            .attr("x",0)
            .attr("y",0);

var master = container.append("svg")
                  .attr("overflow","visible");


var anchorids = 0;
var connectionids = 0;

addNode_preview(master);
addNode_perlin(master);
//var node1 = appendNode(master,perlin);
//var node2 = appendNode(master,simplex);
//var node3 = appendNode(master,preview);


function getTransformedCoords(x, y, ctm) {
    var xn = x * ctm.a + y * ctm.c + ctm.e;
    var yn = x * ctm.b + y * ctm.d + ctm.f;
    return {
      x: xn,
      y: yn
    };
}

function distanceToAnchor(x,y,cx,cy){
  return Math.sqrt((cx - x)*(cx - x) + (cy - y)*(cy - y));
}
