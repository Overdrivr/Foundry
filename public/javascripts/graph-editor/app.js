
var w = 960,
    h = 500

var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("javascripts/graph-editor/graph.json", function(json) {

  var node_drag = d3.behavior.drag()
      .origin(Object)
      .on("dragstart", dragstart)
      .on("drag", dragmove)
      .on("dragend", dragend);

  var width = 20;
  var height = 50;
  var dragbarw = 5;

  var node = vis.selectAll("g.node")
      .data(json.nodes)
    .enter().append("svg:g")
      .attr("nodeid",function(d,i){ return i})
      .attr("class", "node")
      .data([{x: width / 2, y: height / 2}])
      .attr("x",function(d,i) { d.x * i; })
      .attr("y",function(d,i) { d.y * i; })
      .call(node_drag);

  var divs = node.append("foreignObject")
        .attr("class","foreignObject")

  var bd = divs
            .append("xhtml:div")
            .attr("class","nodelabel")
            .attr("width","175")
            .style("width", "80px")
            .style("height", "130px");

      bd
      .append("xhtml:p")
      .text("Click me alalalalalalal")
      .style("float","center")

      divs
      .style("width",bd.node().getBoundingClientRect().width)
      .style("height",bd.node().getBoundingClientRect().height);

    function dragstart(d, i) {

    }

    function dragmove(d, i) {

        var n = d3.select(this);
        n.attr("x",function(){return +d3.select(this).attr("x") + d3.event.dx});
        n.attr("y",function(){return +d3.select(this).attr("y") + d3.event.dy});
        n.attr("transform", function() { return "translate(" + +d3.select(this).attr("x") + "," + +d3.select(this).attr("y") + ")"; });
    }

    function dragend(d, i) {

    }

});
