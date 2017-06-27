;(function($){
    //显示隐藏商务合作详情
    $('.partners li').hover(function() {
        $(this).find('img').hide();
        $(this).find('.partners_list_details').show();
    }, function() {
        $(this).find('img').show();
        $(this).find('.partners_list_details').hide();
    });
    //合作伙伴
    $('.strategy li').hover(function() {
        $(this).find('.cover').show();
    }, function() {
        $(this).find('.cover').hide();
    });
})(jQuery);