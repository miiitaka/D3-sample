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
      pieElement = svg.selectAll("path")
        .data(pie(settings.data))
        .enter()
        .append("path")
        .style("fill", function(d, i) {
          return colorSet(i);
        });

      // arc Setting
      pieElement.attr("d", arc);
    });
  };
}(jQuery));