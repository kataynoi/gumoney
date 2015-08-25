$(function(){

    var page = {};
    page.modal = {
        show_login_form: function () {
            $('#mdl_login').modal({
                keyboard: false,
                backdrop: 'static'
            })
        },
        hide_login_form: function () {
            $('#mdl_login').modal('hide');

        }
    };
    page.ajax = {

        get_office_total: function(provid, cb){
            var url = '/pages/get_office_total_by_amp',
                params = {
                    provid: provid
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        },get_top10: function(year, cb){
            var url = '/pages/get_top10',
                params = {
                    year: year
                };

            app.ajax(url, params, function(err, data){
                err ? cb(err) : cb(null, data);
            });
        }
    }



    $('#btn_login').on('click', function(){
        //app.alert('Login');
        //page.modal.show_login_form();

    });
});