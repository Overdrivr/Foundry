var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([-width / 2, width / 2])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([-height / 2, height / 2])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(-height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width);

var zoom = d3.behavior.zoom()
    .x(x)
    .y(y)
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(zoom);

var master = svg.append("g")

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

function zoomed() {
  /*
  svg.select(".x.axis").call(xAxis);
  svg.select(".y.axis").call(yAxis);
  */
  var top = d3.select(this).select("g");
  console.log(top)
}

function reset() {
  svg.call(zoom
      .x(x.domain([-width / 2, width / 2]))
      .y(y.domain([-height / 2, height / 2]))
      .event);
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
  })
  .on("dragend",function(){
  })

master.append("rect")
    .attr("x",10)
    .attr("y",20)
    .attr("width", 60)
    .attr("height", 80)
    .style("fill","#aaa")
    .call(nodedrag)
