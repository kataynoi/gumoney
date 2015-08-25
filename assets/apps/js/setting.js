$(document).ready(function(){

    var setting = {};
    setting.ajax = {
        save_edit_hserv: function (items, cb) {
            var url = '/settings/save_edit_hserv',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_tambon_list: function (amp, cb) {
            var url = '/basic/get_subdistrict_list',
                params = {
                    amp: amp
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_village_list: function (tmb, cb) {
            var url = '/basic/get_village_list',
                params = {
                    tmb: tmb
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_village_base: function (hospcode, cb) {
            var url = '/basic/get_village_base',
                params = {
                    hospcode: hospcode
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },save_village_base: function (items, cb) {
            var url = '/settings/save_village_base',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },save_year: function (year, cb) {
            var url = '/settings/save_year',
                params = {
                    year: year
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },del_village_base: function (villid, cb) {
            var url = '/settings/del_village_base',
                params = {
                    villid: villid
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
    };


    // Save Edit User
    setting.save_edit_hserv = function(items){
        //app.alert('Save Pass : '+user_id+' : '+password);
        setting.ajax.save_edit_hserv(items, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                alert('แก้ไขข้อมูล เรียบร้อยแล้ว');
            }
        });
    }

    setting.get_tambon_list = function (amp) {

        $('#sl_tambon').empty();

        setting.ajax.get_tambon_list(amp, function (err, data) {
            if (!err) {
                $('#sl_tambon').append('<option value="">-เลือกตำบล-</option>');
                _.each(data.rows, function (v) {
                     $('#sl_tambon').append('<option value="' + v.subdistid + '">[' + v.subdistid + '] ' + v.subdistname + '</option>');
                });
            }
        });

    };
    setting.get_village_list = function (tmb) {

        $('#sl_village').empty();

        setting.ajax.get_village_list(tmb, function (err, data) {
            if (!err) {
                $('#sl_village').append('<option value="">-เลือกหมู่บ้าน-</option>');
                _.each(data.rows, function (v) {
                     $('#sl_village').append('<option value="' + v.villid + '">[ หมู่ ' + v.villno + '] ' + v.villname + '</option>');
                });
            }
        });

    };

    setting.get_village_base = function (hospcode) {

        $('#tbl_village_base > tbody').empty();

        setting.ajax.get_village_base(hospcode, function (err, data) {
            var no=1;
            if (err) {
                $('#tbl_village_base > tbody').append('<tr><td colspan="6">  ยังไม่ได้กำหนด หมู่บ้านรับผิดชอบ </td></tr>');
                }else{
                _.each(data.rows, function (v) {
                     $('#tbl_village_base > tbody').append('<tr><td>'+no+'</td><td>'+ v.villid+'</td><td>'+ v.villname+'</td>' +
                         '<td>'+ v.villno+'</td><td>'+ v.subdistname+'</td><td>'+ v.distname+'</td><td>' +
                         '<a href="#" class="btn btn-danger" data-name="del_village_base" data-id="'+ v.villid+'"><span class="glyphicon glyphicon-remove"></span>ลบ</td></tr>');
               no=no+1;
                });
            }
        });

    };
    setting.save_village_base = function (items) {
        setting.ajax.save_village_base(items, function (err, data) {

            if (err) {
                app.alert('ไม่สามารถเพิ่มหมู่บ้านได้')
                }else{
                setting.get_village_base(items.hospcode);
            }
        });

    };    setting.save_year = function (year) {
        setting.ajax.save_year(year, function (err, data) {

            if (err) {
                app.alert('ไม่สามารถเปลี่ยนแปลง ปี พ.ศ. ได้')
                }else{
                app.alert('เปลี่ยนแปลง ปี พ.ศ.เรียบร้อยแล้ว')
            }
        });

    };

    setting.del_village_base = function (villid) {
        setting.ajax.del_village_base(villid, function (err, data) {

            if (err) {
                app.alert('ไม่สามารถลบหมู่บ้านได้')
                }else{
                app.alert('ลบหมู่บ้านเรียบร้อยแล้ว ');
                setting.get_village_base($('#hospcode').val());
            }
        });

    };


    $('#btn_save_edit_hserv').on('click',function(){
        var items={};
        items.hospcode=$('#hospcode').val();
        items.name = $('#name').val();
        items.title=$('#title').val();
        items.amp_code=$('#amp_code').val();
        items.hserv=$('#hserv').val();

        if (!items.title) {
            app.alert('กรุณาระบุประเภทสถานบริการ');
            $('#tile').focus();
        } else if (!items.name) {
            app.alert('กรุณาระบุ ชื่อสถาบริการ');
            $('#name').focus();
        }else if (!items.hserv) {
            app.alert('กรุณาระบุ รหัสสถานบริการตาม R506');
            $('#hserv').focus();
        }else if(!items.amp_code){
            app.alert('กรุณาระบุ รหัสอำเภอ');
            $('#amp_code').focus();
        }else{
            setting.save_edit_hserv(items);
        }
    });
    $('#btn_save_year').on('click',function(){

        var year=$('#year').val();

            setting.save_year(year);

    });

    $('#btn_set_village_base').on('click',function(){
        var items={};
        items.hospcode=$('#hospcode').val();
        items.villid = $('#sl_village').val();

        if (!items.villid) {
            app.alert('กรุณาเลือกหมู่บ้านก่อน ');
            $('#sl_village').focus();
        }else{
            setting.save_village_base(items);
        }
    });

    $(document).on('click', 'a[data-name="del_village_base"]', function(e) {
        e.preventDefault();
        var villid = $(this).data('id');
        if(confirm('ต้องการลบหมู่บ้านรับผิดชอบ')){
            //app.alert(villid);
            setting.del_village_base(villid);
        }

    });


    $('#sl_amp').on('change', function () {

        var amp = $(this).val();
        setting.get_tambon_list(amp);

    });
    $('#sl_tambon').on('change', function () {

        var tmb = $(this).val();
        setting.get_village_list(tmb);

    });
    var hospcode=$('#hospcode').val();
    setting.get_village_base(hospcode);
});