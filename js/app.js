var data = [
    {  "letter":"A", "frequency":0.08167 },
    {  "letter":"B", "frequency":0.01492 },
    {  "letter":"C", "frequency":0.02780 },
    {  "letter":"D", "frequency":0.04253 },
    {  "letter":"E", "frequency":0.12702 },
    {  "letter":"F", "frequency":0.02288 },
    {  "letter":"G", "frequency":0.02022 },
    {  "letter":"H", "frequency":0.06094 },
    {  "letter":"I", "frequency":0.06973 },
    {  "letter":"J", "frequency":0.00153 },
    {  "letter":"K", "frequency":0.00747 },
    {  "letter":"L", "frequency":0.04025 },
    {  "letter":"M", "frequency":0.02517 },
    {  "letter":"N", "frequency":0.06749 },
    {  "letter":"O", "frequency":0.07507 },
    {  "letter":"P", "frequency":0.01929 },
    {  "letter":"Q", "frequency":0.00098 },
    {  "letter":"R", "frequency":0.05987 },
    {  "letter":"S", "frequency":0.06333 },
    {  "letter":"T", "frequency":0.09056 },
    {  "letter":"U", "frequency":0.02758 },
    {  "letter":"V", "frequency":0.01037 },
    {  "letter":"W", "frequency":0.02465 },
    {  "letter":"X", "frequency":0.00150 },
    {  "letter":"Y", "frequency":0.01971 },
    {  "letter":"Z", "frequency":0.00074 }
  ];

/* D3 value definitions */
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");
var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom");
var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(formatPercent);

x.domain(data.map(function(d) { return d.letter; }));
y.domain([0, d3.max(data, function(d) { return d.frequency; })]);


/* Ember code using Component */
App = Ember.Application.create();

App.BarChartComponent = Ember.Component.extend({
  width: width + margin.left + margin.right,
  height: height + margin.top + margin.bottom,                                     
  transform: "translate(" + margin.left + "," + margin.top + ")",
  transformX: "translate(0,"+height+")",

  model: function(){ 
    var datum = data.map(function(d, i){
      return {
          x: x(d.letter), 
          y: y(d.frequency), 
          width: x.rangeBand(), 
          height: height - y(d.frequency)
         };
    });
    
    return datum;
  }.property(),

  didInsertElement: function(){
    d3.select("g.x.axis").call(xAxis);
    d3.select("g.y.axis").call(yAxis);
  }
});