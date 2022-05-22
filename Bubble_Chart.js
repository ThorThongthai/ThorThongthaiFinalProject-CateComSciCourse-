var width3 = 1000,
    height3 = 1000;

var svg3 = d3.select("#Bubble_Chart")
    .append("svg")
    .attr("height", height3)
    .attr("width", width3)
    .append("g")
    .attr("transform", "translate(0,0)")

var radiusScale = d3.scaleSqrt().domain([1, 10]).range([1, 50])

var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width3/2).strength(0.05))
    .force("y", d3.forceY(height3/2).strength(0.05))
    .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.pop)
    }))

d3.queue()
    .defer(d3.csv, "Map Data Visualization.csv")
    .await(ready)

function ready (error, datapoints0) {
    let datapoints = datapoints0.filter(d => d.pop != -1); 
    
    var circles = svg3.selectAll(".country")
    .data(datapoints)
    .enter()
    .append("circle")
    .attr("class", "country")
    .attr("r", function(d){
        return radiusScale(d.pop)
    })
    .attr("fill", "lightblue")
    
        
    
    var texts = svg3.selectAll(".text")
        .data(datapoints)
        .enter().append("text")
        .attr("class", "text")
        .text(function(d) {return d.name})
    
    simulation.nodes(datapoints)
        .on("tick", ticked)
    
    function ticked() {
        circles
        .attr("cx", function(d){
            return d.x
        })
        .attr("cy", function(d){
            return d.y
        })
        texts
        .attr("x", function(d){
            return d.x
        })
        .attr("y", function(d){
            return d.y
        })
    }
}