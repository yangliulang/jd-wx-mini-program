// pages/detail/detail.js
var $ = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品图片
    goodsPics:[
      'https://m.360buyimg.com/n12/jfs/t3226/48/6953838385/110675/1f6ac35f/58ae5549Naeff90eb.jpg!q70.jpg',
     'https://m.360buyimg.com/n12/jfs/t3262/266/6860310501/230341/b0c38c6f/58ae554cN85dccd6e.jpg!q70.jpg' ,
     'https://m.360buyimg.com/n12/jfs/t3127/110/6889099315/141567/5368fc23/58ad2630N95fde57b.jpg!q70.jpg'
    ],
    //当前的图片索引
    curBannerIndex:1,
    //是否关注
    isLove:false,
    //已选件数
    selectNum:1,
    //收货地址
    address:{
      cityName:'北京',
      countyName:'朝阳区',
      detailInfo:'上地北街百度大厦'
    },
    //定义选中状态
    selectInfo:'goods-swiper',
    //购物车数量
    shopCartNum:0
  },
  //当swiper发生改变执行
  onSwiperChange:function(e){
    this.setData({
      curBannerIndex:++e.detail.current
    });
  },
  //当点击轮换图时，进行大图查看
  onShowSwiperPic:function(e){
    //e.target.dataset.src
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.goodsPics // 需要预览的图片http链接列表
    });
  },
  //点击home按钮回首页
  onGoHome:function(){
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  //点击返回按钮向上返回
  onGoBack:function(){
    //getCurrentPages();
    wx.navigateBack({ delta:1});
  },
  //点击关注
  onLove:function(){
    this.setData({
      isLove:!this.data.isLove
    });
  },
  //选择件数
  onSelectNum:function(){
    var self = this;
    var nums = ['10', '20', '30'];
    wx.showActionSheet({
      itemList: nums,
      success: function (res) {
        self.setData({
          selectNum: nums[res.tapIndex]
        });
      }
    })
  },
  //选择地址
  onSelectAddress:function(){
    wx.chooseAddress({
      success:function(res){
        this.setData({
          address:res
        });
      }.bind(this)
    })
  },
  //选择商品对应的信息部分并滚动到对应的地方
  onSelectInfo:function(e){
    //selectInfo
    var id = e.target.dataset.id;
    if (this.data.selectInfo != id){
      this.setData({
        selectInfo:id
      });
      //根据id获取对应的区域病滚动pagescroll
      $.getById('#js-'+id,function(res){
        var top = res.top;
        //这里获取的top值是相对于视口的top，并不是相对于页面的top
        //所以我们需要获取相对于page的top才能准确的设置pagescroll滚动条
        //两种方法
        $.getPageScrollTop(function(v){
          top+=v;
          wx.pageScrollTo({
            scrollTop: top-50
          });
        });
      });
    };
  },
  //降价通知
  onInformMe:function(){
    wx.showToast({
      title: '你好，我们已对此商品进行降价监控，会及时通知你！',
      icon:'none',
      duration:3000
    });
  },
  //加入购物车
  onAddShopCart:function(){
    this.setData({
      shopCartNum: ++this.data.shopCartNum
    });
    wx.showToast({
      title: '加入购物车成功!',
      icon:"success"
    })
  },
  //跳转到购物车页面
  onGoShopCart:function(){
    wx.switchTab({
      url: '/pages/shopCart/shopCart',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})