$(document).ready(function(){
    $("#btnDoLogin").removeAttr("disabled");
    //User namespace
    var user = {};
    user.ds = {};

    user.check_login = function(){

        $("#btnDoLogin").attr("disabled", "disabled");

        var items = {};
        items.username = $('#txtUsername').val();
        items.password = $('#txtPassword').val();

        if(!items.username){
            //alert('กรุณาระบุชื่อผู้ใช้งาน');
            app.alert('กรุณาระบุชื่อผู้ใช้งาน');
            $("#btnDoLogin").removeAttr("disabled");
        }else if(!items.password){
            //alert('กรุณาระบุรหัสผ่าน');
            app.alert('กรุณาระบุรหัสผ่าน');
            $("#btnDoLogin").removeAttr("disabled");
        }else{
            var url = 'http://localhost/usercenter/index.php/webservice/do_auth?callback=?';
            //var url = 'http://203.157.185.7/usercenter/index.php/webservice/do_auth?callback=?';
            $.ajax({
                url:url,
                dataType:'json',
                type:'POST',
                data: {username:items.username,password:items.password,sys_id:'2'},
                success:function (data) {
                    if (data.success) {

                        $.get(base_url+"index.php/users/user_session/",{csrf_token_name:csrf_token,datajson:data},
                            function(data){
                                location.reload();
                            });
                    }else{
                        $("#btnDoLogin").removeAttr("disabled");
                        app.alert('ข้อมูลไม่ถูกต้องกรุณาเข้าสู่ระบบอีกครั้ง');
                    }
                },
                error:function (xhr, status, errorThrown) {
                    console.log('เกิดข้อผิดพลาด: ' + xhr.status + ': ' + xhr.statusText);
                }
            });
        }
    }

    //Namespace for ajax
    user.ajax = {
        //Do login
        do_login: function(items, cb){
            var url = 'users/do_login',
                params = {
                    username: items.username,
                    password: items.password
                };
            app.ajax(url, params, function(err){
                if(err){
                    cb(err);
                }else{
                    cb(null);
                }
            });
        }
    };

    $('#txtPassword').bind('keypress', function(e) {
        if(e.keyCode==13){
            user.check_login();
        }
    });

    //Do login
    $('#btnDoLogin').click(function(){
        user.check_login();
    });

    $('#btnDoLogout').on('click',function(){
        //alert('sdfgdgdfg');
        if(confirm('คุณต้องการออกจากระบบ')){
            window.location.replace(site_url+"/users/logout");
        };

    });
});