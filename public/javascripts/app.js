
// create the zoom listener
var zoomListener = d3.behavior.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomHandler);

// function for handling zoom event
function zoomHandler() {
  console.log(d3.event.translate)

  d3.select(this).select("g").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

console.log(d3.select(".graph"))

// create the svg
var master = d3.select("#tree-body").append("svg")
            .attr("width", 800)
            .attr("height", 300)
            .call(zoomListener)
          .append("g")
// apply the zoom behavior to the svg image

/*
var pan = d3.behavior.zoom()
    .on("drag", maindrag);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(pan);

var master = svg.append("g")
    .attr("x", 0)
    .attr("y", 0)
*/
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

/*
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill","#ddd")

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

d3.select("button").on("click", reset);*/

function maindrag() {
  /*
  svg.select(".x.axis").call(xAxis);
  svg.select(".y.axis").call(yAxis);
  */
  var top = d3.select(this).select("g");
  var x = parseInt(top.attr("x"),10) + d3.event.dx;
  var y = parseInt(top.attr("y"),10) + d3.event.dy;

  top
    .attr("x", x)
    .attr("y", y)
    .attr("transform","translate("+x+","+y+")")

}

// Node creation
var nodedrag = d3.behavior.drag();
nodedrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();
  })
  .on("drag",function(){
    var prex = parseInt(d3.select(this).attr("x"),10);
    var prey = parseInt(d3.select(this).attr("y"),10);
    d3.select(this)
      .attr("x",d3.event.dx + prex)
      .attr("y",d3.event.dy + prey);
    d3.select(this)
      .attr("transform","translate("+prex+","+prey+")");
  })
  .on("dragend",function(){
  })

var node1 = master.append("g")
              .attr("x",10)
              .attr("y",20)
              .call(nodedrag);

node1.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa")


var node2 = master.append("g")
        .attr("x",60)
        .attr("y",80)
        .call(nodedrag)

node2.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa");

// Anchor creation
var anchordrag = d3.behavior.drag();
var currentpath;
anchordrag
  .on("dragstart",function(){
    d3.event.sourceEvent.stopPropagation();
    console.log(d3.event.sourceEvent.x,d3.event.sourceEvent.y);
    var currentpath = master.append("path")
      .attr("d","M"+d3.event.sourceEvent.x+" "+d3.event.sourceEvent.y+" L 10 75")
      .style("stroke","red")
      .style("stroke-width","2")
      .style("fill","none");
  })
  .on("drag",function(){
    //console.log("movetanchor");
  })
  .on("dragend",function(){
    //console.log("endanchor");
    // Find if there is another anchor at this point
  })

node1.append("circle")
    .attr("cx",6)
    .attr("cy",6)
    .attr("r", 8)
    .style("fill","#aea")
    .call(anchordrag)
