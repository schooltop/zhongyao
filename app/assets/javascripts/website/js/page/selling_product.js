;(function($) {
    $(window).load(function() {
        $('.product_purchases .flexslider').flexslider({
            animation: "slide",
            slideshow:'false',
            slideshowSpeed:'5000'
        });
    });

var selling_product_page = 2
$('#J_supply_LoadMore').on('click', function() {
    // $(this).html('数据加载中...');
    $(this).find('span').addClass('typing_loader');
    _obj = $(this)
    $.ajax({
        contentType: "application/json",
        url: '/selling_product/page_date',
        data: "{\"page\":\"" + selling_product_page + "\"}",
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if(data.success){
                selling_product_page = selling_product_page + 1;
                var data = data.errors.data
                //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
                var myTemplate = Handlebars.compile($("#selling-product-template").html());
                //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
                $('.product_supply .list').append(myTemplate(data));
                _obj.find('span').removeClass('typing_loader');
            }else{
                _obj.html(data.message)
            };
        },
        error: function () {
            _obj.html("数据加载出错，请重试！")
        }
    })

});

})(jQuery);
