// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 40, left: 250},
    width2 = 700 - margin.left - margin.right,
    height2 = 2000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#Horizontal_Bar_Chart")
  .append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("Map Data Visualization.csv", function(data0) {

    let data = data0.filter(d => d.pop != -1); 
    data.sort((a, b) => d3.descending(a.pop, b.pop))
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width2]);

  svg2.append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([0, height2])
    .domain(data.map(function(d) { return d.name; }))
    .padding(.1);

  svg2.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg2.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .on("mouseover", onMouseOver)
    .on("mouseout", onMouseOut)
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.pop); })
    .attr("height", y.bandwidth() )
    .attr("class", "bar")

  function onMouseOver(d,i) {
    // var xPos = parseFloat(d3.select(this).attr("x"));
    // var yPos = parseFloat(d3.select(this).attr("y"));

    // d3.select("#tooltip")
    // .style("left", xPos + "px")
    // .stlye("top", yPos + "px")
    // .select("value").text(i.value)
    // d3.select("#tooltip").classed("hidden", false);

    d3.select(this)
    .attr("class", "highlight")
    d3.select(this)
    .transition()
    .duration(400)
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.pop) + 1; })
    .attr("height", y.bandwidth() + 1 )
    
  }  

  function onMouseOut(d,i) {
    d3.select(this)
    .attr("class", "bar")
    .transition()
    .duration(500)
    .attr("x", x(0))
    .attr("y", function(d) { return y(d.name); })
    .attr("width", function(d) { return x(d.pop); })
    .attr("height", y.bandwidth())
  }
})