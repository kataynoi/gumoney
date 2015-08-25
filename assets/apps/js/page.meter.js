$(function () {
    var rpt = {};

    rpt.ajax = {

        get_meter_ncdscreen: function(year, cb){
            var url = '/pages/get_meter_ncdscreen',
                params = {
                    year: year
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_meter_z133: function(year, cb){
            var url = '/pages/get_meter_z133',
                params = {
                    year: year
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_meter_z131: function(year, cb){
            var url = '/pages/get_meter_z131',
                params = {
                    year: year
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_meter_z136_z138: function(year, cb){
            var url = '/pages/get_meter_z136_z138',
                params = {
                    year: year
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        }

    }

    rpt.get_meter_ncdscreen = function(year)
    {
        rpt.ajax.get_meter_ncdscreen(year,function(err, data){
            if(err)
            {
                app.alert(err);
            }
            else
            {
                rpt.chart.get_meter_ncdscreen(data);
            }
        });
    };
 rpt.get_meter_z133 = function(year)
    {
        rpt.ajax.get_meter_z133(year,function(err, data){
            if(err)
            {
                app.alert(err);
            }
            else
            {
                rpt.chart.get_meter_z133(data);
            }
        });
    };
    rpt.get_meter_z131 = function(year)
    {
        rpt.ajax.get_meter_z131(year,function(err, data){
            if(err)
            {
                app.alert(err);
            }
            else
            {
                rpt.chart.get_meter_z131(data);
            }
        });
    };
    rpt.get_meter_z136_z138 = function(year)
    {
        rpt.ajax.get_meter_z136_z138(year,function(err, data){
            if(err)
            {
                app.alert(err);
            }
            else
            {
                rpt.chart.get_meter_z136_z138(data);
            }
        });
    };

// Render Charts
    rpt.chart = {};
    rpt.chart.get_meter_ncdscreen = function(data){
        var options = {
            chart: {
                renderTo: 'meter1',
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height:300,
                width:300
            },

            title: {
                text: 'ร้อยละ การคัดกรองเบาหวาน/ความดัน 15 ปี ขึ้นไป'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 0.1,
                    rotation: 'auto'
                },
                title: {
                    text: 'ร้อยละ'
                },
                plotBands: [{
                    from: 0.0,
                    to: 49.99,
                    color: '#DF5353' // green
                }, {
                    from: 50.00,
                    to: 79.99,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80.00,
                    to: 100.00,
                    color: '#55BF3B' // red
                }]
            },

            series: [{
                name: 'อัตราคัดกรอง',
                data: [],
                tooltip: {
                    valueSuffix: ' ร้อยละ'
                }
            }]

        };

        //_.each(data.rows[0].percent, function(v){
            options.series[0].data.push((data.rows[0].percent*1));
       // });

        //console.log(options.series);
        new Highcharts.Chart(options);

};
    rpt.chart.get_meter_z133 = function(data){
        var options = {
            chart: {
                renderTo: 'meter2',
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height:300,
                width:300
            },

            title: {
                text: 'ร้อยละ การคัดกรองโรคซึมเศร้า 15 ปี ขึ้นไป'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 0.1,
                    rotation: 'auto'
                },
                title: {
                    text: 'ร้อยละ'
                },
                plotBands: [{
                    from: 0.0,
                    to: 49.99,
                    color: '#DF5353' // green
                }, {
                    from: 50.00,
                    to: 79.99,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80.00,
                    to: 100.00,
                    color: '#55BF3B' // red
                }]
            },

            series: [{
                name: 'อัตราคัดกรอง',
                data: [],
                tooltip: {
                    valueSuffix: ' ร้อยละ'
                }
            }]

        };

        //_.each(data.rows[0].percent, function(v){
            options.series[0].data.push((data.rows[0].percent*1));
       // });

        //console.log(options.series);
        new Highcharts.Chart(options);

};
    rpt.chart.get_meter_z131 = function(data){
        var options = {
            chart: {
                renderTo: 'meter3',
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height:300,
                width:300
            },

            title: {
                text: 'ร้อยละ การคัดกรองโรคเบาหวาน Z131 15 ปีขึ้นไป'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 0.1,
                    rotation: 'auto'
                },
                title: {
                    text: 'ร้อยละ'
                },
                plotBands: [{
                    from: 0.0,
                    to: 49.99,
                    color: '#DF5353' // green
                }, {
                    from: 50.00,
                    to: 79.99,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80.00,
                    to: 100.00,
                    color: '#55BF3B' // red
                }]
            },

            series: [{
                name: 'อัตราคัดกรอง',
                data: [],
                tooltip: {
                    valueSuffix: ' ร้อยละ'
                }
            }]

        };

        //_.each(data.rows[0].percent, function(v){
            options.series[0].data.push((data.rows[0].percent*1));
       // });

        //console.log(options.series);
        new Highcharts.Chart(options);

};
    rpt.chart.get_meter_z136_z138 = function(data){
        var options = {
            chart: {
                renderTo: 'meter4',
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                height:300,
                width:300
            },

            title: {
                text: 'ร้อยละ การคัดกรองโรคความดันโลหิตสูง 15 ปี ขึ้นไป Z138,Z138'
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 0.1,
                    rotation: 'auto'
                },
                title: {
                    text: 'ร้อยละ'
                },
                plotBands: [{
                    from: 0.0,
                    to: 49.99,
                    color: '#DF5353' // green
                }, {
                    from: 50.00,
                    to: 79.99,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 80.00,
                    to: 100.00,
                    color: '#55BF3B' // red
                }]
            },

            series: [{
                name: 'อัตราคัดกรอง',
                data: [],
                tooltip: {
                    valueSuffix: ' ร้อยละ'
                }
            }]

        };

        //_.each(data.rows[0].percent, function(v){
            options.series[0].data.push((data.rows[0].percent*1));
       // });

        //console.log(options.series);
        new Highcharts.Chart(options);

};



    rpt.get_meter_ncdscreen('2014');
    rpt.get_meter_z133('2014');
     rpt.get_meter_z131('2014');
     rpt.get_meter_z136_z138('2014');

});