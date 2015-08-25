$(document).ready(function(){
    $("#btn_login").removeAttr("disabled");
    //User namespace
    var users = {};
    users.ajax = {
        get_all_users: function (status,amp,hospcode,start,stop, cb) {
            var url = '/users/get_all_users',
                params = {
                    status: status,
                    start:start,
                    stop:stop,
                    amp:amp,
                    hospcode:hospcode
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },
        get_user: function (id, cb) {
            var url = '/users/get_user',
                params = {
                    id: id
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }
        ,get_all_users_total: function (status,amp,hospcode, cb) {
            var url = '/users/get_all_users_total',
                params = {
                    status: status,
                    amp:amp,
                    hospcode:hospcode
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },set_read_message: function (id, cb) {
            var url = '/users/set_read_message',
                params = {
                    id: id
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }

    };

    users.modal = {
        show_user: function () {
            $('#mdl_user').modal({
                keyboard: false,
                backdrop: 'static'
            })
        },
        hide_user: function() {
            $('#mdl_user').modal('hide');
        }
    };
    users.set_read_message=function($message_id){
        users.ajax.set_read_message($message_id, function (err, data) {
            if (err) {
                $('#tbl_message_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
            } else {
                // alert(data.rows);
                $('#new_msg').html(data.rows);

            }
        });
    }
    users.get_all_users = function(status,amp,hospcode){
        $('#tbl_message_list > tbody').empty();
        users.ajax.get_all_users_total(status,amp,hospcode, function (err, data) {
            if (err) {
                //app.alert(err);
                $('#tbl_message_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
            } else {
                //$('#spn_total').html(app.add_commars_with_out_decimal(data.total));
                $('#main_paging').paging(data.total, {
                    format: " < . (qq -) nnncnnn (- pp) . >",
                    perpage: app.record_per_page,
                    lapping: 0,
                    page: app.get_cookie('message_index_paging'),
                    onSelect: function (page) {
                        app.set_cookie('message_index_paging', page);
                        var start=this.slice[0];
                        users.ajax.get_all_users(status,amp,hospcode,this.slice[0], this.slice[1], function (err, data) {
                            if (err) {
                                app.alert(err);
                                $('#tbl_message_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
                            } else {
                                //alert('set_list');
                                users.set_users_list(data,start);
                            }
                        });

                    },
                    onFormat: function (type) {
                        switch (type) {

                            case 'block':

                                if (!this.active)
                                    return '<li class="disabled"><a href="">' + this.value + '</a></li>';
                                else if (this.value != this.page)
                                    return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';
                                return '<li class="active"><a href="#">' + this.value + '</a></li>';

                            case 'right':
                            case 'left':

                                if (!this.active) {
                                    return "";
                                }
                                return '<li><a href="#' + this.value + '">' + this.value + '</a></li>';

                            case 'next':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&raquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&raquo;</a></li>';

                            case 'prev':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&laquo;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&laquo;</a></li>';

                            case 'first':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&lt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&lt;</a></li>';

                            case 'last':

                                if (this.active) {
                                    return '<li><a href="#' + this.value + '">&gt;</a></li>';
                                }
                                return '<li class="disabled"><a href="">&gt;</a></li>';

                            case 'fill':
                                if (this.active) {
                                    return '<li class="disabled"><a href="#">...</a></li>';
                                }
                        }
                        return ""; // return nothing for missing branches
                    }
                });
            }
        });
    }

    users.get_user=function(id){
        users.ajax.get_user(id, function (err, data) {
            if (err) {
                app.alert(err);
            } else {
                users.set_user(data);
            }
        });
    }
    users.set_user = function (data) {
        $('dd').empty();


        if (_.size(data.rows) > 0) {
            $('#name').html(data.rows.name);
            $('#email').html(data.rows.email);
        }
    };


    users.set_users_list = function (data,start) {

        var no=start+1;

        if (_.size(data.rows) > 0) {
            $('#tbl_message_list > tbody').empty();
            _.each(data.rows, function (v) {
                var tr_read = v.read == '0' ? 'class="warning"' : '';
                $('#tbl_message_list > tbody').append(
                    '<tr ' + tr_read + '>' +
                        '<td>' + no + '</td>' +
                        '<td><a href="javascript:void(0);" class="icon-external-link"' +
                        'data-id="' + v.id + '" data-title="' + v.title+'"'+'" data-message="' + v.message +'"'+
                        'data-read="'+ v.read+'"'+
                        'data-name="btn_get_user_detail">'+app.strip(v.name,60)+'</a></td>' +
                        '<td>' + app.strip(v.off_name,60)+ '</td>' +
                        '<td>' + v.login_time+ '</td>' +
                        '<td>' + v.in_time+ '</td>' +
                        '<td><div class="btn-group"><a href="'+site_url+'/users/send_message/'+ v.id+'" class="btn btn-default" data-name="btn_send_message" data-id="' + v.id + '">' +
                        '<i class="glyphicon glyphicon-comment" title="ส่งข้อความ" data-rel="tooltip"  data-original-title="ส่งข้อความ"></i></a>' +
                        '<a class="btn btn-warning btn-disabled" disabled><i class="glyphicon glyphicon-envelope" title="ส่ง Email" data-rel="tooltip"  data-original-title="ส่ง Email"></i></a></td></div>'+
                        '</tr>'
                );
                v.id='';v.title='';v.message='';v.datesend='';
                no=no+1;
            });

        }
        else {
            $('#tbl_message_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }
    };



    $(document).on('click', 'a[data-name="btn_get_user_detail"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        users.get_user(id);
        users.modal.show_user();
    });
    $('#btn_show').on('click',function(){
        var amp=$('#distid').val();
        var hospcode=$('#sl_office').val();
        users.get_all_users('1',amp,hospcode);
    });

    users.get_all_users('1','','');
});