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
        }
    };

    //关闭弹窗
    $('.ks-overlay-close').on('click', function(event) {
        $('#J_MobileCheck').hide();
    });

    $('#drag').drag();

    var register = {
        $user_email: $('#user_email'),
        $user_password: $('#user_password'),
        $confirm_password: $('#confirm_password'),
        $user_name: $('#user_name'),
        $company_name: $('#user_company_name_cn'),
        $slider: $('#slider'),
        $registerBtn: $('#registerBtn'),
        $yanzheng: $('#yanzheng'),
        $yzbtn: $('#yzbtn'), //验证码输入框
        $registerBtn_two: $('#registerBtn_two'), //获取验证码
        $drag: $('#drag'), //拖动验证
        wait:60,
        //验证账号
        verify: function() {
            var self = this,
                user_email_val = self.$user_email.val();
            if (!user_email_val || user_email_val.length == 0) {
                self.$user_email.parent().find('.success').hide();
                self.$user_email.parent().find('.error').show().find('span').html('手机号不能为空!');
                return false;
            // } else if (!$.trim(user_email_val).match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) && !(/^1(3|4|5|7|8)\d{9}$/.test($.trim(user_email_val)))) {
            } else if (!(/^1(3|4|5|7|8)\d{9}$/.test($.trim(user_email_val)))) {
                self.$user_email.parent().find('.success').hide();
                self.$user_email.parent().find('.error').show().find('span').html('请输入合法的手机号!');
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
        //验证密码
        verify2: function() {
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
        verify3: function() {
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
        //验证验证码
        verify4: function() {
            var self = this,
                yanzheng_val = self.$yanzheng.val();
            if (!yanzheng_val || yanzheng_val.length == 0) {
                self.$yanzheng.parent().find('.success').hide();
                self.$yanzheng.parent().find('.error').show().find('span').html('验证码不能为空!');
                return false;
            } else if (yanzheng_val.length < 6) {
                self.$yanzheng.parent().find('.success').hide();
                self.$yanzheng.parent().find('.error ').show().find('span').html('请输入6位验证码!');
                return false;
            } else {
                self.$yanzheng.parent().find('.error').hide().find('span').html('');
                self.$yanzheng.parent().find('.success').show();
                return true;
            }
        },
        //验证拖动
        verify5: function() {
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
        //验证用户名
        verify_user_name: function() {
            var self = this;
            var user_name_val = self.$user_name.val();
            if (!user_name_val || user_name_val.length == 0) {
                self.$user_name.parent().find('.success').hide();
                self.$user_name.parent().find('.error').show().find('span').html('姓名不能为空!');
                return false;
            } else {
                self.$user_name.parent().find('.error').hide().find('span').html('');
                self.$user_name.parent().find('.success').show();
                return true;
            };
        },
        //验证公司名
        verify_company_name: function() {
            var self = this;
            var company_name_val = self.$company_name.val();
            if (!company_name_val || company_name_val.length == 0) {
                self.$company_name.parent().find('.success').hide();
                self.$company_name.parent().find('.error').show().find('span').html('公司名称不能为空!');
                return false;
            } else {
                var company_name_str = company_name_val.replace("（", "(").replace("）", ")");
                $("#user_company_name_cn").val($.trim(company_name_str));
                var regu = "^[()\u4e00-\u9fa5]+$";
                var re = new RegExp(regu);
                var validate_name_cn = re.test($("#user_company_name_cn").val());
                if (!validate_name_cn) {
                    self.$company_name.parent().find('.success').hide();
                    self.$company_name.parent().find('.error').show().find('span').html('请输入合法的公司名称!');
                    return false;
                } else {
                    self.$company_name.parent().find('.error').hide().find('span').html('');
                    self.$company_name.parent().find('.success').show();
                    return true;
                }

            };
        },
        //提交注册表单
        register: function() {
            var o = this;
            $("#new_user").ajaxSubmit({
                type: 'POST',
                url: $(this).attr('action'),
                dataType: 'json',
                beforeSubmit: function() {
                    // 1 红叉变绿勾
                    // 2 按钮变为绿色
                    $('body').append(loading);
                    return true;
                },
                success: function(data) {
                    close_loading_div();
                    if (data.success) {
                        //成功
                        window.location.href = '/my_whmall/home'
                    } else {
                        o.$yanzheng.parent().find('.success').hide();
                        o.$yanzheng.parent().find('.error').show().find('span').html(data.errors.code);
                    }
                },
                error: function() {
                    //layer.closeAll();
                    alert_message('错误','注册失败，请联系客服人员！',null,function(){
                        close_alert_div();
                    })

                }
            });
        },
        // 获取验证码
        getCode: function() {
            var o = this;
            var param_obj = '';
            var validate = true;
            var user_email_val = o.$user_email.val();
            if (!(/^1(3|4|5|7|8)\d{9}$/.test($.trim(user_email_val)))){
                $('#user_email').parent().find('.success').hide();
                $('#user_email').parent().find('.error').show().find('span').html('请输入合法的手机号！');

                return false;
            }
            //var layer_index = layer.load('验证码发送中...');
            $('body').append(loading);
            $.ajax({
                url: '/send_register_code',
                data: { register_email: user_email_val },
                type: "post",
                dataType: 'json',
                success: function(data, status, xhr) {
                    close_loading_div();
                    if (data.success == 'true' || data.success == true) {
                        o.$yanzheng.parent().find('.success').hide();
                        o.$yanzheng.parent().find('.error2').find('span').html(data.msg).show();
                        o.get_code_time();
                    } else {
                        o.$yzbtn.val("重新获取");
                        o.$yanzheng.parent().find('.success').hide();
                        o.$yanzheng.parent().find('.error').show().find('span').html(data.msg);
                    }
                    //layer.close(layer_index);

                },
                error: function(data, status, xhr) {
                    close_loading_div();
                    alert_message('错误','系统异常，请联系客服人员！',null,function(){
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
        init: function() {
            var self = this;
            self.$user_email.on('blur', function() {
                self.verify();
            });
            self.$user_email.on('blur', function() {
                self.verify();
            });
            self.$user_password.on('blur', function() {
                self.verify2();
            });
            // self.$confirm_password.on('blur', function() {
            //     self.verify3();
            // });
            self.$user_name.on('blur', function() {
                self.verify_user_name();
            });
            self.$company_name.on('blur', function() {
                self.verify_company_name();
            });
            self.$registerBtn.on('click', function() {
                if (self.verify() && self.verify4() && self.verify2() && self.verify5() && self.verify_user_name() && self.verify_company_name()) {
                    // var user_email_val = self.$user_email.val();
                    // $('#J_MobileCheck').show();
                    // $(".phone").html(user_email_val);
                    self.register();
                }
            });
            //验证码失去焦点验证
            self.$yanzheng.on('blur', function() {
                self.verify4();
            });
            // 提交表单
            self.$registerBtn_two.on('click', function() {
                if (self.verify4()) {
                    self.register();
                }
            });
            //获取验证码
            self.$yzbtn.on('click', function() {
                self.getCode();
            });
            //$(document).keyup(function(event) {
            //    if (event.keyCode == 13) {
            //        if (self.verify()) {
            //
            //            self.register();
            //        };
            //    }
            //});

        }
    };
    register.init();

})(jQuery);
