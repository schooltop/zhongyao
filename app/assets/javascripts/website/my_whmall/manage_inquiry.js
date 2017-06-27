;(function($) {
	// tab切换事件
     $('.tab').on('click','li',function(e){
     	e.stopPropagation();
		$(".tab li").eq($(this).index()).addClass("tabulous_active").siblings().removeClass("tabulous_active");
        var tab_index = $(this).index();
        if(tab_index == 1){ //未报价列表
            $("#search_params_chemical_info").val('');
            $("#search_params_time").val(0);
            get_quoted_list("/my_whmall/buying/manage_inquiry/not_quotation_list")
        }else if(tab_index == 2) { //取消求购列表
            $("#search_params_chemical_info").val('');
            $("#search_params_time").val(0);
            get_quoted_list("/my_whmall/buying/manage_inquiry/cencel_buy_list")
        }else{  //已报价列表
            $("#search_params_chemical_info").val('');
            $("#search_params_time").val(0);
            get_quoted_list("/my_whmall/buying/manage_inquiry/quoted_list")
        }
     });

     //生成订单-弹窗
     $('.J_create_order').on('click',function(){
     	$('#J_MobileCheck').show();
     });

})(jQuery);

function get_quoted_list(url){
    var product_param=$("#search_params_chemical_info").val();
    var date_param=$("#search_params_time").val();
    $('body').append(loading);
    $("#tabs_container").load(url,{"search_params[chemical_info]": product_param, "search_params[time_range]": date_param },function(data,status,xht){
        if(status=='success'){
            close_loading_div();
        }

    })
}

function inquiry_search(url){
    get_quoted_list(url);
}

