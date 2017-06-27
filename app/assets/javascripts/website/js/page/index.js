;(function($){
	// $('.flexslider').flexslider({
	// 	animation: "slide",
	// 	direction:"horizontal",
	// 	easing:"swing"
	// });
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false
	});
	//显示微博二维码
	$('.weibo').hover(function() {
		$(this).find('img').show();
		$('.weixin').find('img').hide();
	}, function() {
		$(this).find('img').hide();
		$('.weixin').find('img').show();
	});
	// 滚动
	$('#marquee6_home').kxbdMarquee({
	  direction: 'down',
	  scrollDelay:'40'
	});
})(jQuery);