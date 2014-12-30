var api_key = "5457c9b0db98a09651aa5e92192aaa33";
var app_id = "web001";
var chart,
    prodChart;
var graph,
    graph1,
    graph2,
    graph3;
var id = $('#asset').val();
var lastweek = $('#lastweek').val();

function getToday() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	//January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	today = dd + '-' + mm + '-' + yyyy;
	return today;
};

function getData(url) {
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari
		var request = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		var request = new ActiveXObject('Microsoft.XMLHTTP');
	}

	request.open('GET', url, false);
	request.setRequestHeader('Authorization', api_key);
	request.setRequestHeader('Authorization-id', app_id);
	request.send();

	var data = JSON.parse(request.responseText);

	return eval(data.data);
};

AmCharts.ready(function() {
	// SERIAL CHART
	var now = getToday();
	var chartData = getData('/sismon_beta/api/v1/speedlog/' + id + '/' + now);
	var prodData = getData('/sismon_beta/api/v1/weeklylog/' + id + '/' + lastweek);
	console.debug(chartData);
	console.debug(prodData);
	chart = new AmCharts.AmSerialChart();
	prodChart = new AmCharts.AmSerialChart();

	// speed chart
	chart.pathToImages = "/sismon_beta/amcharts/images/";
	chart.dataProvider = chartData;
	chart.marginLeft = 10;
	chart.categoryField = "tgl";
	chart.dataDateFormat = "YYYY-MM-DD JJ:NN:SS";
	chart.mouseWheelZoomEnabled = true;
	// listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
	chart.addListener("dataUpdated", zoomChart);

	// production chart
	prodChart.pathToImages = "/sismon_beta/amcharts/images/";
	prodChart.dataProvider = prodData;
	prodChart.marginLeft = 10;
	prodChart.categoryField = "tgl";
	prodChart.dataDateFormat = "YYYY-MM-DD";

	// SPEED AXES
	// category
	var categoryAxis = chart.categoryAxis;
	categoryAxis.parseDates = true;
	// as our data is date-based, we set parseDates to true
	categoryAxis.minPeriod = "ss";
	categoryAxis.dashLength = 3;
	categoryAxis.minorGridEnabled = true;
	categoryAxis.minorGridAlpha = 0.1;
	categoryAxis.title = "Working Time";

	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = true;
	valueAxis.dashLength = 3;
	chart.addValueAxis(valueAxis);

	// PROD AXES
	// category
	var pcategoryAxis = prodChart.categoryAxis;
	//pcategoryAxis.parseDates = true;
	// as our data is date-based, we set parseDates to true
	pcategoryAxis.minPeriod = "DD";
	pcategoryAxis.dashLength = 3;
	pcategoryAxis.minorGridEnabled = true;
	pcategoryAxis.minorGridAlpha = 0.1;
	pcategoryAxis.title = "Working Day";

	// value
	var pvalueAxis = new AmCharts.ValueAxis();
	pvalueAxis.axisAlpha = 0;
	pvalueAxis.inside = true;
	pvalueAxis.dashLength = 3;
	prodChart.addValueAxis(pvalueAxis);

	// SPEED GRAPH
	graph = new AmCharts.AmGraph();
	graph.type = "line";
	graph.lineColor = "blue";
	graph.negativeLineColor = "#637bb6";
	graph.lineThickness = 1;
	graph.fillAlphas = 0.5;
	graph.fillColorsField = "red";
	graph.lineColorField = "none";
	graph.valueField = "speed";
	graph.title = "Speed";
	graph.balloonText = "[[tgl]]<br><b><span style='font-size:14px;'>Speed: [[speed]]</span></b>";

	chart.addGraph(graph);

	// PROD GRAPH
	// GRAPH
	graph1 = new AmCharts.AmGraph();
	graph1.type = "smoothedLine";
	// this line makes the graph smoothed line.
	graph1.lineColor = "#ff0000";
	graph1.negativeLineColor = "#637bb6";
	// this line makes the graph to change color when it drops below 0
	graph1.bullet = "round";
	graph1.bulletSize = 8;
	graph1.bulletBorderColor = "#FFFFFF";
	graph1.bulletBorderAlpha = 1;
	graph1.bulletBorderThickness = 2;
	graph1.lineThickness = 2;
	graph1.valueField = "shift1";
	graph1.balloonText = "Shift 1<br><b><span style='font-size:14px;'>[[shift1]]</span></b>";
	prodChart.addGraph(graph1);

	graph2 = new AmCharts.AmGraph();
	graph2.type = "smoothedLine";
	// this line makes the graph smoothed line.
	graph2.lineColor = "#00ff00";
	graph2.negativeLineColor = "#637bb6";
	// this line makes the graph to change color when it drops below 0
	graph2.bullet = "round";
	graph2.bulletSize = 8;
	graph2.bulletBorderColor = "#FFFFFF";
	graph2.bulletBorderAlpha = 1;
	graph2.bulletBorderThickness = 2;
	graph2.lineThickness = 2;
	graph2.valueField = "shift2";
	graph2.balloonText = "Shift 2<br><b><span style='font-size:14px;'>[[shift2]]</span></b>";
	prodChart.addGraph(graph2);

	graph3 = new AmCharts.AmGraph();
	graph3.type = "smoothedLine";
	// this line makes the graph smoothed line.
	graph3.lineColor = "#0000ff";
	graph3.negativeLineColor = "#637bb6";
	// this line makes the graph to change color when it drops below 0
	graph3.bullet = "round";
	graph3.bulletSize = 8;
	graph3.bulletBorderColor = "#FFFFFF";
	graph3.bulletBorderAlpha = 1;
	graph3.bulletBorderThickness = 2;
	graph3.lineThickness = 2;
	graph3.valueField = "shift3";
	graph3.balloonText = "Shift 3<br><b><span style='font-size:14px;'>[[shift3]]</span></b>";
	prodChart.addGraph(graph3);

	// SPEED CURSOR
	var chartCursor = new AmCharts.ChartCursor();
	chartCursor.cursorAlpha = 0;
	chartCursor.cursorPosition = "mouse";
	chartCursor.categoryBalloonDateFormat = "SS";
	chart.addChartCursor(chartCursor);

	// PROD CURSOR
	var pchartCursor = new AmCharts.ChartCursor();
	pchartCursor.cursorAlpha = 0;
	pchartCursor.cursorPosition = "mouse";
	pchartCursor.categoryBalloonDateFormat = "D/MM";
	prodChart.addChartCursor(pchartCursor);

	// SCROLLBAR
	var chartScrollbar = new AmCharts.ChartScrollbar();
	chart.addChartScrollbar(chartScrollbar);

	chart.creditsPosition = "bottom-right";
	prodChart.creditsPosition = "bottom-right";

	// WRITE
	chart.write("speed");
	prodChart.write("production");
});

// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
	// different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
	chart.zoomToCategoryValues("1", "10");
};

function updateSpeedLog(value) {
	var newChartData = getData('/sismon_beta/api/v1/speedlog/' + id + '/' + value);
	chart.dataProvider = newChartData;
	//Update graph data
	chart.validateData();
	//Revalidate chart data
};

function updateProductionLog(value) {
	var newProdData = getData('/sismon_beta/api/v1/weeklylog/' + id + '/' + value);
	prodChart.dataProvider = newProdData;
	//Update graph data
	prodChart.validateData();
	//Revalidate chart data
};

(function ($) {
  $('.spinner .btn:first-of-type').on('click', function() {
  	var curVal = $('.spinner input').val();
  	if (curVal < 52){
  		var newVal = parseInt($('.spinner input').val(), 10) + 1;
    	$('.spinner input').val(newVal);
    	updateProductionLog(newVal); 
    }
    else
    	$('.spinner input').val(1);
  });
  $('.spinner .btn:last-of-type').on('click', function() {
    var curVal = $('.spinner input').val();
  	if (curVal > 1){
  		var newVal = parseInt($('.spinner input').val(), 10) - 1;
    	$('.spinner input').val(newVal);
    	updateProductionLog(newVal); 
    }
    else
    	$('.spinner input').val(52);
  });
})(jQuery);

$('#datefilter').datepicker({
    format: "dd-mm-yyyy",
    autoclose: true,
    todayHighlight: true
});