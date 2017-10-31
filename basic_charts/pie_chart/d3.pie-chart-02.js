(function ($) {
  "use strict";

  $.fn.D3PieChart = function(options) {
    var defaults = {
      "data": [],
      "color": d3.schemeCategory10,
      "height": 250,
      "width": 250,
      "innerRadisu": 0,
      "outerRadisu": 100
    };
    var settings = $.extend({}, defaults, options);

    return this.each(function() {
      var
        pie = d3.pie(),
        arc = d3.arc().innerRadius(settings.innerRadisu).outerRadius(settings.outerRadisu),
        colorSet = d3.scaleOrdinal(settings.color),
        svg,
        pieElement;

      // svg Setting
      svg = d3.select("#" + $(this).attr("id"))
        .append("svg")
        .attr("height", settings.height)
        .attr("width", settings.width)
        .append("g")
        .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")");

      // Basic Setting
      pieElement = svg.selectAll("g")
        .data(pie(settings.data))
        .enter()
        .append("g");

      // Path Setting
      pieElement.append("path")
        .style("fill", function(d, i) {
          return colorSet(i);
        })
        .attr("d", arc);

      // Text Setting
      pieElement.append("text")
        .attr("class", "pie-text")
        .attr("transform", function(d){
          return "translate(" + arc.centroid(d) + ")"
        })
        .text(function(d){
          return d.value;
        });

      // Total View
      d3.select("svg")
        .append("text")
        .attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ")")
        .attr("class", "total")
        .text(d3.sum(settings.data));
    });
  };
}(jQuery));