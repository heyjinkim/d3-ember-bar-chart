/* D3 value definition */
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");
var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(formatPercent);

x.domain(DATA.map(function(d) { return d.letter; }));
y.domain([0, d3.max(DATA, function(d) { return d.frequency; })]);


/* Ember.Component */
App = Ember.Application.create();

App.BarChartComponent = Ember.Component.extend({
  width: width + margin.left + margin.right,
  height: height + margin.top + margin.bottom,                                     
  transform: "translate(" + margin.left + "," + margin.top + ")",
  transformX: "translate(0,"+height+")",

  model: function(){ 
    var data = DATA.map(function(d, i){
      return {
          x: x(d.letter), 
          y: y(d.frequency), 
          width: x.rangeBand(), 
          height: height - y(d.frequency)
         };
    });
    
    return data;
  }.property(),

  didInsertElement: function(){
    d3.select("g.x.axis").call(xAxis);
    d3.select("g.y.axis").call(yAxis);
  }
});