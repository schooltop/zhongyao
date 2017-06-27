;(function($) {

    // 在线支付
    $('.on_line_pay').on('click', '.item', function() {
        $('.on_line_pay .item').removeClass('active');
        $(this).addClass('active');

    });

 

})(jQuery);
