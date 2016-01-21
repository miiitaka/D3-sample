var BasicBarChart = (function () {
    function BasicBarChart(d3, data) {
        this.d3 = d3;
        this.chartData = data;
        this.initChart();
    }
    /*
     * Initialize Chart Settings
     *
     * @version 1.0.0
     * @author Kazuya Takami
     *
     */
    BasicBarChart.prototype.initChart = function () {
        this.width = this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
        this.height = this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;
        this.chartData.x = this.d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
        this.chartData.y = this.d3.scale.linear().range([this.height, 0]);
        this.chartData.xAxis = this.d3.svg.axis().scale(this.chartData.x).orient(this.chartData.orient.bottom);
        this.chartData.yAxis = this.d3.svg.axis().scale(this.chartData.y).orient(this.chartData.orient.left).ticks(10, "%");
        this.chartData.svg = this.d3.select("#" + this.chartData.id).append("svg")
            .attr("width", this.chartData.width)
            .attr("height", this.chartData.height)
            .append("g")
            .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")");
        this.viewChart(this.chartData, this.height);
    };
    /*
     * View Chart
     *
     * @version 1.0.0
     * @author  Kazuya Takami
     * @param   chartData ChartData
     * @param   height    number
     *
     */
    BasicBarChart.prototype.viewChart = function (chartData, height) {
        var chartData = chartData, height = height;
        this.d3.tsv(chartData.file, this.type, function (error, data) {
            if (error)
                throw error;
            chartData.x.domain(data.map(function (d) { return d.letter; }));
            chartData.y.domain([0, this.d3.max(data, function (d) { return d.frequency; })]);
            chartData.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(chartData.xAxis);
            chartData.svg.append("g")
                .attr("class", "y axis")
                .call(chartData.yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");
            chartData.svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return chartData.x(d.letter); })
                .attr("width", chartData.x.rangeBand())
                .attr("y", function (d) { return chartData.y(d.frequency); })
                .attr("height", function (d) { return height - chartData.y(d.frequency); });
        });
    };
    BasicBarChart.prototype.type = function (d) {
        d.frequency = +d.frequency;
        return d;
    };
    return BasicBarChart;
})();
var chartData = {
    margin: { top: 20, right: 20, bottom: 30, left: 40 },
    width: 960,
    height: 500,
    orient: { bottom: "bottom", left: "left" },
    id: "chart",
    file: "data.tsv",
    x: "",
    y: "",
    xAxis: "",
    yAxis: "",
    svg: ""
};
var chart = new BasicBarChart(d3, chartData);
//# sourceMappingURL=main.js.map