;(function($) {

    // 收货地址
    $('.add_list').on('click', '.item', function() {
        $('.add_list .item').removeClass('active').find('.success').hide();
        $(this).addClass('active').find('.success').show();
        $("#customer_order_address_id").val($(this).attr('tt'));
    });

    //开票信息
    $('.invoice_list').on('click', '.item', function() {
        $('.invoice_list .item').removeClass('active').find('.success').hide();
        $(this).addClass('active').find('.success').show();
        $("#customer_order_invoice_id").val($(this).attr('tt'));
    });
    //关闭弹窗
     $('.ks-dialog-close').on('click',function(){
        $("#J_invoice_info").hide();
     });
})(jQuery);
