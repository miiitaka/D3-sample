class BasicBarChart {
  private d3: any;
  private chartData: ChartData;
  private width: number;
  private height: number;

  constructor(d3: any, data: ChartData) {
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
  private initChart(): void {
    this.width = this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
    this.height = this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;

    this.chartData.x = this.d3.scale.ordinal().rangeRoundBands([0, this.width], .1);
    this.chartData.y = this.d3.scale.linear().range([this.height, 0]);
    this.chartData.xAxis = this.d3.svg.axis().scale(this.chartData.x).orient("bottom");
    this.chartData.yAxis = this.d3.svg.axis().scale(this.chartData.y).orient("left").ticks(10, "%");

    this.chartData.svg = this.d3.select("#" + this.chartData.id).append("svg")
      .attr("width", this.chartData.width)
      .attr("height", this.chartData.height)
      .append("g")
      .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")");
  }

  /*
   * View Chart
   *
   * @version 1.0.0
   * @author  Kazuya Takami
   *
   */
  public viewChart(): void {
    var
      chartData: ChartData = this.chartData,
      height: number = this.height;

    // CSV・TSV形式を使用する場合は、json -> csv,tsv メソッドに置き換える
    this.d3.json(chartData.file, function(error, data) {
      if (error) throw error;

      chartData.x.domain(data.map(function(d) { return d.letter; }));
      chartData.y.domain([0, this.d3.max(data, function(d) { return d.frequency; })]);

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
        .attr("x", function(d) { return chartData.x(d.letter); })
        .attr("width", chartData.x.rangeBand())
        .attr("y", function(d) { return chartData.y(d.frequency); })
        .attr("height", function(d) { return height - chartData.y(d.frequency); });
    });
  }
}

interface ChartData {
  margin: { top: number, right: number, bottom: number, left: number };
  width: number;
  height: number;
  id: string;
  file: string;
  x: any;
  y: any;
  xAxis: any;
  yAxis: any;
  svg: any;
}

var chartData = {
  margin: { top: 20, right: 20, bottom: 30, left: 40 },
  width: 960,
  height: 500,
  id: "chart",
  file: "data.json",
  x: "",
  y: "",
  xAxis: "",
  yAxis: "",
  svg: ""
};

var chart = new BasicBarChart(d3, chartData);
chart.viewChart();