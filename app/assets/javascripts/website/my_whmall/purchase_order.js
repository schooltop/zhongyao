;(function($) {
	// tab切换事件
     $('.tab').on('click','li',function(e){
     	e.stopPropagation();
		$(".tab li").eq($(this).index()).addClass("tabulous_active").siblings().removeClass("tabulous_active");
		$(".tabs_container").removeClass('on').eq($(this).index()).addClass('on');
     });

     //生成订单-弹窗
     $('.J_create_order').on('click',function(){
     	$('#J_MobileCheck').show();
     });


    //关闭-弹窗
    $('.ks-dialog-close').on('click',function(){
        choose_j_div();
    });


    //关闭-弹窗
    $('.btn_default_min').on('click',function(){
        choose_j_div();
    });
    //$("#search_params_screen_condition").on('change',function(){
    //    if($(this).val() == 2){
    //        $(".advanced").show();
    //    }else{
    //        $(".advanced").hide();
    //    }
    //});
    $(".screen").on('click',function(){
        var text = $(this).text();
        if(text == '基本筛选'){
            $(this).text('高级筛选')
            $(".advanced").hide();
        }else{
            $(this).text('基本筛选')
            $(".advanced").show();
        }
    });
    $(".submit_review_form_btn").on('click',function(){

        $("#new_vendor_review_form").ajaxSubmit({
            type: 'POST',
            url:'purchasing_order/add_vendor_review',
            dataType: 'json',
            beforeSubmit:function(){
                var  eval_quality_grade=$("#vendor_review_delivery").val();
                var  eval_delivery_speed=$("#vendor_review_quality").val();
                var  eval_package=$("#vendor_review_package").val();

                var  eval_evaluate_notes=$("#vendor_review_msg").val();
                if(eval_quality_grade==0 ||eval_delivery_speed==0||eval_package==0||$.trim(eval_evaluate_notes)==''){
                    alert_message('提示','缺失评论内容！',null,function(){
                        close_alert_div();
                    });

                    return false
                }
                $('body').append(loading);
            },
            success:function(data){
                close_loading_div();
                if(data.success){//成功
                    var msg = '';
                    if(data.my_point > 0){
                        msg = '评论成功，本次获得' +  data.my_point + '积分！点击“兑换礼品”换好礼吧！';
                    }
                    else{
                        msg = '评论成功,点击“兑换礼品”换好礼吧！';
                    }

                    $("body").createModal({
                        title: '提示',
                        bgClose: true,
                        html: "<p class='modal-promot-mess'>"+msg+"</p>" +
                        "<p class='insure-btn-con'><span class='sure-btn'>兑换礼品</span><span class='cancel-btn'>稍后兑换</span></p>"
                    }, function() { //回调函数的方法
                        $(".insure-btn-con .sure-btn").click(function() {
                            window.location = '/point_market'
                        });
                        $(".insure-btn-con .cancel-btn").click(function() {
                            choose_j_div();
                            window.location.reload();

                        });
                    });
                    $(".close-pos-r-t").hide();
                    $(".alert_div_modalContent").css('height','auto');
                    $(".alert_div_modalContent").css('top','30%');
                }else{
                    alert_message('提示','评价失败！',null,function(){
                        close_alert_div();
                    });
                }
            },
            error:function(){
                close_loading_div();
            }
        });
    });
    $("#vendor_review_msg").on("keyup",function(){
        var len = $(this).val().length;
        if(len > 119){
            $(this).val($(this).val().substring(0,120));
        };
        var num = 120 - $(this).val().length;
        $("#word").text(num);
    });
    $('.got_goods').on('click',function(){
        var order_detail_id = $(this).attr('tt');
        $("#J_confirm_goods").show();
        $("#good_detail_id").val(order_detail_id)
    });

    $('.confirm_goods').on('click',function(){
        $.ajax({
            url:'purchasing_order/confirm_goods',
            type:'post',
            cache:false,
            data:'detail_id='+$("#good_detail_id").val()+'&nocache='+Math.random(),
            dataType:"json",
            success:function(msg1){
                if(msg1.success){
                    choose_j_div();
                    window.location.reload();
                }else{
                    alert_message('提示',msg1.message,null,function(){
                        close_alert_div();
                    });

                }
            }
        })
    });

    $('.add_evaluate').on('click',function(){
        var order_detail_id = $(this).attr('tt');
        $("#J_add_evaluate").show();
        $("#vendor_review_order_detail_id").val(order_detail_id)
    });


    $('.search_type').on('click',function(){
        var search_type = $(this).attr('tt');
        $("#search_type").val(search_type);
        $(".search_type").removeClass('active')
        $(this).addClass('active');
        $("#create_order_form").submit();
    });



    $('.check_evaluate').on('click',function(){
        var order_detail_id = $(this).attr('tt');
        $.ajax({
            url:'purchasing_order/view_vendor_review',
            type:'post',
            cache:false,
            data:'detail_id='+order_detail_id+'&nocache='+Math.random(),
            dataType:"json",
            success:function(msg1){
                if(msg1.success){
                    var review = jQuery.parseJSON(msg1.review);
                    view_star("view_delivery",review.delivery);
                    view_star("view_quality",review.quality);
                    view_star("view_package",review.package);
                    $("#view_vendor_review_msg").val(review.msg)
                    $("#J_check_evaluate").show();
                }else{
                    alert_message('提示',msg1.message,null,function(){
                        close_alert_div();
                    });
                }
            }
        })
    });






})(jQuery);
function choose_j_div(){
    $('#J_confirm_goods').hide();
    $('#J_add_evaluate').hide();
    $('#J_check_evaluate').hide();
};
function go_online_payment(form_id){
    var  valradio = $("input[name=platform]:checked",form_id).val()
    if(valradio == null ){
        alert_message('提示','请选择支付方式！',null,function(){
            close_alert_div();
        });

        return false;
    }
    $(form_id).submit();
};

function change_star(class_name,index){
    $("#vendor_review_"+class_name).val(index)
    var index_num=0
    $("."+class_name).each(
        function(){
            index_num=index_num+1
            if(index_num>index){
                $(this).attr("src","/assets/website/myWhmall/review/empty_star.png")
            }else{
                if(index>2){
                    $(this).attr("src","/assets/website/myWhmall/review/smile_star.png")
                }else{
                    $(this).attr("src","/assets/website/myWhmall/review/cry_star.png")
                }
            }
        }
    )

    if(index==1){
        $("#"+class_name).html("1 分  很不满意")
    }else if(index==2){
        $("#"+class_name).html("2 分  不满意")
    }else if(index==3){
        $("#"+class_name).html("3 分  一般")
    }else if(index==4){
        $("#"+class_name).html("4 分  满意")
    }else if(index==5){
        $("#"+class_name).html("5 分  很满意")
    }
}


function view_star(class_name,index){
    var index_num=0
    $("."+class_name).each(
        function(){
            index_num=index_num+1
            if(index_num>index){
                $(this).attr("src","/assets/website/myWhmall/review/empty_star.png")
            }else{
                if(index>2){
                    $(this).attr("src","/assets/website/myWhmall/review/smile_star.png")
                }else{
                    $(this).attr("src","/assets/website/myWhmall/review/cry_star.png")
                }
            }
        }
    )

    if(index==1){
        $("#"+class_name).html("1 分  很不满意")
    }else if(index==2){
        $("#"+class_name).html("2 分  不满意")
    }else if(index==3){
        $("#"+class_name).html("3 分  一般")
    }else if(index==4){
        $("#"+class_name).html("4 分  满意")
    }else if(index==5){
        $("#"+class_name).html("5 分  很满意")
    }
}