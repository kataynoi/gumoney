$(document).ready(function(){
    $("#btn_login").removeAttr("disabled");
    //User namespace
    var users = {};
    users.ajax = {
          get_message: function (status,start,stop, cb) {
            var url = '/users/get_message',
                params = {
                    status: status,
                    start:start,
                    stop:stop
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_message_total: function (status, cb) {
            var url = '/users/get_message_total',
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
        },del_message: function (id, cb) {
            var url = '/users/del_message',
                params = {
                    id: id
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },send_message: function (items, cb) {
            var url = '/users/send_message',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }

    };

    users.modal = {
        show_message: function () {
            $('#mdl_message').modal({
                keyboard: false,
                backdrop: 'static'
            })
        },
        hide_message: function() {
            $('#mdl_message').modal('hide');
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

    users.del_message=function($message_id){
        users.ajax.del_message($message_id, function (err, data) {
            if (err) {
                return false;
            } else {
                return true;
        }
    });
    }
    users.get_message = function(status){
        $('#tbl_message_list').show();
        $('#tbl_message_list > tbody').empty()
        $('#frm_send_message').hide();
        $('#main_paging').show();
        users.ajax.get_message_total(status, function (err, data) {
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
                        users.ajax.get_message(status,this.slice[0], this.slice[1], function (err, data) {
                            if (err) {
                                app.alert(err);
                                $('#tbl_message_list > tbody').append('<tr><td colspan="8">ไม่พบรายการ</td></tr>');
                            } else {
                                //alert('set_list');
                                users.set_message_list(data,start);
                                users.equal_height();
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

    users.set_message_list = function (data,start) {
        $('#tbl_message_list > tbody').empty();
        var no=start+1;

        if (_.size(data.rows) > 0) {
            _.each(data.rows, function (v) {
                var tr_read = v.read == '0' ? 'class="warning"' : '';
                $('#tbl_message_list > tbody').append(
                    '<tr ' + tr_read + '>' +
                        '<td>' + no + '</td>' +
                        '<td>' + v.datesend + '</td>' +
                        '<td>' +app.strip(v.title,60) + '</td>' +
                        '<td>' + v.sender + '</td>' +
                        '<td>' + v.reciver + '</td>' +
                        '<td><div class="btn-group pull-right"><a href="javascript:void(0);" class="btn btn-small btn-success" ' +
                        'data-id="' + v.id + '" data-title="' + v.title+'"'+'" data-message="' + v.message +'"'+
                        'data-read="'+ v.read+'"'+
                        'data-name="btn_get_message_detail"><i class="glyphicon glyphicon-edit"></i></a>' +
                        '<a href="javascript:void(0);" class="btn btn-small btn-danger" data-name="btn_del_message" data-id="' + v.id + '">' +
                        '<i class="glyphicon glyphicon-trash"></i></a></div></td>' +
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

    users.equal_height=function(){
        var menu_height=$('#menu_box').height();
        var body_height=$('#body_box').height();
        if(body_height < menu_height){
            var max_height = menu_height;
            $('#body_box').css({ 'height': max_height});
        }else{
            var max_height = body_height;
            $('#menu_box').css({'height': max_height });
        }
    };

    users.send_message=function (items){
        users.ajax.send_message(items, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                app.clear_form();
                alert('ส่งข้อมูลเรียบร้อยแล้ว !!!');
            }
        });
    }

    $(document).on('click', 'a[data-name="btn_get_message_detail"]', function(e) {
        e.preventDefault();

        var message = $(this).data('message');
        var id = $(this).data('id');
        var title = $(this).data('title');
        $(this).parent().parent().parent().removeClass('warning');
        $('#msg_title').html(title);
        $('#msg_message').html(message);
        $('#txt_ap_ptname').html(title);

        users.modal.show_message();
        users.set_read_message(id);

    });

    $(document).on('click', 'a[data-name="btn_del_message"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        if(confirm('ท่านต้องการลบข้อความนี้')){
            users.del_message(id);
            $(this).parent().parent().parent().hide();
        }
    });
    $(document).on('click', 'a[data-name="new_message"]', function(e) {
        e.preventDefault();
        $('#tbl_message_list').hide();
        $('#main_paging').hide();
        app.clear_form();
        $('#frm_send_message').removeClass('hide').show();
    });
    $(document).on('click', 'a[data-name="in_box"]', function(e) {
        e.preventDefault();
        users.get_message('1');

    });
    $(document).on('click', 'a[data-name="out_box"]', function(e) {
        e.preventDefault();
        users.get_message('2');

    });

    $(document).on('click', '#btn_send_message', function(e) {
        e.preventDefault();
        var items={};
        items.sender=$('#txt_sender').val();
        items.reciver = $('#reciver').val();
        items.title=$('#txt_title').val();
        items.message=$('#txt_message').val();
        if (!items.reciver) {
            app.alert('กรุณาระบุ ผู้รับ');
            $('#reciver').focus();
        } else if (!items.title) {
            app.alert('กรุณาระบุ หัวข้อ');
            $('#txt_title').focus();
        } else if (!items.message) {
            app.alert('กรุณาระบุ ข้อความที่ต้องการส่ง');
            $('#txt_message').focus();
        }
        else{
            users.send_message(items);
        }
        app.clear_form();
        $('#tbl_message_list').show();
        $('#main_paging').show();
        $('#frm_send_message').hide();
    });
users.get_message('1');
});