$(function() {
    var sWidth = $(".mac").width(), //获取焦点图的宽度（显示面积）
	    len = $(".mac ul li").length, //获取焦点图个数
	    index = 0;
    //上一页按钮
    $(".J_arrows_left").on('click', function(event) {
        index -= 1;
        if (index == -1) { index = len - 1; }
        showPics(index);
    });

    //下一页按钮
    $(".J_arrows_right").on('click', function(event) {
        index += 1;
        if (index == len) { index = 0; }
        showPics(index);
    });

    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $(".mac ul").css("width",sWidth * (len));
    $(".novice_guide_text ul").css("width",sWidth * (len));
    
    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
        //$(".mac ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
        $(".mac ul").stop(true,false).animate({"left":nowLeft},300);
        $(".novice_guide_text ul").stop(true,false).animate({"left":-index*sWidth},300);
    }

    // 攻略切换
    // $('.J_purchase').on('click', function(event) {
    // 	$('.J_market_novice').hide();
    // 	$('.J_purchase_novice').show();
    // });
    // $('.J_market').on('click', function(event) {
    // 	$('.J_market_novice').show();
    // 	$('.J_purchase_novice').hide();
    // });
});
