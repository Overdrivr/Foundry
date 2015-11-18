
var w = 960,
    h = 500

var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

d3.json("javascripts/graph-editor/graph.json", function(json) {
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
// HANDLER CODE

  var handle_drag = d3.behavior.drag()
      .on("dragstart",resizestart)
      .on("drag", resizeleft)

  var node_drag = d3.behavior.drag()
      .origin(Object)
      .on("dragstart", dragstart)
      .on("drag", dragmove)
      .on("dragend", dragend);


  var width = 200;
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

  var dragbarright = node.append("rect")
    .attr("x", function(d) { return d.x + width - (dragbarw/2); })
    .attr("y", function(d) { return d.y + (dragbarw/2); })
    .attr("id", "dragright")
    .attr("height", height - dragbarw)
    .attr("width", dragbarw)
    .attr("fill", "lightblue")
    .attr("fill-opacity", 1)
    .attr("cursor", "ew-resize")
    .call(handle_drag);

  var divs = node.append("foreignObject")
        .attr("class","foreignObject")
        .call(node_drag);


  var bd = divs
            .append("xhtml:div")
            .attr("class","nodelabel")
            .attr("width","175")
            .style("width", "175px")
            .style("height", "100px");


    /*
    var resizehandler = node.append("svg:polygon")
        .attr("points","-30,0 0,-30 0,0 ")
        .attr("x", function(d) { return d.x + width - (dragbarw/2); })
        .attr("y", function(d) { return d.y + (dragbarw/2); })
        .attr("id", "dragright")
        .attr("height", height - dragbarw)
        .attr("width", dragbarw)
        .call(handle_drag);
*/
/*
  var dragrect = node.append("rect")
      .attr("id", "active")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("height", width)
      .attr("width", height)
      .attr("fill-opacity", .5)
      .attr("cursor", "move")*/





/*
          bd
          .append("xhtml:p")
          .text("Click me alalalalalalal")
          .style("float","center")


          divs
          .style("width",bd.node().getBoundingClientRect().width)
          .style("height",bd.node().getBoundingClientRect().height);
          */

    // filters go in defs element
    /*var defs = vis.append("defs");

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
        .attr("in", "SourceGraphic");*/

    // Shadows seem complicated for now. We'll see later
    /*
    rects
      .style("filter", "url(#drop-shadow)")
      .attr("width",bd.node().getBoundingClientRect().width)
      .attr("height",bd.node().getBoundingClientRect().height)*/

    function resizestart(d, i){
      console.log("there");
      d3.event.sourceEvent.stopPropagation();
    }

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
      var n = d3.select(this.parentNode);
      var di = n.selectAll("div");

      console.log(di.attr("width"));
      di.attr("width", +di.attr("width") + d3.event.dx);
      di.style("width", di.attr("width")+"px");
/*
      n.select("nodelabel")
      .style("width", +n.select("nodelabel").style(width) + d3.event.dx);

      n.select("rect")
      .attr("x", +n.select("rect").attr(width) + d3.event.dx);*/

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
