 $("#purchase_sort1").on('click',function(){
        var purchasing_analyze_start_time =$("#purchasing_analyze_start_time").val();
        var purchasing_analyze_end_time =$("#purchasing_analyze_end_time").val();
        $.ajax({
            url:'home/get_purchase_analyze_report',
            type:'post',
            cache:false,
            data:'start_time='+purchasing_analyze_start_time+'&end_time='+purchasing_analyze_end_time+'&type=1&nocache='+Math.random(),
            dataType:"json",
            success:function(msg1){
                if(msg1.success){
                    $("#purchase_sort2").removeClass("active");
                    $("#purchase_sort1").addClass("active");
                    var names = msg1.week.split(",");
                    var order_counts = msg1.order_counts.split(",");
                    var order_amounts = msg1.order_amounts.split(",");
                    drawZZTZXTBJ('echarts1',names,order_counts,order_amounts)
                }
            }
        })

    })
    $("#purchase_sort2").on('click',function(){
        var purchasing_analyze_start_time =$("#purchasing_analyze_start_time").val()
        var purchasing_analyze_end_time =$("#purchasing_analyze_end_time").val()
        $.ajax({
            url:'home/get_purchase_analyze_report',
            type:'post',
            cache:false,
            data:'start_time='+purchasing_analyze_start_time+'&end_time='+purchasing_analyze_end_time+'&type=2&nocache='+Math.random(),
            dataType:"json",
            success:function(msg1){
                if(msg1.success){
                    $("#purchase_sort1").removeClass("active");
                    $("#purchase_sort2").addClass("active");
                    var names = msg1.week.split(",");
                    var order_counts = msg1.order_counts.split(",");
                    var order_amounts = msg1.order_amounts.split(",");
                    drawZZTZXTBJ('echarts1',names,order_counts,order_amounts)
                }
            }
        })

    })