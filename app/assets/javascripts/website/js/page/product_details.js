;(function($) {
    $('.proImg_two').hover(function() {
         $('.J_pro').hide();
         $('.proImg_two_info').show();
     }, function() {
         
         $('.J_pro').show();
         $('.proImg_two_info').hide();
     });


    //锚点缓慢移动
    $(".but_list a").click(function() {  
        $("html, body").animate({  
            scrollTop: $($(this).attr("href")).offset().top + "px"  
        }, {  
            duration: 1000,  
            easing: "swing"  
        });  
        return false;  
    });



    var supper_page = 2;
    $('#J_LoadMore').on('click', function() {
        // $(this).html('数据加载中...');
        $(this).find('span').addClass('typing_loader');
        _obj = $(this);
        var hidden_product_info = $("#hidden_product_info").val();
        $.ajax({
            contentType: "application/json",
            url: '/products/supplier_page_date',
            data: "{\"product_info\":\""+ hidden_product_info +"\",\"page\":\"" + supper_page + "\"}",
            type: 'post',
            cache: false,
            dataType: 'json',
            success: function (data) {
                if(data.success){
                    supper_page = supper_page + 1;
                    var data = data.errors.data
                    //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
                    var myTemplate = Handlebars.compile($("#product-supplier-template").html());
                    //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
                    $('.list_info').append(myTemplate(data));
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
