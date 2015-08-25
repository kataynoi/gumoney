$(function(){

    var dashboard = {};

    dashboard.ajax = {

        get_dm_total: function(provid,user_level,off_id, cb){
            var url = '/patients/get_dm_total',
                params = {
                    provid: provid,
                    user_level:user_level,
                    off_id:off_id
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_ht_total: function(provid,user_level,off_id, cb){
            var url = '/patients/get_ht_total',
                params = {
                    provid: provid,
                    user_level:user_level,
                    off_id:off_id
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_ckd_total: function(provid,user_level,off_id, cb){
            var url = '/patients/get_ckd_total',
                params = {
                    provid: provid,
                    user_level:user_level,
                    off_id:off_id
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_ckd_dmht_total: function(provid,user_level,off_id, cb){
            var url = '/patients/get_ckd_dmht_total',
                params = {
                    provid: provid,
                    user_level:user_level,
                    off_id:off_id
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        }
    }


    dashboard.get_dm_total = function(provid,user_level,off_id)
    {
        dashboard.ajax.get_dm_total(provid,user_level,off_id,function(err, data){

            if(err)
            {
                app.alert(err);
            }
            else
            {
              $('#dm_total').text(app.add_commars_with_out_decimal(data.total));
            }
        });
    };
    dashboard.get_ht_total = function(provid,user_level,off_id)
    {
        dashboard.ajax.get_ht_total(provid,user_level,off_id,function(err, data){

            if(err)
            {
                app.alert(err);
            }
            else
            {
              $('#ht_total').text(app.add_commars_with_out_decimal(data.total));
            }
        });
    };
    dashboard.get_ckd_total = function(provid,user_level,off_id)
    {
        dashboard.ajax.get_ckd_total(provid,user_level,off_id,function(err, data){

            if(err)
            {
                app.alert(err);
            }
            else
            {
              $('#ckd_total').text(app.add_commars_with_out_decimal(data.total));
            }
        });
    };
    dashboard.get_ckd_dmht_total = function(provid,user_level,off_id)
    {
        dashboard.ajax.get_ckd_dmht_total(provid,user_level,off_id,function(err, data){

            if(err)
            {
                app.alert(err);
            }
            else
            {
              $('#ckd_dmht_total').text(app.add_commars_with_out_decimal(data.total));
            }
        });
    };



    $('#btn_show_chart').on('click', function(){
        var data = {};
        data.year = $('#txt_year').val();
        data.code506 = $('#sl_code506').val();

        if(!data.year)
        {
            app.alert('กรุณาระบุปี');
        }
        else
        {
            dashboard.get_disease(data.year,data.code506);
        }
    });


    /*dashboard.get_dm_total(provid,user_level,off_id);
    dashboard.get_ht_total(provid,user_level,off_id);
    dashboard.get_ckd_total(provid,user_level,off_id);
    dashboard.get_ckd_dmht_total(provid,user_level,off_id);*/
        var reports = {};
        reports.ajax = {
            get_screen_ckd: function (year,cb) {
                var url = '/reports/get_screen_ckd',
                    params = {
                        year: year
                    }
                app.ajax(url, params, function (err, data) {
                    err ? cb(err) : cb(null, data);
                });
            },get_screen_ckd_prov: function (year,url, cb) {
                var url = url+'sum_hcup_ckd_01_01.php',
                    params = {
                        year: year
                    }
                app.ajax_cross(url, params, function (data) {
                    cb(data);
                });
            }
        }


        reports.get_screen_ckd = function (year) {
            reports.ajax.get_screen_ckd(year, function (err, data) {
                if (!err) {

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
                    text: 'จำนวนผู้ป่วย DMHT  ได้รับการคัดกรอง  CKD ปี'+ ((nowyear*1)+543),
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
                        width: 4,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' ราย'
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


    reports.get_screen_ckd((nowyear*1)+543)
    $('#chart2').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'ผู้ป่วย  CKD',
            data: [
                ['ขอนแก่น',   ckd_40],
                ['มหาสารคาม',   ckd_44],
                ['ร้อยเอ็ด',     ckd_45],
                ['กาฬสินธุ์',   ckd_46]
            ]
        }]
    });

});