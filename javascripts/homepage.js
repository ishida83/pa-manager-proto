jQuery(function ($) {
    var generateData = function () {
        var data = [];

        for (var i = 0; i < 20; i++) {
            data.push({
                x: i,
                y: Math.random() * 100
            });
        }

        return data;
    };

    nv.addGraph(function () {

        var data = [{
            "key": "CPU",
            "values": generateData()
        }, {
            "key": "Memory",
            "values": generateData()
        }, {
            "key": "Disk",
            "values": generateData()
        }];

        var chart = nv.models.lineChart()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .useInteractiveGuideline(true);

        chart.yAxis
            .tickFormat(d3.format('.02f'));

        var svg = d3.select("svg")
            .attr("height", 323)
            .datum(data)
            .transition().duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);
    });
});