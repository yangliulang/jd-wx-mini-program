var $ = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        id: "456",
        pic: '/images/banners/b1.jpg'
      },
      {
        id: "6787",
        pic: '/images/banners/b2.jpg'
      }
      ,
      {
        id: "2324",
        pic: '/images/banners/b3.jpg'
      }
      ,
      {
        id: "54756",
        pic: '/images/banners/b4.jpg'
      }
      ,
      {
        id: "78989",
        pic: '/images/banners/b5.jpg'
      }
    ],
    currentIndex: 0,
    quickEntrys: [
      {
        text: '京东超市',
        icon: '/images/icons/quick-entry-1-icon.png'
      },
      {
        text: '全球购',
        icon: '/images/icons/quick-entry-2-icon.png'
      },
      {
        text: '京东服装',
        icon: '/images/icons/quick-entry-3-icon.png'
      },
      {
        text: '京东生鲜',
        icon: '/images/icons/quick-entry-4-icon.png'
      },
      {
        text: '京东到家',
        icon: '/images/icons/quick-entry-5-icon.png'
      },
      {
        text: '京东充值',
        icon: '/images/icons/quick-entry-6-icon.png'
      },
      {
        text: '领券',
        icon: '/images/icons/quick-entry-7-icon.png'
      },
      {
        text: '借钱',
        icon: '/images/icons/quick-entry-8-icon.png'
      },
      {
        text: '京东超市',
        icon: '/images/icons/quick-entry-9-icon.png'
      },
      {
        text: '京东超市',
        icon: '/images/icons/quick-entry-10-icon.png'
      }
    ],
    scrollNews: [
      '上京东屯好货，快来吧',
      '坑爹的笔记本，怎么逃避?',
      '攒心机，教你怎么选'
    ],
    newsScrollTop: 0,
    /*是否应用过度*/
    isTransition: true,
    /*更具页面滚动监控是否设置搜索栏背景*/
    isSetBgColor: false,
    /*商品列表*/
    goodsList: [
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      },
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      },
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      },
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      },
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      },
      {
        img: "/images/goods/列表.jpg",
        name: "New Balance NB 368系列  男 女 复古 运动休闲 跑步鞋 M368LBR/深棕色 38.5",
        price: "695.00",
        praise: "98"
      }
    ],
    /*定义搜索页面弹出*/
    isShowSearchPage: false,
    //自动播放焦点图
    isAutoPlay:true
  },
  //去详情
  onGoDetailPage: function (e) {
    var goodsId = e.target.id;
    //跳转到详情页
    wx.navigateTo({
      url: '/pages/detail/detail?id='+goodsId,
    });
  },
  /*搜索框开始搜索*/
  onSearch: function () {
    this.setData({
      isShowSearchPage: true
    });
    //隐藏tabbar
    wx.hideTabBar();
  },
  /*搜索完成*/
  onSearchConfirm: function (e) {
    console.log(e);
    this.setData({
      isShowSearchPage: false
    });
    //隐藏tabbar
    wx.showTabBar();
  },
  /*当滑块切换发生改变时*/
  onSwiperChange: function (e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },
  /*当新闻条目过度完毕执行*/
  onTransitionEnd: function () {
    var scrollNewsList = this.data.scrollNews;
    var firstItem = scrollNewsList.shift();
    scrollNewsList.push(firstItem)
    //当过度完，去掉应用过度的css
    this.setData({
      scrollNews: scrollNewsList,
      isTransition: false,
      newsScrollTop: 0
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
    var that = this;
    var scrollNewsSize = this.data.scrollNews.length;
    if (scrollNewsSize > 0) {
      setInterval(function () {
        that.setData({
          isTransition: true,
          newsScrollTop: 30
        });
      }, 3000);
    };
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isAutoPlay:true
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isAutoPlay: false
    });
  },
  /*页面滚动，监控搜索栏是否设置背景色*/
  onPageScroll: function (e) {
    //isSetBgColor
    if (e.scrollTop > 60) {
      this.setData({
        isSetBgColor: true
      });
    } else {
      this.setData({
        isSetBgColor: false
      });
    };
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
  onReachBottom: function (e) {

    this.setData({
      goodsList: this.data.goodsList.concat(this.data.goodsList.slice(0, 4))
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})