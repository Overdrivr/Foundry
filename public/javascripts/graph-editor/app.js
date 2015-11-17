
var w = 960,
    h = 500

var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("javascripts/graph-editor/graph.json", function(json) {
    /*var force = self.force = d3.layout.force()
        .nodes(json.nodes)
        .links(json.links)
        .gravity(.05)
        .distance(100)
        .charge(-100)
        .size([w, h])
        .start();*/


/*
    var link = vis.selectAll("line.link")
        .data(json.links)
        .enter().append("svg:line")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
*/
    var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    var node = vis.selectAll("g.node")
        .data(json.nodes)
      .enter().append("svg:g")
        .attr("nodeid",function(d,i){ return i})
        .attr("class", "node")
        .attr("x",function(d,i) { return 100 * i; })
        .attr("y",function(d,i) { return 10 * i; })
        .attr("transform", function(d,i) { return "translate(" + 100 * i + "," + 50 + ")"; })
        .call(node_drag);
/*
    var rects = node.append("svg:rect")
      .attr("class","rect")
      .attr("x",0)
      .attr("y",0)
      .attr("width",80)
      .attr("height",50)
      .attr("stroke","#b0bec5")
      .attr("fill","#cfd8dc");*/

    var divs = node.append("foreignObject")
          .attr("class","foreignObject")
          .style("width", "400px")
          .style("height", "50px")

    var bd = divs.append("xhtml:body")
              .attr("class","nodelabel")
              .style("width", "400px")
              .style("height", "50px")
              .append("div")


          bd.append("xhtml:p")
          .text("Click me alalalalalalal");
    /*
    node.append("svg:image")
        .attr("class", "circle")
        .attr("xlink:href", "https://github.com/favicon.ico")
        .attr("x", "-8px")
        .attr("y", "-8px")
        .attr("width", "16px")
        .attr("height", "16px");

    rects.append("svg:text")
        .attr("class", "nodetext")
        .attr("dx", 0)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });
*/
    function dragstart(d, i) {
        //force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        var n = d3.select(this);
        n.attr("x",function(){return +d3.select(this).attr("x") + d3.event.dx});
        n.attr("y",function(){return +d3.select(this).attr("y") + d3.event.dy});
        n.attr("transform", function() { return "translate(" + +d3.select(this).attr("x") + "," + +d3.select(this).attr("y") + ")"; });
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        //tick();
        //force.resume();
    }


    //force.on("tick", tick);
/*
    function tick() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    };
*/

});
