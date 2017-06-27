//= require jquery
//= require jquery_ujs
//= require wx/weui
//= require wx/city_data
//= require_self

function getParentDom(self) {
  return $(self).parent().parent()
}

function getTips(self) {
  weui.topTips($(self).attr("emptytips"), 2000);
}
// 必填字段验证
function validRequired(self_dom) {
  if (!getParentDom(self_dom).hasClass('weui-cell_warn')) {
    getTips(self_dom)
    getParentDom(self_dom).addClass('weui-cell_warn');
    getParentDom(self_dom).append('<i class="weui-icon-warn"></i>');
  }
}

function validPattern(self_dom) {
  $(self_dom).parent().parent().removeClass('weui-cell_warn');
  $(self_dom).parent().next('.weui-icon-warn').remove();
}

function clearValid(self_dom) {
  $(self_dom).parent().parent().removeClass('weui-cell_warn');
  $(self_dom).parent().next('.weui-icon-warn').remove();
}

function addTips(self_dom, msg) {
  if (!getParentDom(self_dom).hasClass('weui-cell_warn')) {
    weui.topTips(msg, 3000);
    getParentDom(self_dom).addClass('weui-cell_warn');
    getParentDom(self_dom).append('<i class="weui-icon-warn"></i>');
  }
}

function validRequiredStep(self_dom) {validRequired(self_dom)}
$(function() {
  $('.js_category').on('click', function(){
    $('.page__hd').toggleClass('page__hd_fixed');
  });
})
