//获取选中元素，返回对应元素的布局值
var getById = function(selector,callback){
  wx.createSelectorQuery().select(selector).boundingClientRect(function(res){
    callback(res);
  }).exec();
};
//获取一组元素的布局
var getByAll = function (selector, callback) {
  wx.createSelectorQuery().selectAll(selector).boundingClientRect(function (res) {
    callback(res);
  }).exec();
};
//获取page的scrolltop
var getPageScrollTop = function(callback){
  wx.createSelectorQuery().selectViewport().scrollOffset(function (res) {
    callback(res.scrollTop)
  }).exec();
};
module.exports = {
  getById: getById,
  getByAll: getByAll,
  getPageScrollTop: getPageScrollTop
}
