;(function($){

    //显示微博二维码
    $('.weibo').hover(function() {
        $(this).find('img').show();
        $('.weixin').find('img').hide();
        $('.weixin').css({'background-image': 'url(/assets/website/icons/weixin.png)'});
    }, function() {
        $(this).find('img').hide();
        $('.weixin').find('img').show();
        $('.weixin').css({'background-image': 'url(/assets/website/icons/weixin2.png)'});
    });

    // 默认不显示微信二维码
    $('.weixin2').hover(function() {
        $(this).find('img').show();
    }, function() {
        $(this).find('img').hide();
    });

    //菜单二hover样式
    $('.J_head_menu').hover(function() {
        $('.J_head_menu').find('.second_menu').hide();
        $('.J_head_menu').find('.headWrapper2_bj').hide();
        $(this).find('.second_menu').show();
        $(this).find('.headWrapper2_bj').show();
    }, function() {
        //高亮的一级菜单，不隐藏二级菜单
        if($(this).find('a').hasClass('active') == false){
            $(this).find('.second_menu').hide();
            $(this).find('.headWrapper2_bj').hide();
        }
    });

    // 右侧菜单功能
    // 右侧菜单功能
    var right_menu = {
        $J_right_menu : $('.J_right_menu'),   //右侧菜单
        $J_small_menu : $('.J_small_menu'),   //显示大菜单
        $J_big_menu : $('.J_big_menu'),   //显示小菜单
        $gotop : $('.J_gotop'),         //返回顶部
        init:function(){
            var self = this;
            //判断如果存在右侧菜单，则监听滚动事件
            if(self.$J_right_menu.length && self.$J_right_menu.length>0){
                $(window).scroll(function(){
                    // if($(window).scrollTop()>400){
                    // 	self.$gotop.fadeIn();
                    // }
                    // else{
                    // 	self.$gotop.hide();
                    // }
                    // console.log($(window).scrollTop());
                    $(window).scrollTop() > 400 ? self.$gotop.css({'display': 'block'}) : self.$gotop.css({'display': 'none'});
                });
            }
            //右侧菜单-返回顶部点击事件
            self.$gotop.on('click', function () {
                $('html,body').animate({'scrollTop':0},500);
            });
            ////显示小菜单
            //self.$J_big_menu.on('click', function () {
            //    $('.J_right_menu').hide();
            //    $('.right_min_menu').show();
            //});
            ////显示大菜单
            //self.$J_small_menu.on('click', function () {
            //    $('.J_right_menu').show();
            //    $('.right_min_menu').hide();
            //});

        }
    }
    right_menu.init();
    // select控件
    var select_comboSelect = $('select');
    if(select_comboSelect.length && select_comboSelect.length>0){
     select_comboSelect.comboSelect();
         //$('.ks-dialog-close').on('click',function(){
         //   $(this).parent('.ks-dialog').hide();
         //});
    }

    //关闭弹窗
    $('.ks-dialog-close').on('click',function(){
        $(this).parents('.dimmer').hide();
    });
    {
        //设置个人中心菜单高度
        if($('.layout_home-content') != undefined){
            var layout_home_content_height = $('.layout_home-content').height();
            var layout_home_nav_height = $('.layout_home-nav').height();
            if(layout_home_content_height> layout_home_nav_height){
                $('.layout_home-nav').height(layout_home_content_height);
            }

        }
    }


    $("#advance_feedback").on('click',function(){
        $("#J_advance_dialog").show();
    })

    $("#add_customer_bug_form_btn").on('click',function(){
        $("#add_customer_bug_form").ajaxSubmit({
            type: 'POST',
            url: $(this).attr('action'),
            dataType: 'json',
            beforeSubmit: function () {
                // 1 红叉变绿勾
                // 2 按钮变为绿色
                var content_style = $.trim($("#customer_bug_contact_style").val());
                var content = $.trim($("#customer_bug_content").val());
                if(content_style =='' || content == '' ){
                    alert_message('提示','内容或联系方式不能为空！',null,function(){
                        close_alert_div();
                    });
                    return false;
                }
                $('body').append(loading);
            },
            success: function (data) {
                close_loading_div();
                if (data.success) {//成功
                    alert_message('提示','感谢您的反馈，我们会不断地优化产品和服务，努力做到最好！','450px',function(){
                        $("#customer_bug_content").val('');
                        $("#J_advance_dialog").hide();
                        close_alert_div();
                    });
                } else {
                    alert_message('提示',"系统异常，请联系客服人员！",null,function(){
                        close_alert_div();
                    })
                }
            },
            error: function () {
                alert_message('提示','系统异常，请联系客服人员！',null,function(){
                    close_alert_div();
                })
            }
        });
    })


})(jQuery);