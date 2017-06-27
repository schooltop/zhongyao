;(function($) {
	// tab切换事件
     $('.inquiry_list').on('click','li',function(e){
     	e.stopPropagation();
		$(".inquiry_list li").eq($(this).index()).addClass("tabulous_active").siblings().removeClass("tabulous_active");
        var tab_index = $(this).index();
        if(tab_index == 1){ //未报价列表
            $("#search_params_quotation_status").val('had_quotation');
        }else if(tab_index == 2) { //已报价列表
            $("#search_params_quotation_status").val('give_out_quotation');
        }else{  //已放弃询盘
            $("#search_params_quotation_status").val('un_quotation');
        }
        $("#search_params_chemical_info").val('');
        $("#search_params_time").val(0);
        get_quoted_list();
     });

     $('.cancel_change_stock_btn').on('click',function(){
      $('#J_MobileCheck').hide();
    });


})(jQuery);

function get_quoted_list(){
    $('body').append(loading);
    $("#new_search_params").submit();
    close_loading_div();

}


//放弃报价
function give_out_quotation(n){
    url = '/my_whmall/selling/inquiries/give_out_quotation?id=' + n;
    $(".tsl").html("放弃报价确认")
    $(".ks-dialog-body").html("您是否确认放弃对该询盘报价。")
    $('#change_stock_btn').attr('href',url); 
    $('#J_MobileCheck').show();
 };

