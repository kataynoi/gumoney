$(document).ready(function(){

    var ckd = {};
    ckd.ajax = {
        check_person_audit: function (cid,hospcode, cb) {
            var url = '/audit/check_person_audit',
                params = {
                    cid: cid,
                    hospcode : hospcode
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_control_bp: function (items, cb) {
            var url = '/reports/get_control_bp',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
};
    ckd.check_person_audit = function(cid,hospcode,items){
        ckd.ajax.check_person_audit(cid,hospcode, function (err, data) {
            if(data.check){
                ckd.get_person(items.cid);
                ckd.get_service(items);
            }else{
                app.alert('ท่านไม่สามารถค้นหาผู้ป่วยที่ท่านไม่ได้รับผิดชอบได้');
            }

        });

    }
ckd.get_control_bp = function(items){
        $('#control_bp_list > tbody').empty();
        ckd.ajax.get_control_bp(items, function (err, data) {
                ckd.set_service(data);

        });

    }
ckd.get_service = function(items){
        $('#service_list >').empty();
        ckd.ajax.get_service(items, function (err, data) {
                ckd.set_service(data);

        });

    }

 ckd.get_person = function(cid){
        $('#tbl_person_list > tbody').empty();
        ckd.ajax.get_person(cid, function (err, data) {
                ckd.set_person(data);

        });

    }
    ckd.set_person=function(data){
        $('#tbl_person_list > tbody').empty();
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {

                $('#tbl_person_list > tbody').append(
                    '<tr>' +
                        '<td>' + no + '</td>' +
                        '<td>' + v.off_name + '</td>' +
                        '<td>' + v.name + '</td>' +
                        '<td>' + v.cid + '</td>' +
                        '<td>' + v.address + '</td>' +
                        '<td>' + v.birth + '</td>' +
                        '<td>' + v.age + '</td>' +
                        '<td>' + v.typearea+ '</td>' +
                        '</tr>'
                );
                no=no+1;

            });
        }
        else {
            $('#tbl_person_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }

    }
ckd.get_visit_list = function(items){
        $('#visit_list').empty();
        ckd.ajax.get_visit_list(items, function (err, data) {
                ckd.set_visit_list(data);
        });

    }
    ckd.set_visit_list=function(data){
        $('#visit_list').empty();
        var no= 1,drug_no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                $('#visit_list').append(
                    '<br><div class="panel panel-primary">' +
                        '<div class="panel-body">' +
                        '<dl class="dl-horizontal col-lg-6">'+
                        '<dt>หน่วยที่บันทึกข้อมูล</dt><dd>'+ v.off_name+'</dd>' +
                        '<dt>อายุ ณ. วันรับบริการ</dt><dd>'+ v.age+'</dd>' +
                        '<dt>BP</dt><dd>'+ v.bp1+'</dd>' +
                        '<dt>Temp</dt><dd>'+ v.temp+'</dd>' +


                        '</dl>'+
                        '<dl class="dl-horizontal col-lg-6">'+
                        '<dt> SEQ </dt><dd>'+ v.seq+'</dd>' +
                        '<dt> RR </dt><dd>'+ v.rr+'</dd>' +
                        '<dt> PR </dt><dd>'+ v.pr+'</dd>' +
                        '</dl>' +
                        '<dl class="dl-horizontal col-lg-12" id="diag_list"><dt></dt><dd></dd></dl>' +
                        '<dl class="dl-horizontal col-lg-12" id="proced_list"><dt></dt><dd></dd></dl>' +
                        '<table id="drug_list" class="table"><thead><th>ลำดับที่</th><th>ชื่อยา</th><th>จำนวนที่จ่าย</th><th>Cost</th><th>Price</th><th>Cost รวม</th><th>Price รวม</th></thead>' +
                        '<tbody></tbody></table>' +
                        '</div></div>'

                );
                _.each(v.diag, function (d) {
                    $('#diag_list').append(
                            '<dt> DiagType : '+ d.DIAGTYPE +' </dt><dd>'+ d.DIAGCODE+':'+d.diseasename+':'+ d.diseasenamethai+'</dd>'
                    );

                });
                _.each(v.proced, function (p) {
                    $('#proced_list').append(
                            '<dt> Procedure : '+ p.PROCED +' </dt><dd>'+ p.diseasefullname+'</dd>'
                    );

                });
                _.each(v.drug, function (drug) {
                    $('#drug_list >tbody').append(
                            '<tr><td>'+drug_no+'</td><td>'+drug.DNAME+'</td><td>'+drug.AMOUNT+'</td><td>'+drug.DRUGCOST+'</td><td>'+drug.DRUGPRICE+'</td><td>'+app.add_commars_with_out_decimal((drug.AMOUNT*1)*(drug.DRUGCOST*1))+'</td><td>'+app.add_commars_with_out_decimal((drug.AMOUNT*1)*(drug.DRUGPRICE*1))+'</td></tr>'
                    );
                drug_no=drug_no+1;
                });
            });
        }
        else {
            $('#tbl_person_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }

    }

    ckd.set_service=function(data){
        $('#service_list').empty();
        var no=1;
        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                $('#service_list').append(
                    '<li class="list-group-item text-center"><span class="badge success pull-left">'+no+'</span> <strong><a href="#" class="btn-link" data-name="btn_service_date" data-visit_date="'+ v.date_serv+'">'+ v.date_serv+'</strong></a></li>'
                );
                no=no+1;

            });
        }
        else {
            $('#tbl_person_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }

    }



    $(document).on('click', 'button[data-name="btn_show"]', function(e) {
        e.preventDefault();
        var items={};
        items.hospcode= $('#sl_office').val();
        items.cupcode=$('#cupcode').val();
        items.date_start=$('#date_start').val();
        items.date_end=$('#date_end').val();
         if(!items.date_start){
            app.alert('กรุณาระบุวันเริ่มต้น');
            $('#date_start').focus();
        }else if(!items.date_end){
            app.alert('กรุณาระบุวันสิ้นสุด');
            $('#date_end').focus()
        }else{
            $('#tbl_control_bp_list').empty();
            ckd.get_control_bp(items);
           // alert(visit_date);
        }
    });
});