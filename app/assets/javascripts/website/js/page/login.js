;
(function($) {
    var login_form = {
        $user_email: $('#user_email'),
        $user_password: $('#user_password'),
        $btn_login: $('#btn_login'),
        $login_error: $('.login_error'), //错误信息
        login: function() {
            var self = this;
            $('body').append(loading);
            var login_name = $('#user_email').val();
            var pre_url = $('#pre_request_url').val();
            var ps = $('#user_password').val();


            $("#new_user").ajaxSubmit({
                type: 'POST',
                url: $(this).attr('action'),
                dataType: 'json',
                beforeSubmit: function () {

                },
                success: function (data) {
                    close_loading_div();
                    if (data.code == 'S_OK') {
                        if (data.pre_request_url != null && data.pre_request_url != undefined && data.pre_request_url != '') {
                            window.location.href = data.pre_request_url;
                        } else {
                            // 提示错误
                             window.location.href = '/';
                            //self.$login_error.html('该账号异常，请联系客户人员！').show();
                        }
                    } else if (data.code == 'ACCOUNT_DJ') {
                        self.$login_error.html('该账号已经被冻结，请联系客户人员！').show();
                        $('#user_email').focus();
                    }else if (data.code == 'FA_USAR_NOT_EXIT') {
                        self.$login_error.html('用户名或者密码错误，请重新输入!').show();
                        $('#user_email').focus();
                    }
                },
                error: function () {
                    close_loading_div();
                    alert_message('提示','系统异常，请联系客服人员！',null,function(){
                        close_alert_div();
                    })
                }
            });


        },
        //验证
        verify: function() {
            var self = this,
                user_email_val = self.$user_email.val(),
                user_password_val = self.$user_password.val();
            if (!user_email_val || user_email_val.length == 0) {
                self.$login_error.html('账号不能为空').show();
                self.$user_email.focus();
                return false;
            } else if (!user_password_val || user_password_val.length == 0) {
                self.$login_error.html('密码不能为空').show();
                self.$user_password.focus();
                return false;
            } else if (user_password_val.length < 6) {
                self.$login_error.html('密码长度为6位以上！').show();
                self.$user_password.focus();
                return false;
            }
            self.$login_error.html('').hide();
            return true;
        },
        init: function() {
            var self = this;
            //绑定失去焦点
            self.$user_email.on('blur', function() {
                var user_email_val = self.$user_email.val();
                if (!user_email_val || user_email_val.length == 0) {
                    self.$login_error.html('账号不能为空').show();
                } else {
                    self.$login_error.html('').hide();
                }
            });
            //绑定失去焦点
            self.$user_password.on('blur', function() {
                var user_password_val = self.$user_password.val();
                if (!user_password_val || user_password_val.length == 0) {
                    self.$login_error.html('密码不能为空').show();
                } else if (user_password_val.length < 6) {
                    self.$login_error.html('密码长度为6位以上！').show();
                } else {
                    self.$login_error.html('').hide();
                }
            });
            self.$btn_login.on('click', function() {
                if (self.verify()) {
                    self.login();
                }
            });
            $(document).keyup(function(event) {
                if (event.keyCode == 13) {
                    if (self.verify()) {

                        self.login();
                    };
                }
            });
        }
    }
    login_form.init();

})(jQuery);
