class settingChart implements chartMargin {

  constructor(margin: chartMargin) {
    //console.log( margin );
  }
}

interface chartMargin {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

var chartMargin = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 10
};

var chart = new settingChart( chartMargin );