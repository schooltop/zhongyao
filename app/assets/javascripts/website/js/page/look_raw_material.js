;(function($) {

var raw_material_page = 2;
$('#J_LoadMore').on('click', function() {
    // $(this).html('数据加载中...');
    $(this).find('span').addClass('typing_loader');
    _obj = $(this)
    var product_name = $("#search_params_chemical_info").val()
    var search_params_package_min = $("#search_params_package_min").val()
    var search_params_package_max = $("#search_params_package_max").val()
    var search_params_package_unit = $("#search_params_package_unit").val()
    $.ajax({
        contentType: "application/json",
        url: '/look_raw_material/page_date',
        data: "{\"search_params\":{\"chemical_info\":\"" + product_name + "\",\"package_min\":\"" + search_params_package_min + "\",\"package_max\":\"" + search_params_package_max + "\",\"package_unit\":\"" + search_params_package_unit + "\"},\"page\":\"" + raw_material_page + "\"}",
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
          if(data.success){
              raw_material_page = raw_material_page + 1;
              var data = data.errors.data
              //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
              var myTemplate = Handlebars.compile($("#table-template").html());
              //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
              $('.J_list_page').append(myTemplate(data));
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
