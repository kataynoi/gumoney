$(document).ready(function(){
    $("#btn_login").removeAttr("disabled");
    //User namespace
    var users = {};
    users.ajax = {
        save_password: function (user_id, password, cb) {
            var url = '/users/save_pass',
                params = {
                    user_id: user_id,
                    password: password
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },
        save_edit_user: function (items, cb) {
            var url = '/users/save_edit_user',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },
        save_register: function (items, cb) {
            var url = '/users/save_register',
                params = {
                    items: items
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },
        get_message: function (status, cb) {
            var url = '/users/get_message',
                params = {
                    items: status
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_duplicate_user: function (id,username, cb) {
            var url = '/users/get_duplicate_user',
                params = {
                    id:id,
                    username: username
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },get_duplicate_email: function (id,email, cb) {
            var url = '/users/get_duplicate_email',
                params = {
                    id:id,
                    email: email
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        },send_mail_forget_pass: function (username,email, cb) {
            var url = '/mail/mail_to_re_password',
                params = {
                    username:username,
                    email: email
                }

            app.ajax(url, params, function (err, data) {
                err ? cb(err) : cb(null, data);
            });
        }

    };

    users.save_password = function(user_id,password){
        //app.alert('Save Pass : '+user_id+' : '+password);
        users.ajax.save_password(user_id,password, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                alert('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ อีคกรั้ง');
                window.location = 'logout';
            }
        });
    }
    // Save Edit User
    users.save_edit_user = function(items){
        //app.alert('Save Pass : '+user_id+' : '+password);
        users.ajax.save_edit_user(items, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                alert('แก้ไขข้อมูล เรียบร้อยแล้ว กรุณาเข้าสู่ระบบ อีคกรั้ง');
            }
        });
    }
    users.save_register = function(items){
        //app.alert('Save Pass : '+user_id+' : '+password);
        users.ajax.save_register(items, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                alert('ลงทะเบียนเรียบร้อย รอการอนุมัติ เข้าระบบ โดยจะแจ้งผลการลงทะเบียนทาง Email');
                window.location = 'login';
            }
        });
    }

    $('#txt_password').bind('keypress', function(e) {
        if(e.keyCode==13){
            users.check_login();
        }
    });
    $('#username').bind('change', function() {
        var username=$(this).val(),id=$('#id').val();
        users.ajax.get_duplicate_user(id,username, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                var tt =data.total;
                if(tt >0){
                    app.alert('ท่านไม่สามารถใช้ Username นี้ได้');
                    $('#btn_save_edit_user').prop('disabled', true);
                    $('#btn_save_register').prop('disabled', true);
                    $('#check_user').empty().removeClass('text-success').addClass('text-danger').html('ท่านไม่สามารถใช้ Username นี้ได้');
                }else{
                    $('#btn_save_edit_user').prop('disabled',false);
                    $('#btn_save_register').prop('disabled',false);
                    $('#check_user').empty().removeClass('text-danger').addClass('text-success').html('สามารถใช้ Username นี้ได้');
                }

            }
        });
    });

    //ตรวจสอบ Email ซ้ำ
    $('#email').bind('change', function() {
        var email=$(this).val(),id=$('#id').val();
        users.ajax.get_duplicate_email(id,email, function (err, data) {
            if (err) {
                app.alert(err);
            }
            else {
                var tt =data.total;
                if(tt >0){
                    app.alert('มีผู้ใช้ Email นี้แล้วในระบบ');
                    $('#btn_save_edit_user','#btn_save_register').prop('disabled', true);
                    $('#check_email').empty().removeClass('text-success').addClass('text-danger').html('ท่านไม่สามารถใช้ Email นี้ได้');
                }else{
                    $('#btn_save_edit_user','#btn_save_register').prop('disabled',false);
                    $('#check_email').empty().removeClass('text-danger').addClass('text-success');
                }

            }
        });
    });

    $('#btn_forget_pass').on('click',function(){
        $('#frm_login').hide();
        $('#frm_forgot_pass').show();

    });$('#send_mail_forget_pass').on('click',function(e){
        e.preventDefault();
        var username=$('#txt_repass_username').val(),email=$('#txt_repass_email').val();
        users.ajax.send_mail_forget_pass(username,email, function (err, data) {
            //console.log(data);
            if (err) {
                app.alert(err);
            }
            else {

                if(data.success){
                    app.alert('ส่งข้อมูลไป ที่'+ email +' แล้ว กรุณาตรวจสอบ ');
                }else{
                    app.alert('Username หรือ Email นี้ไม่มีอยู่ในระบบ');
                }
            }
        });
    });
    $('#btn_back').on('click',function(){
        $('#frm_login').show();
        $('#frm_forgot_pass').hide();
    });
    $('#frm_login').on('submit', function(e) {
        return users.check_login();
    });

    $('#btn_save_pass').on('click',function(){
        var items={};
        items.user_id=$('#user_id').val();
        items.password = $('#newPass').val();
        items.repassword=$('#rePass').val();
        if (!items.password) {
            app.alert('กรุณาระบุ หรัสผ่าน');
            $('#newPass').focus();
        } else if (items.password.length<4) {
            app.alert('กรุณาระบุการรหัสผ่าน มากกว่า 4 ตัวอักษร');
            $('#newPass').focus();
        } else if (!items.repassword) {
            app.alert('กรุณาระบุการยืนยันรหัสผ่าน');
            $('#rePass').focus();
        } else if (items.repassword.length<4) {
            app.alert('กรุณาระบุการรหัสผ่าน มากกว่า 4 ตัวอักษร');
            $('#rePass').focus();
        }else if(items.password != items.repassword){
            app.alert('การยืนยันรหัสผ่านไม่ตรงกัน');
            $('#rePass').focus();
        }
        else{
            users.save_password(items.user_id,items.password);
        }
    });

    $('#btn_save_edit_user').on('click',function(){
        var items={};
        items.id=$('#id').val();
        items.name = $('#name').val();
        items.cid=$('#cid').val();
        items.email=$('#email').val();
        items.user_mobile=$('#user_mobile').val();
        items.username=$('#username').val();
        items.nickname=$('#nickname').val();
        items.office=$('#office').val();
        items.position=$('#position').val();
        if (!items.name) {
            app.alert('กรุณาระบุ ชื่อสกุล');
            $('#name').focus();
        } else if (items.cid.length<13) {
            app.alert('กรุณาระบุ เลขบัตรประชาชนให้ถูกต้อง');
            $('#newPass').focus();
        }else if (!items.email) {
            app.alert('กรุณาระบุ email');
            $('#email').focus();
        }else if(!items.username){
            app.alert('กรุณาระบุ Username');
            $('#username').focus();
        }else{
            users.save_edit_user(items);
        }
    });

    $('#btn_save_register').on('click',function(){
        var items={};
        items.id=$('#id').val();
        items.name = $('#name').val();
        items.cid=$('#cid').val();
        items.email=$('#email').val();
        items.user_mobile=$('#user_mobile').val();
        items.username=$('#username').val();
        items.password=$('#password').val();
        items.nickname=$('#nickname').val();
        items.office=$('#office').val();
        items.position=$('#position').val();
        items.sys_id=$('#sys_id').val();
        if (!items.name) {
            app.alert('กรุณาระบุ ชื่อสกุล');
            $('#name').focus();
        } else if (items.cid.length<13) {
            app.alert('กรุณาระบุ เลขบัตรประชาชนให้ถูกต้อง');
            $('#newPass').focus();
        }else if (!items.email) {
            app.alert('กรุณาระบุ email');
            $('#email').focus();
        }else if(!items.username){
            app.alert('กรุณาระบุ Username');
            $('#username').focus();
        }else if(!items.password){
            app.alert('กรุณาระบุ Password');
            $('#password').focus();
        }else if(items.password.length < 4){
            app.alert('กรุณาระบุ Password มากกว่า 4 ตัวอักษร');
            $('#password').focus();
        }else if(!items.office){
            app.alert('กรุณาระบุ สถานบริการ');
            $('#office').focus();
        }else if(!items.position){
            app.alert('กรุณาระบุ ตำแหน่ง');
            $('#position').focus();
        }
        else{
            users.save_register(items);
        }
    });
});