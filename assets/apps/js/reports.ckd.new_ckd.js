$(function () {
    var reports = {};

    reports.ajax = {
        get_new_ckd: function (year,prov_code,cb) {
            var url = '/reports/get_new_ckd',
                params = {
                    year: year,
                    prov_code:prov_code
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
    }

    reports.set_new_dmht = function (data) {
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {

                $('#tbl_list_dmht > tbody').append(
            '<tr>' +
                '<td></td>'+
                '<td>'+ v.name+'</td>' +
                '<td>'+ app.add_commars_with_out_decimal(v.dmht_before)+'</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m10) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m11) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m12) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m01) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m02) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m03) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m04) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m05) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m06) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m07) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m08) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.dmht_new_m09) + '</td>' +
                '</tr>'
        );
                no=no+1;
                $('#how_to').html(v.how_to);
            });

        }
    };




    reports.set_new_ckd = function (data) {
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
        $('#tbl_list_ckd > tbody').append(
            '<tr>' +
                '<td></td>'+
                '<td>'+ v.name+'</td>' +
                '<td>'+ app.add_commars_with_out_decimal(v.ckd_before)+'</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m10) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m11) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m12) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m01) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m02) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m03) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m04) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m05) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m06) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m07) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m08) + '</td>' +
                '<td>' + app.add_commars_with_out_decimal(v.ckd_new_m09) + '</td>' +
                '</tr>'
        );
                no=no+1;
                $('#how_to').html(v.how_to);
            });

        }
    };

    reports.get_new_ckd = function (year,prov_code) {
        reports.ajax.get_new_ckd(year,prov_code, function (err,data) {
            if (err) {
                app.alert(err);
                $('#tbl_list > tbody').append('<tr><td colspan="4">ไม่พบรายการ</td></tr>');
            } else {
                reports.set_new_dmht(data);
                reports.set_new_ckd(data);

            }


        });
    };



    $(document).on('click', '#btn_show', function () {
        $('#tbl_list_dmht > tbody').empty();
        $('#tbl_list_ckd > tbody').empty();
        var year = $('#year').val()
        var prov_code=$('#prov_code').val();
        if (!year) {
            app.alert('กรุณาระบุ ปี');
        }else{
            reports.get_new_ckd(year,prov_code);
        }
    });

// #### set_waiting list สสจ. สสอ.
    //$('.alert').hide();

    $('#year').on('change',function(){
        var year=($(this).val());
        $('#year1').html((year-1));
        $('#year2').html(year);
    });

});

