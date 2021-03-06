$(function () {
    var reports = {};
    var rpt={};
    reports.ajax = {
        get_control_iPTH5: function (year,prov_code,cb) {
            var url = '/reports/get_control_iPTH5',
                params = {
                    year: year,
                    prov_code:prov_code
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
    }

    reports.set_control_iPTH5 = function (data) {
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                $('#tbl_list > tbody').append(
                    '<tr>' +
                        '<td>'+no+'</td>'+
                        '<td>'+ v.name+'</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.ckd_result_all) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.ckd_result_ok) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.ckd_result_not_ok) + '</td>' +
                        '</tr>'
                );
                no=no+1;
                $('#how_to').html(v.how_to);
            });

        }
    };

    reports.get_control_iPTH5 = function (year,prov_code) {
        reports.ajax.get_control_iPTH5(year,prov_code, function (err,data) {

            if (err) {
                app.alert(err);
                $('#tbl_list > tbody').append('<tr><td colspan="4">ไม่พบรายการ</td></tr>');
            } else {
                reports.set_control_iPTH5(data);
                rpt.chart.set_chart(data);
            }
        });
    };



    $(document).on('click', '#btn_show', function () {
        $('#tbl_list > tbody').empty();
        var year = $('#year').val()
        var prov_code=$('#prov_code').val();
        if (!year) {
            app.alert('กรุณาระบุ ปี');
        }else{
            reports.get_control_iPTH5(year,prov_code);

        }
    });

// #### set_waiting list สสจ. สสอ.
    //$('.alert').hide();

    $('#year').on('change',function(){
        var year=($(this).val());
        $('#year1').html((year-1));
        $('#year2').html(year);
    });



// ############  Set_chart
    rpt.chart = {};
    rpt.chart.set_chart = function(data){
        var options = {
            chart: {
                renderTo: 'chart',
                type: 'column'
            },
            title: {
                text: ' จำนวนผู้ป่วย CKD Stage 5 ได้รับการตรวจ iPTH ที่เหมาะสม ( iPTH 150-300 pg/ml)'
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                min: 0,
                title: {
                    text: ' จำนวนผู้ป่วย'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: ' iPTH 150-300 pg/ml',
                data: []
            }, {
                name: 'iPTH Not Between 150-300 pg/ml',
                data: []
            }]
        };

        //options.series = new Array();
        var i=0;
        _.each(data.rows, function(v){
            options.xAxis.categories.push(v.name);
            options.series[0].data.push(parseFloat(v.ckd_result_ok*1));
            options.series[1].data.push(parseFloat(v.ckd_result_not_ok*1));
            i++;
        });
        new Highcharts.Chart(options);
    };

});

