
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
        .attr("transform", function(d,i) { return "translate(" + 100 * i + "," + 10 * i + ")"; })
        .call(node_drag);

        var resizehandler = node.append("svg:polygon")
            .attr("points","-30,0 0,-30 0,0 ")
            .attr("transform", function(d) { return "translate(" + 350 + "," + 70 + ")"; });

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
          .style("width", "1px")
          .style("height", "1px");


    var bd = divs
              .append("xhtml:div")
              .attr("class","nodelabel")
              .style("width", "300px")
              .style("height", "50px")
              .style("max-height","400px");


// HANDLER CODE
// Not working. Either use a svg:rect for drag or try to set order priority to handle drag
  var handle_drag = d3.behavior.drag()
      .on("drag", resizeleft)
  /*var handleright = bd.append("xhtml:div")
          .attr("class","handleright")
          .style("width", "5px")
          .style("height", "5px")
          .style("background-color", "orange")
          .style("left","5px")
          .style("cursor","ew-resize")
          .style("bottom","-5px")
          .call(handle_drag)*/

          bd
          .append("xhtml:p")
          .text("Click me alalalalalalal")
          .style("float","center")


          divs
          .style("width",bd.node().getBoundingClientRect().width)
          .style("height",bd.node().getBoundingClientRect().height);

    // filters go in defs element
    var defs = vis.append("defs");

    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    var filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

    // SourceAlpha refers to opacity of graphic that this filter will be applied to
    // convolve that with a Gaussian with standard deviation 3 and store result
    // in blur
    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 5)
        .attr("result", "blur");

    // translate output of Gaussian blur to the right and downwards with 2px
    // store result in offsetBlur
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 5)
        .attr("result", "offsetBlur");


        // overlay original SourceGraphic over translated blurred opacity by using
    // feMerge filter. Order of specifying inputs is important!
    var feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

    // Shadows seem complicated for now. We'll see later
    /*
    rects
      .style("filter", "url(#drop-shadow)")
      .attr("width",bd.node().getBoundingClientRect().width)
      .attr("height",bd.node().getBoundingClientRect().height)*/

    function dragstart(d, i) {
        //force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        var n = d3.select(this);
        n.attr("x",function(){return +d3.select(this).attr("x") + d3.event.dx});
        n.attr("y",function(){return +d3.select(this).attr("y") + d3.event.dy});
        n.attr("transform", function() { return "translate(" + +d3.select(this).attr("x") + "," + +d3.select(this).attr("y") + ")"; });
        /*
        n.select("div")
        .style("width", "500px");

        n.select("foreignObject")
        .style("width","500px");*/
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        //tick();
        //force.resume();
    }

    function resizeleft(d, i)
    {
      var n = d3.select(this);

      n.select("div")
      .style("width", +n.select("div").style(width) + d3.event.dx);

      n.select("foreignObject")
      .style("width", +n.select("div").style(width) + d3.event.dx);

      console.log("resizeleft");
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
