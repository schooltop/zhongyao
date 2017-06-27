;(function($){
	// 右侧菜单功能
	var right_menu = {
		$J_right_menu : $('.J_right_menu'),   //右侧菜单
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
		}
	}
	right_menu.init();
	 //  // 收货地址
    $('.add_list').on('click', '.item', function() {
        $('.add_list .item').removeClass('active').find('.addressRight').hide();
        $(this).addClass('active').find('.addressRight').show();
        $("#point_orders_address_id").val($(this).attr('tt'));
        $("#address_p").html($(this).find(".p2").html())
        $("#contact_p").html($(this).find(".p1").html())
    });

    //关闭弹窗
    $('.ks-dialog-close').on('click',function(){
        $(this).parents('.dimmer').hide();
    });
})(jQuery);