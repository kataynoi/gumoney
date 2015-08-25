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
        }

    };

    users.modal = {
        show_mdl_parameter: function () {
            $('#mdl_parameter').modal({
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

    $(document).on('click', 'a[data-name="call_person"]', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        //users.get_user(id);
        users.modal.show_mdl_parameter();
    });

});