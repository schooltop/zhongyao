;
(function($) {

    //拖动方法
    $.fn.drag = function(options) {
        var x, drag = this,
            isMove = false,
            defaults = {};
        var options = $.extend(defaults, options);
        //添加背景，文字，滑块
        var html = '<div class="drag_bg"></div>' +
            '<div class="drag_text" onselectstart="return false;" unselectable="on">请按住滑块,拖动到最右边</div>' +
            '<div class="handler handler_bg"></div>';
        this.append(html);

        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width(); //能滑动的最大间距

        if ($('#drag').attr('data-drag') == 'false') {
            //鼠标按下时候的x轴的位置
            handler.mousedown(function(e) {
                isMove = true;
                x = e.pageX - parseInt(handler.css('left'), 10);
            });

            //鼠标指针在上下文移动时，移动距离大于0小于最大间距，滑块x轴位置等于鼠标移动距离
            $(document).mousemove(function(e) {
                var _x = e.pageX - x;
                // if(isMove && $('#drag').attr('data-drag') == 'false'){
                if (isMove) {
                    if (_x > 0 && _x <= maxWidth) {
                        handler.css({ 'left': _x });
                        drag_bg.css({ 'width': _x });
                    } else if (_x > maxWidth) { //鼠标指针移动距离达到最大时清空事件
                        handler.css({ 'left': maxWidth });
                        drag_bg.css({ 'width': maxWidth });
                        dragOk();
                    }
                }
            }).mouseup(function(e) {
                isMove = false;
                var _x = e.pageX - x;
                if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                    handler.css({ 'left': 0 });
                    drag_bg.css({ 'width': 0 });
                }
            });
        }

        //清空事件
        function dragOk() {
            //设置验证通过的开关
            $('#drag').attr('data-drag', 'true');
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('验证通过');
            drag.css({ 'color': '#fff' });
            handler.unbind('mousedown');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $('#drag').next().hide();
        }
    };

    $('#drag').drag();

    var forgot_pwd = {
        $user_email: $('#user_email'),
        $user_password: $('#user_password'),
        $confirm_password: $('#confirm_password'),
        // $slider: $('#slider'),
        // $registerBtn: $('#registerBtn'),
        $yanzheng: $('#yanzheng'), //验证码输入框
        $yzbtn: $('#yzbtn'),
        $registerBtn_two: $('#registerBtn_two'), //获取验证码
        $drag: $('#drag'), //拖动验证
        $registerBtn_step_one: $('#registerBtn_step_one'),
        $registerBtn_step_two: $('#registerBtn_step_two'),
        $forgotPwd_form1: $('#step_one_2'),
        $forgotPwd_form2: $('#step_two_2'),
        $forgotPwd_form3: $('#step_three_2'),
        wait : 6,										//获取验证码倒计时
        wait_miao : 5,									//页面跳转倒计时
        $miao_jump : $('#miao_jump'),					//页面跳转倒计时显示
        //验证账号
        verify: function() {
            var self = this,
                user_email_val = self.$user_email.val();
            if (!user_email_val || user_email_val.length == 0) {
                self.$user_email.parent().find('.success').hide();
                self.$user_email.parent().find('.error').show().find('span').html('账号不能为空!');
                return false;
            } else if (!$.trim(user_email_val).match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) && !(/^1(3|4|5|7|8)\d{9}$/.test($.trim(user_email_val)))) {
                self.$user_email.parent().find('.success').hide();
                self.$user_email.parent().find('.error').show().find('span').html('请输入正确的邮箱或手机!');
                // $("#yzbtn").attr("disabled", "disabled").css("background-color", "#eeeeee").css("border", "#eeeeee solid 1px").css("color", "white");
                return false;
            } else {
                self.$user_email.parent().find('.error').hide().find('span').html('');
                self.$user_email.parent().find('.success').show();
                // $(".huadong").nextAll().remove();
                // $("#yzbtn").removeAttr("disabled").removeAttr("style");
                return true;
            };
        },
        //验证验证码
        verify1: function() {
            var self = this,
                yanzheng_val = self.$yanzheng.val();
            if (!yanzheng_val || yanzheng_val.length == 0) {
                self.$yanzheng.parent().find('.success').hide();
                self.$yanzheng.parent().find('.error').show().find('span').html('验证码不能为空!');
                return false;
            } else if (yanzheng_val.length < 4) {
                self.$yanzheng.parent().find('.success').hide();
                self.$yanzheng.parent().find('.error').show().find('span').html('请输入4位验证码!');
                return false;
            } else {
                self.$yanzheng.parent().find('.error').hide().find('span').html('');
                self.$yanzheng.parent().find('.success').show();
                return true;
            }
        },
        //验证拖动
        verify2: function() {
            var self = this;
            if (self.$drag.attr('data-drag') == 'true') {
                self.$drag.parent('dd').find('.error').hide().find('span').html('');
                // self.$drag.parent('dd').find('.success').show();
                return true;
            } else {
                // self.$drag.parent('dd').find('.success').hide();
                self.$drag.parent('dd').find('.error').show().find('span').html('验证不正确!');
                return false;
            }
        },
        //验证密码
        verify3: function() {
            var self = this,
                user_password_val = self.$user_password.val(),
                confirm_password_val = self.$confirm_password.val();
            if (!user_password_val || user_password_val.length == 0) {
                self.$user_password.parent().find('.success').hide();
                self.$user_password.parent().find('.error').show().find('span').html('密码不能为空!');
                return false;
            } else if (user_password_val.length < 6) {
                self.$user_password.parent().find('.success').hide();
                self.$user_password.parent().find('.error').show().find('span').html('请输入6位以上密码!');
                return false;
            } else {
                self.$user_password.parent().find('.error').hide().find('span').html('');
                self.$user_password.parent().find('.success').show();
                if (user_password_val == confirm_password_val) {
                    self.$confirm_password.parent().find('.error').hide().find('span').html('');
                    self.$confirm_password.parent().find('.success').show();
                }
                return true;
            }
        },
        //验证确认密码
        verify4: function() {
            var self = this,
                user_password_val = self.$user_password.val(),
                confirm_password_val = self.$confirm_password.val();
            if (!confirm_password_val || confirm_password_val.length == 0) {
                self.$confirm_password.parent().find('.success').hide();
                self.$confirm_password.parent().find('.error').show().find("span").html('确认密码不能为空!');
                return false;
            } else if (confirm_password_val.length < 6) {
                self.$confirm_password.parent().find('.success').hide();
                self.$confirm_password.parent().find('.error').show().find('span').html('请输入6位以上密码!');
                return false;
            } else if (user_password_val != confirm_password_val) {
                self.$confirm_password.parent().find('.success').hide();
                self.$confirm_password.parent().find('.error').show().find('span').html('重复密码与上方密码不一致!');
                return false;
            } else {
                self.$confirm_password.parent().find('.error').hide().find('span').html('');
                self.$confirm_password.parent().find('.success').show();
                return true;
            }
        },
        forgot_pwd_code: function() {
            var self = this;
            $('body').append(loading);
            $.ajax({
                url: '/send_verification_code',
                data: { register_email: $("#user_email").val() },
                type: "post",
                dataType: 'json',
                success: function(data, status, xhr) {
                    if (data.success) {
                        //$("#yzbtn").parent().append("<div style='color: #f73e00'>" + data.msg + "</div>");
                        self.$yzbtn.parent().find('.error').show().find('span').html(data.msg);
                        self.$yzbtn.parent().find('.success').hide();
                        self.get_code_time();
                    } else {

                        //$("#yzbtn").parent().append("<div style='color: #f73e00'>" + data.msg + "</div>")
                        self.$yzbtn.parent().find('.error').show().find('span').html(data.msg);
                        self.$yzbtn.parent().find('.success').hide();
                        self.get_code_time();
                    }
                    close_loading_div();

                },
                error: function(data, status, xhr) {
                    close_loading_div();
                    alert_message('提示','系统异常，请联系客服人员！',null,function(){
                        close_alert_div();
                    })

                }
            });
        },
        forgot_pwd: function() {
            var self = this;
            $("#new_user").ajaxSubmit({
                type: 'POST',
                url: $(this).attr('action'),
                dataType: 'json',
                beforeSubmit: function() {
                    if (self.verify3()  && self.verify4()) {
                        $('body').append(loading);
                   }else{
                        return false;
                    }

                },
                success: function(data) {
                    close_loading_div();
                    if (data.success) { //成功
                        // 显示tab
                        self.$forgotPwd_form1.hide();
                        self.$forgotPwd_form2.hide();
                        self.$forgotPwd_form3.show();
                        //显示高亮
                        $('#step_three_1').addClass('active');
                        self.get_code_time_miao();
                        return false;
                    } else {
                        self.$confirm_password.parent().find('.error').show().find('span').html(data.message);
                        self.$confirm_password.parent().find('.success').hide();
                    }
                },
                error: function() {
                    close_loading_div();
                    alert_message('提示','系统异常，请联系客服人员！',null,function(){
                        close_alert_div();
                    })
                }
            });
        },
        get_code_time : function () {
            var self = this;
            if (self.wait == 0) {
                self.$yzbtn.removeAttr('disabled');
                self.$yzbtn.val("获取验证码");
                self.wait = 6;
                return true;
            } else {
                self.$yzbtn.val(self.wait+"秒后重新获取");
                self.$yzbtn.attr('disabled','disabled');
                self.wait--;
                setTimeout(function () {
                    self.get_code_time();
                }, 1000)
            }
        },
        //跳转倒计时
        get_code_time_miao : function() {
            var self = this;
            if (self.wait_miao == 0) {
                self.$miao_jump.html(self.wait_miao);
                self.wait_miao = 5;
                location.href = "/users/sign_in";
            } else {
                self.$miao_jump.html(self.wait_miao);
                self.wait_miao--;
                setTimeout(function() {
                    self.get_code_time_miao();
                }, 1000);
            }
        },
        init: function() {
            var self = this;
            self.$user_email.on('blur', function() {
                self.verify();
            });
            self.$yanzheng.on('blur', function() {
                self.verify1();
            });
            self.$user_password.on('blur', function() {
                self.verify3();
            });
            self.$confirm_password.on('blur', function() {
                self.verify4();
            });
            self.$registerBtn_step_one.on('click', function() {
                if (self.verify() && self.verify2() && self.verify1()) {
                    $.ajax({
                        url: '/users/find_password_step_one',
                        data: { register_email: $("#user_email").val(), yanzheng: $("#yanzheng").val() },
                        type: "post",
                        dataType: 'json',
                        success: function(data, status, xhr) {
                            if (data.success) {
                                // 成功之后显示
                                self.$forgotPwd_form1.hide();
                                self.$forgotPwd_form2.show();
                                $('#step_two_1').addClass('active');
                            } else {
                                //$("#yzbtn").parent().append("<span class='error'><i></i>" + data.msg + "</span>");
                                self.$yzbtn.parent().find('.success').hide();
                                self.$yzbtn.parent().find('.error').show().find('span').html(data.msg);

                            }
                        },
                        error: function(data, status, xhr) {
                            close_loading_div();
                            alert_message('提示','系统异常，请联系客服人员！',null,function(){
                                close_alert_div();
                            })
                        }
                    });
                }
            });
            self.$registerBtn_step_two.on('click', function() {
                if (self.verify3() && self.verify4()) {
                    self.forgot_pwd()
                }
            });
            self.$yzbtn.on('click', function() {
                if (self.verify()) {
                    self.forgot_pwd_code();
                }
            });
        }
    }
    forgot_pwd.init();
})(jQuery);
