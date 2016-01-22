var DualScaleBarChart = (function () {
    function DualScaleBarChart(d3, data) {
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
    DualScaleBarChart.prototype.initChart = function () {
        this.width = this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
        this.height = this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;
        this.chartData.x = this.d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
        this.chartData.y0 = this.d3.scale.linear().range([this.height, 0]);
        this.chartData.y1 = this.d3.scale.linear().range([this.height, 0]);
        this.chartData.xAxis = this.d3.svg.axis().scale(this.chartData.x).orient("bottom");
        this.chartData.yAxisLeft = this.d3.svg.axis().scale(this.chartData.y0).orient("left").ticks(6);
        this.chartData.yAxisRight = this.d3.svg.axis().scale(this.chartData.y1).orient("right").ticks(6);
        this.tip0 = this.d3.tip()
            .attr('class', 'd3-tip0')
            .offset([-10, 0])
            .html(function (d) {
            return "<strong>Money : " + d.money + "</strong>";
        });
        this.tip1 = this.d3.tip()
            .attr('class', 'd3-tip1')
            .offset([-10, 0])
            .html(function (d) {
            return "<strong>Number : " + d.number + "</strong>";
        });
        this.chartData.svg = this.d3.select("#" + this.chartData.id).append("svg")
            .attr("width", this.chartData.width)
            .attr("height", this.chartData.height)
            .append("g")
            .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")")
            .call(this.tip0)
            .call(this.tip1);
    };
    /*
     * View Chart
     *
     * @version 1.0.0
     * @author  Kazuya Takami
     *
     */
    DualScaleBarChart.prototype.viewChart = function () {
        var chartData = this.chartData, height = this.height, width = this.width, bars, tip0 = this.tip0, tip1 = this.tip1;
        // CSV・TSV形式を使用する場合は、json -> csv,tsv メソッドに置き換える
        this.d3.json(chartData.file, function (error, data) {
            if (error)
                throw error;
            chartData.x.domain(data.map(function (d) { return d.year; }));
            chartData.y0.domain([0, this.d3.max(data, function (d) { return d.money; })]);
            chartData.y1.domain([0, this.d3.max(data, function (d) { return d.money; })]);
            chartData.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(chartData.xAxis);
            chartData.svg.append("g")
                .attr("class", "y axis axisLeft")
                .attr("transform", "translate(0,0)")
                .call(chartData.yAxisLeft)
                .append("text")
                .attr("y", 6)
                .attr("dy", "-2em")
                .style("text-anchor", "end")
                .text("Dollars");
            chartData.svg.append("g")
                .attr("class", "y axis axisRight")
                .attr("transform", "translate(" + (width) + ",0)")
                .call(chartData.yAxisRight)
                .append("text")
                .attr("y", 6)
                .attr("dy", "-2em")
                .attr("dx", "2em")
                .style("text-anchor", "end")
                .text("Number");
            bars = chartData.svg.selectAll(".bar").data(data).enter();
            bars.append("rect")
                .attr("class", "bar1")
                .attr("x", function (d) { return chartData.x(d.year); })
                .attr("width", chartData.x.rangeBand() / 2)
                .attr("y", function (d) { return chartData.y0(d.money); })
                .attr("height", function (d) { return height - chartData.y0(d.money); })
                .on('mouseover', tip0.show)
                .on('mouseout', tip0.hide);
            bars.append("rect")
                .attr("class", "bar2")
                .attr("x", function (d) { return chartData.x(d.year) + chartData.x.rangeBand() / 2; })
                .attr("width", chartData.x.rangeBand() / 2)
                .attr("y", function (d) { return chartData.y1(d.number); })
                .attr("height", function (d) { return height - chartData.y1(d.number); })
                .on('mouseover', tip1.show)
                .on('mouseout', tip1.hide);
        });
    };
    return DualScaleBarChart;
})();
var chartData = {
    margin: { top: 30, right: 40, bottom: 30, left: 40 },
    width: 960,
    height: 500,
    id: "chart",
    file: "data.json",
    x: "",
    y0: "",
    y1: "",
    xAxis: "",
    yAxisLeft: "",
    yAxisRight: "",
    svg: ""
};
var chart = new DualScaleBarChart(d3, chartData);
chart.viewChart();
//# sourceMappingURL=main.js.map