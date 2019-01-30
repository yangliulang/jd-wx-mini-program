// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabNavData: [
      {
        icon: '/images/icons/nav/1.png',
        iconSelected: '/images/icons/nav/1-s.png',
        name: '精选'
      },
      {
        icon: '/images/icons/nav/2.png',
        iconSelected: '/images/icons/nav/2-s.png',
        name: '购物百科'
      },
      {
        icon: '/images/icons/nav/3.png',
        iconSelected: '/images/icons/nav/3-s.png',
        name: '好吃的'
      },
      {
        icon: '/images/icons/nav/4.png',
        iconSelected: '/images/icons/nav/4-s.png',
        name: '好玩的'
      },
      {
        icon: '/images/icons/nav/2.png',
        iconSelected: '/images/icons/nav/2-s.png',
        name: '好看的'
      },
      {
        icon: '/images/icons/nav/3.png',
        iconSelected: '/images/icons/nav/3-s.png',
        name: '购物百科'
      },
      {
        icon: '/images/icons/nav/1.png',
        iconSelected: '/images/icons/nav/1-s.png',
        name: '精选'
      },
      {
        icon: '/images/icons/nav/2.png',
        iconSelected: '/images/icons/nav/2-s.png',
        name: '购物百科'
      },
      {
        icon: '/images/icons/nav/3.png',
        iconSelected: '/images/icons/nav/3-s.png',
        name: '好吃的'
      },
      {
        icon: '/images/icons/nav/4.png',
        iconSelected: '/images/icons/nav/4-s.png',
        name: '好玩的'
      },
      {
        icon: '/images/icons/nav/1.png',
        iconSelected: '/images/icons/nav/1-s.png',
        name: '好看的'
      },
      {
        icon: '/images/icons/nav/3.png',
        iconSelected: '/images/icons/nav/3-s.png',
        name: '购物百科'
      }
    ],
    currentTabIndex: 0,
    //tab对应的面板数据
    panels: [
      {
        type: "tow",
        name: "近期最值得入手的 5 双实战鞋，我全都要！",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t18208/293/1198017970/142162/9af320de/5ac0fb90N430c2051.jpg",
        userName: "在家ZAIJIA",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t2236/47/2124561964/3422/dfa621e0/56a85068N61ac2690.png",
        userNum: "2w+人阅读"
      },
      {
        type: "one",
        name: "墙面改一改，衣柜、书架、置物架统统不用买",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t17110/70/1263348699/136192/d85ef516/5ac33004Nc2256a59.jpg",
        userName: "虎扑科技",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t14905/285/461633277/43639/65095cab/5a2e11dfN0f90b58f.jpg",
        userNum: "2w+人阅读"
      },
      {
        type: "tow",
        name: "近期最值得入手的 5 双实战鞋，我全都要！",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t18208/293/1198017970/142162/9af320de/5ac0fb90N430c2051.jpg",
        userName: "在家ZAIJIA",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t2236/47/2124561964/3422/dfa621e0/56a85068N61ac2690.png",
        userNum: "2w+人阅读"
      },
      {
        type: "one",
        name: "墙面改一改，衣柜、书架、置物架统统不用买",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t17110/70/1263348699/136192/d85ef516/5ac33004Nc2256a59.jpg",
        userName: "虎扑科技",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t14905/285/461633277/43639/65095cab/5a2e11dfN0f90b58f.jpg",
        userNum: "2w+人阅读"
      },
      {
        type: "tow",
        name: "近期最值得入手的 5 双实战鞋，我全都要！",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t18208/293/1198017970/142162/9af320de/5ac0fb90N430c2051.jpg",
        userName: "在家ZAIJIA",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t2236/47/2124561964/3422/dfa621e0/56a85068N61ac2690.png",
        userNum: "2w+人阅读"
      },
      {
        type: "tow",
        name: "近期最值得入手的 5 双实战鞋，我全都要！",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t18208/293/1198017970/142162/9af320de/5ac0fb90N430c2051.jpg",
        userName: "在家ZAIJIA",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t2236/47/2124561964/3422/dfa621e0/56a85068N61ac2690.png",
        userNum: "2w+人阅读"
      },
      {
        type: "one",
        name: "墙面改一改，衣柜、书架、置物架统统不用买",
        pic: "https://m.360buyimg.com/mobilecms/jfs/t17110/70/1263348699/136192/d85ef516/5ac33004Nc2256a59.jpg",
        userName: "虎扑科技",
        userIcon: "https://m.360buyimg.com/mobilecms/jfs/t14905/285/461633277/43639/65095cab/5a2e11dfN0f90b58f.jpg",
        userNum: "2w+人阅读"
      }
    ],
    isTabBarFix:false,
  },
  //当tab发生选择变化
  _onTabChange: function (e) {
    if(e.detail != this.data.currentTabIndex){
      this.setData({
        currentTabIndex: e.detail,
        panels: this.data.panels.reverse()
      });
      //把滚动条置顶
      wx.pageScrollTo({
        scrollTop: 0,
        duration:0
      });
    };
  },
  //页面滚动
  onPageScroll:function(e){

    if(e.scrollTop>100){
      this.setData({
        isTabBarFix:true
      });
    }else{
      this.setData({
        isTabBarFix: false
      });  
    }
  },
  //回到顶部
  onGoTop:function(){
    wx.pageScrollTo({
      scrollTop: 0
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