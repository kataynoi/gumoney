$(function () {
    var reports = {};
    reports.ajax = {
        get_screen_ckd: function (year,prov_code,cb) {
            var url = '/reports/get_screen_ckd',
                params = {
                    year: year,
                    prov_code:prov_code
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
    }

    reports.set_control_bp = function (data) {
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {

                $('#tbl_list > tbody').append(
                    '<tr>' +
                        '<td>'+no+'</td>'+
                        '<td>'+ v.name+'</td>' +
                        '<td>'+ app.add_commars_with_out_decimal(v.dmht)+'</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m10) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m11) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m12) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m01) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m02) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m03) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m04) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m05) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m06) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m07) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m08) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m09) + '</td>' +
                        '</tr>'
                );
                no=no+1;
                $('#how_to').html(v.how_to);
            });

        }
    };
    reports.set_control_bp_prov = function (data) {
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {

                $('#tbl_list > tbody').append(
                    '<tr>' +
                        '<td>'+no+'</td>'+
                        '<td>'+ v.name+'</td>' +
                        '<td>'+ app.add_commars_with_out_decimal(v.dmht)+'</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m10) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m11) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m12) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m01) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m02) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m03) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m04) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m05) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m06) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m07) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m08) + '</td>' +
                        '<td>' + app.add_commars_with_out_decimal(v.m09) + '</td>' +
                        '</tr>'
                );
                no=no+1;
                $('#how_to').html(v.how_to);
            });

        }


    };

    reports.get_screen_ckd = function (year,prov_code) {
        reports.ajax.get_screen_ckd(year,prov_code, function (err, data) {
            if (err) {
                app.alert(err);
                $('#tbl_list > tbody').append('<tr><td colspan="4">ไม่พบรายการ</td></tr>');
            } else {

                reports.set_control_bp(data);
                reports.chart.get_disease(data);

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
            reports.get_screen_ckd(year,prov_code);
        }
    });

// #### set_waiting list สสจ. สสอ.
    //$('.alert').hide();

    $('#year').on('change',function(){
        var year=($(this).val());
        $('#year1').html((year-1));
        $('#year2').html(year);
    });


// ###### Set Charts

    reports.chart = {};
    reports.chart.get_disease = function(data){
        var options = {
            chart: {
                renderTo: 'chart',
                type: 'column'
            },
            title: {
                text: 'จำนวนผู้ป่วย โรค',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['ตุลาคม','พฤศจิกายน','ธันวาคม','มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน' ]
            },
            yAxis: {
                title: {
                    text: 'จำนวนผู้ป่วย ( ราย)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ' ราย'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            }
        };
                options.series = new Array();
                var i=0;
            _.each(data.rows, function(v){

                options.series[i] = new Object();
                options.series[i].name= v.name;
                options.series[i].data=new Array();;
                options.series[i].data.push(parseFloat(v.m10*1));
                options.series[i].data.push(parseFloat(v.m11*1));
                options.series[i].data.push(parseFloat(v.m12*1));
                options.series[i].data.push(parseFloat(v.m01*1));
                options.series[i].data.push(parseFloat(v.m02*1));
                options.series[i].data.push(parseFloat(v.m03*1));
                options.series[i].data.push(parseFloat(v.m04*1));
                options.series[i].data.push(parseFloat(v.m05*1));
                options.series[i].data.push(parseFloat(v.m06*1));
                options.series[i].data.push(parseFloat(v.m07*1));
                options.series[i].data.push(parseFloat(v.m08*1));
                options.series[i].data.push(parseFloat(v.m09*1));
                i++;
            });
        //console.log(options.series);
        new Highcharts.Chart(options);
    };

});

