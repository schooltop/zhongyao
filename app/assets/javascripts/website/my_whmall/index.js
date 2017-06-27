function drawZZTZXTBJ(div_id,names,order_counts,order_amounts){
    var myChart = echarts.init(document.getElementById(div_id));
    myChart.setOption({
        tooltip : {
            trigger: 'axis',
            showDelay : 0, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms

        },
        calculable: true,
        legend: {
            data:['订单数','订单金额']
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                splitLine:{
                    show:false
                },
                show : true,
                axisLabel:{
                    interval:0,
                    rotate:45
                },
                data : names
            }
        ],


        yAxis : [
            {
                type : 'value',
                name : '订单数',
                axisLabel : {
                    formatter: '{value}'
                }
            },
            {
                type : 'value',
                name : '订单金额',
                axisLabel : {
                    formatter: '{value}'
                }
            }],
        series : [
            {
                name:'订单数',
                type:'line',
                yAxisIndex: 0,
                data:order_counts
            },
            {
                name:'订单金额',
                type:'line',
                yAxisIndex: 1,
                data:order_amounts
            }
        ]
    });
}