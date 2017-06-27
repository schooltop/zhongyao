;(function($) {
    $(".J_upload").on("change", "input[type='file']", function() {
        var filePath = $(this).val();
        if (filePath.indexOf("jpg") != -1 || filePath.indexOf("png") != -1) {
            var arr = filePath.split('\\');
            // 文件名
            var fileName = arr[arr.length - 1];
            $(this).parent().prev(".preview").find(".preview_name").html(fileName).show();
            // 图片预览
           var objUrl = getObjectURL(this.files[0]) ;
          // console.log("objUrl = "+objUrl) ;
          if (objUrl) {
            $(this).parent().prev(".preview").find("img").attr("src", objUrl).show();
          }
        } else if(filePath.indexOf("pdf") != -1){
            var arr = filePath.split('\\');
            // 文件名
            var fileName = arr[arr.length - 1];
            
            $(this).parent().prev(".preview").find(".preview_name").html(fileName).show();
            // pdf默认展示图片
            $(this).parent().prev(".preview").find("img").attr("src", '/assets/website/pdf.png').show();
        }else {
            $(this).parent().prev(".preview").find(".preview_name").html("");
            return false
        }
    });

    //建立一個可存取到該file的url
    function getObjectURL(file) {
      var url = null ; 
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    }

})(jQuery);