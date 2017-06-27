;(function($) {

     // 批量下架
     $("#many_out_of_stock").on('click',function(event, xhr, settings) {
        if ($("tbody :checked").size() < 1) {
          $(".tsl").html("提示")
          $(".ks-dialog-body").html("请至少选择一项。")
          url = "javascript:cancel_change_stock();"
          $('#change_stock_btn').attr('href', url); 
          $('#J_MobileCheck').show();
        } else {
          var ids = "";
          $("tbody :checked").each(function () {
            ids += "," + $(this).val();
          });
          url = '/my_whmall/selling/products/many_out_of_stock?ids=' + ids;
          $('#change_stock_btn').attr('href',url); 
          $(".tsl").html("批量下架商品确认")
          $(".ks-dialog-body").html("您是否确认批量下架选中商品")
          $('#J_MobileCheck').show();
        }
        return false;
      });


    $('.cancel_change_stock_btn').on('click',function(){
      $('#J_MobileCheck').hide();
    });

	// tab切换事件
    $('.product_list').on('click','li',function(e){
     	e.stopPropagation();
		$(".product_list li").eq($(this).index()).addClass("tabulous_active").siblings().removeClass("tabulous_active");
        var tab_index = $(this).index();
        if(tab_index == 1){ //已下架商品
            $("#search_params_instock").val('out_of_stock');
            $("#search_params_active").val('');
        }else if(tab_index == 2) { //待审核商品
            $("#search_params_instock").val('');
            $("#search_params_active").val('inactive');
        }else{  //已上架商品
            $("#search_params_instock").val('instock');
            $("#search_params_active").val('');
        }
        $("#search_params_chemical_info").val('');
        $("#search_params_time").val(0);
        get_quoted_list();
     });

    //全选(反选)
    $("#selectAll").click(function(){
        if(this.checked){
            $(".table_change_color :checkbox").prop("checked", true);
        }else{
            $(".table_change_color :checkbox").prop("checked", false);
        }
        allchk();
    });
    //
    $(".table_change_color :checkbox").click(function(){
        allchk();
    });

    function get_checkbox_values(){
            var valArr = new Array;
            var chk = 0;
            $(".table_change_color :checkbox").each(function(){
                if($(this).prop("checked")==true){
                    valArr[chk] = $(this).val();
                    chk++;
                }
            });
            $(".choose span").html(chk);
            //var vals = valArr.join(',');
            return valArr
    }

    function allchk(){
        var chknum = $(".table_change_color :checkbox").size();//选项总个数
        var chk = 0;
        $(".table_change_color :checkbox").each(function () {
            if($(this).prop("checked")==true){
                chk++;
            }
        });
        if(chknum==chk){//全选
            $("#selectAll").prop("checked",true);
        }else{//不全选
            $("#selectAll").prop("checked",false);
        }
        //get_checkbox_values().join(',');
        get_checkbox_values();
    }

})(jQuery);


// 取消上下架
function cancel_change_stock(){
  $('#J_MobileCheck').hide();   
}

//上架商品
 function instock(n,overstep){
   if(overstep==false){
    url = '/my_whmall/selling/products/instock?id=' + n;
    $(".tsl").html("上架商品确认")
    $(".ks-dialog-body").html("您是否确认上架该商品")
    $('#change_stock_btn').attr('href',url); 
    $('#J_MobileCheck').show();
   }else{
    $(".tsl").html("上架商品超额提示")
    $(".ks-dialog-body").html("您上架的产品已超过最大限额，您可以联系自己的专属供管负责人调整额度上限。")
    $('#change_stock_btn').on('click',function(){
      cancel_change_stock();
    });
    $('#J_MobileCheck').show();
   }
 };

 //下架商品-弹窗
 function out_of_stock(n){   
    url ='/my_whmall/selling/products/out_of_stock?id=' + n;
    $(".tsl").html("下架商品确认")
    $(".ks-dialog-body").html("您是否确认下架该商品")
    $('#change_stock_btn').attr('href',url); 
    $('#J_MobileCheck').show();
 };

// 切换tab
function get_quoted_list(){
    $('body').append(loading);
    $("#new_search_params").submit();
    close_loading_div();
}

