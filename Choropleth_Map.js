let width = window.innerWidth;
let height = 650;

let svg = d3.select("#Choropleth_Map").append("svg")
  .attr("width", width)
  .attr("height", height)


// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(100)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .range(d3.schemeBlues[7]);

const GEO_URL = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
const POP_URL = "Map Data Visualization.csv"


// Load external data and boot
d3.queue()
  .defer(d3.json, GEO_URL)
  .defer(d3.csv, POP_URL, function(d) { data.set(d.code, +d.pop); })
.await(drawMap);

function drawMap(error, topo) {

  /////////////////////////////////
  console.log(topo)
  console.log(data.get('AFG'))
  /////////////////////////////////
  
  // Draw the map
  svg.append("g")
    .selectAll()
    .data(topo.features)
    .enter()
    .append("path")
    // draw each country
    .attr("d", d3.geoPath()
      .projection(projection)
    )
    // set the color of each country
    .attr("fill", function (d) {
      d.total = data.get(d.id) || 0;
      if (d.total === -1) {
        return 'gray';
      }
      return colorScale(d.total);
    })
    .on('mouseenter', function (d) {
        d3.select(this).attr("'stroke'", "red");
    })
    .on('mouseleave', function (d) {
        d3.select(this).attr("stroke", "none")
    })
}