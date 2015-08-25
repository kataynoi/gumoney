$(document).ready(function(){
    $("#btn_login").removeAttr("disabled");
    //User namespace

    var users = {};
    users.ajax = {
        get_all_users: function (status,start,stop, cb) {
            var url = '/users/get_all_users',
                params = {
                    status: status,
                    start:start,
                    stop:stop
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
        ,get_all_users_total: function (status, cb) {
            var url = '/users/get_all_users_total',
                params = {
                    status: status
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
        },get_waiting_users_total: function (sys_id, cb) {
            var url = '/users/get_waiting_users_total',
                params = {
                    sys_id: sys_id
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_waiting_users: function (sys_id,start,stop, cb) {
            var url = '/users/get_waiting_users',
                params = {
                    sys_id: sys_id
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },set_approve_user: function (id,sys_id, cb) {
            var url = '/users/set_approve_user',
                params = {
                    sys_id: sys_id,
                    id:id
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },send_mail_approve: function (id,sys_id,email, cb) {
            var url = '/mail/send_mail_approve',
                params = {
                    sys_id: sys_id,
                    id:id,
                    email:email
                }
            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },set_del_user: function (id,sys_id, cb) {
            var url = '/users/set_del_user',
                params = {
                    sys_id: sys_id,
                    id:id
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
            $('#mdl_edit_user').modal('hide');
        },
        show_edit_user: function () {
            $('#mdl_edit_user').modal({
                keyboard: false,
                backdrop: 'static'
            })
        },
        hide_edit_user: function() {
            $('#mdl_edit_user').modal('hide');
        }
    };
    users.set_read_message=function($message_id){
        users.ajax.set_read_message($message_id, function (err, data) {
            if (err) {
                $('#tbl_users_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
            } else {
                // alert(data.rows);
                $('#new_msg').html(data.rows);

            }
        });
    }
    users.get_all_users = function(status){
        users.ajax.get_all_users_total(status, function (err, data) {
            if (err) {
                //app.alert(err);
                $('#tbl_users_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
            } else {
                $('#tbl_users_list > tbody').empty();
                $('#spn_total').html(app.add_commars_with_out_decimal(data.total));
                $('#main_paging').paging(data.total, {
                    format: " < . (qq -) nnncnnn (- pp) . >",
                    perpage: app.record_per_page,
                    lapping: 0,
                    page: app.get_cookie('message_index_paging'),
                    onSelect: function (page) {
                        app.set_cookie('message_index_paging', page);
                        var start=this.slice[0];
                        users.ajax.get_all_users(status,this.slice[0], this.slice[1], function (err, data) {
                            if (err) {
                                app.alert(err);
                                $('#tbl_users_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
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
    users.get_waiting_users = function(){
        users.ajax.get_waiting_users_total(sys_id, function (err, data) {
            if (err) {
                //app.alert(err);
                $('#tbl_waiting_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
            } else {
                $('#tbl_waiting_list > tbody').empty();
                $('#spn_wait').html(app.add_commars_with_out_decimal(data.total));
                $('#main_paging').paging(data.total, {
                    format: " < . (qq -) nnncnnn (- pp) . >",
                    perpage: app.record_per_page,
                    lapping: 0,
                    page: app.get_cookie('message_index_paging'),
                    onSelect: function (page) {
                        app.set_cookie('message_index_paging', page);
                        var start=this.slice[0];
                        users.ajax.get_waiting_users(sys_id,this.slice[0], this.slice[1], function (err, data) {
                            if (err) {
                                app.alert(err);
                                $('#tbl_users_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
                            } else {
                                //alert('set_list');
                                users.set_waiting_users_list(data,start);
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

    users.approve_user=function(id,email){
        users.ajax.set_approve_user(id,sys_id, function (err, data) {
            if (err) {
                app.alert(err);
            } else {
                app.alert('อนุมัติ เรียบร้อย');
                users.ajax.send_mail_approve(id,sys_id,email, function (err, data) {
                    if (err) {
                        app.alert(err);
                    } else {
                        app.alert('ส่งเมลล์ เรียบร้อย');

                    }
                });
            }
        });
    }
    users.del_user=function(id){
        users.ajax.set_del_user(id,sys_id, function (err, data) {
            if (err) {
                app.alert(err);
            } else {
                app.alert('ลบ เรียบร้อย');
                users.get_waiting_users();
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
        $('#tbl_users_list > tbody').empty();
        var no=start+1;

        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                var tr_read = v.read == '0' ? 'class="warning"' : '';
                $('#tbl_users_list > tbody').append(
                    '<tr ' + tr_read + '>' +
                        '<td>' + no + '</td>' +
                        '<td><a href="javascript:void(0);" class="icon-external-link"' +
                        'data-id="' + v.id + '" data-title="' + v.title+'"'+'" data-message="' + v.message +'"'+
                        'data-read="'+ v.read+'"'+
                        'data-name="btn_get_user_detail">'+app.strip(v.name,60)+'</a></td>' +
                        '<td>' + app.strip(v.off_name,60)+ '</td>' +
                        '<td><div class="btn-group"><a href="'+site_url+'/users/send_message/'+ v.id+'" class="btn btn-default" data-name="btn_send_message" data-id="' + v.id + '">' +
                        '<i class="glyphicon glyphicon-comment" title="ส่งข้อความ" data-rel="tooltip"  data-original-title="ส่งข้อความ"></i></a>' +
                        '<a class="btn btn-warning btn-disabled" disabled><i class="glyphicon glyphicon-envelope" title="ส่ง Email" data-rel="tooltip"  data-original-title="ส่ง Email"></i></a>' +
                        '<a href="#" data-name="btn_del_user" data-id="'+ v.id+'" class="btn btn-danger"><i class="glyphicon glyphicon-trash" title="ลบผู้ใช้" data-rel="tooltip"  data-original-title="ลบผู้ใช้"></i></a>'+
                        '<a href="#" data-name="btn_edit_user" data-id="'+ v.id+'" class="btn btn-warning"><i class="glyphicon glyphicon-edit" title="แก้ไข" data-rel="tooltip"  data-original-title="แก้ไข"></i></a></div></td>'+
                        '</tr>'
                );
                v.id='';v.title='';v.message='';v.datesend='';
                no=no+1;
            });

        }
        else {
            $('#tbl_users_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }
    };
    users.set_waiting_users_list = function (data,start) {
        $('#tbl_waiting_list > tbody').empty();
        var no=start+1;

        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                var tr_read = v.read == '0' ? 'class="warning"' : '';
                $('#tbl_waiting_list > tbody').append(
                    '<tr ' + tr_read + '>' +
                        '<td>' + no + '</td>' +
                        '<td><a href="javascript:void(0);" class="icon-external-link"' +
                        'data-id="' + v.id + '" data-title="' + v.title+'"'+'" data-message="' + v.message +'"'+
                        'data-name="btn_get_user_detail">'+app.strip(v.name,60)+'</a></td>' +
                        '<td>' + app.strip(v.off_name,60)+ '</td>' +
                        '<td><div class="btn-group"><a href="javascript:void(0);" class="btn btn-success" data-email="'+ v.email+'" data-name="btn_approve_user" data-id="' + v.id + '">' +
                        '<i class="glyphicon glyphicon-ok-circle" title="อนุมัติ" data-rel="tooltip"  data-original-title="อนุมัติ"></i> อนุมัติ</a>' +
                        '<a href="javascript:void(0);" data-name="btn_del_user" class="btn btn-danger"  data-id="' + v.id + '"><i class="glyphicon glyphicon-trash" title="ลบ" data-rel="tooltip"  data-original-title="ส่ง Email"></i> ลบ</a></td></div>'+
                        '</tr>'
                );
                v.id='';v.title='';v.message='';v.datesend='';
                no=no+1;
            });

        }
        else {
            $('#tbl_waiting_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
        }
    };



    $(document).on('click', 'a[data-name="btn_get_user_detail"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        users.get_user(id);
        users.modal.show_user();
    });
    $(document).on('click', 'a[data-name="btn_approve_user"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        var email = $(this).data('email');
        users.approve_user(id,email);
    });
    $(document).on('click', 'a[data-name="btn_del_user"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('ต้องการลบ User นี้')){
            users.del_user(id);
            $(this).parent().parent().hide();
        }

    });

    $(document).on('click', 'a[data-name="btn_edit_user"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        users.get_user(id);
        users.modal.show_edit_user();

    });
    $('a[href="#tab_users"]').on('click', function () {
        users.get_all_users('1');
    });
    $('a[href="#tab_wait"]').on('click', function () {
        users.get_waiting_users();
    });

    users.get_all_users('1');
    users.ajax.get_waiting_users_total(sys_id, function (err, v) {

        $('#spn_wait').html(app.add_commars_with_out_decimal(v.total));

    });
});