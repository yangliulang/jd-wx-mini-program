var $ = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryBar: [
      {
        id: 'WQR2006',
        name: '热门推荐'
      },
      {
        id: 'WQ1980',
        name: '手机数码'
      },
      {
        id: 'WQ1982',
        name: '家用电器'
      },
      {
        id: 'WQ1981',
        name: '电脑办公'
      },
      {
        id: 'WQ1978',
        name: '美妆个护'
      },
      {
        id: 'WQ1988',
        name: '计生情趣'
      },
      {
        id: 'WQ1990',
        name: '汽车用品'
      },
      {
        id: 'WQ1968',
        name: '京东超市'
      },
      {
        id: 'WQ1972',
        name: '男装'
      },
      {
        id: 'WQ1974',
        name: '男鞋'
      },
      {
        id: 'WQ1973',
        name: '女装'
      },
      {
        id: 'WQ1975',
        name: '女鞋'
      },
      {
        id: 'WQ1985',
        name: '母婴童装'
      },
      {
        id: 'WQ1989',
        name: '运动户外'
      },
      {
        id: 'WQ1976',
        name: '内衣配饰'
      },
      {
        id: 'WQ1983',
        name: '食品生鲜'
      },
      {
        id: 'WQ1984',
        name: '酒水饮料'
      },
      {
        id: 'WQ1992',
        name: '家具家装'
      },
      {
        id: 'WQ1991',
        name: '家居厨具'
      },
      {
        id: 'WQ1977',
        name: '箱包手袋'
      },
      {
        id: 'WQ1979',
        name: '钟表珠宝'
      },
      {
        id: 'WQ1996',
        name: '图书音像'
      },
      {
        id: 'WQ1986',
        name: '玩具乐器'
      },
      {
        id: 'WQ1987',
        name: '医药保健'
      },
      {
        id: 'WQ1994',
        name: '宠物生活'
      },
      {
        id: 'WQ1993',
        name: '礼品鲜花'
      },
      {
        id: 'WQ1998',
        name: '农资绿植'
      },
      {
        id: 'WQ1995',
        name: '生活旅行'
      },
      {
        id: 'WQ1970',
        name: '奢侈品'
      },
      {
        id: 'WQ1971',
        name: '全球购'
      },
      {
        id: 'WQ1969',
        name: '国际名牌'
      },
      {
        id: 'WQ1997',
        name: '艺术邮币'
      },
      {
        id: 'WQ2002',
        name: '二手商品'
      },
      {
        id: 'WQ1999',
        name: '特产馆'
      },
      {
        id: 'WQ2000',
        name: '京东金融'
      },
      {
        id: 'WQ2001',
        name: '拍卖'
      },
      {
        id: 'WQ2008',
        name: '房产'
      }
    ],
    curTabId: 'WQR2006',
    /*分类滚动条的值*/
    categoryScrollTop: 0,
    categoryViewScrollTop: 0,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    /*当前分类下的数据*/
    categoryData: [],
    /*用来存储对应分类栏目列表的位置数据*/
    cateViewBoundingData:[],
    /*当前哪个栏目处于定位值*/
    scrollFixId:0
  },
  /*分类点击*/
  onTab: function (e) {
    var self = this;
    this.scrollTabItemIntoCenter(e);
    //请求数据
    var curId = e.target.dataset.id;
    //防止重复点击
    //看一下缓存数据有没有
    var curData = wx.getStorageSync(curId);
    if (!curData) {
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: 'https://so.m.jd.com/category/list.action?_format_=json&catelogyId=' + curId,
        success: function (res) {
          var resData = JSON.parse(res.data.catalogBranch).data;
          self.setData({
            categoryData: resData,
            categoryViewScrollTop: 0
          });
          //把数据存储到缓存
          wx.setStorageSync(curId, resData);
          //获取新的分类组布局数据
          self.getCateViewBounding();
          wx.hideLoading();
        }
      });
    }else{
      this.setData({
        categoryData: curData,
        categoryViewScrollTop: 0
      });
      //获取新的分类组布局数据
      self.getCateViewBounding();
    };
  },
  /*滚动当前点击的元素到视口的中心*/
  scrollTabItemIntoCenter: function (e) {
    var offsetTop = e.target.offsetTop,
      id = e.target.dataset.id;
    this.setData({
      curTabId: id
    });
    /*当当前点击的分类距离上边的offsettop大于视口高度一半时*/
    if (offsetTop > this.data.windowHeight / 2) {
      //为了保证每次点击的元素，拥有自己的布局尺寸，也就是这里的高度值
      //用此值去加上此值的一般来视滚动条滚动到中间位置
      $.getById("#" + id, function (res) {
        this.setData({
          categoryScrollTop: offsetTop - this.data.windowHeight / 2 + res.height / 2
        });
      }.bind(this));
    } else {
      this.setData({
        categoryScrollTop: 0
      });
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    /*按照分类在缓存中插入数据
    如果没有就创建
    */
    var curCateData = wx.getStorageSync(this.data.curTabId);
    //如果当前没有对应的分类数据，我们就去加载
    if (!curCateData) {
      wx.showLoading({
        title: '加载中...',
      });
      wx.request({
        url: 'https://so.m.jd.com/category/list.action?_format_=json&catelogyId=' + this.data.curTabId,
        success: function (res) {
          var resData = JSON.parse(res.data.catalogBranch).data;
          //数据加载完成后，存储数据
          wx.setStorageSync(self.data.curTabId, resData);
          //刷新数据
          self.setData({
            categoryData: resData
          });
          wx.hideLoading();
        }
      })
    } else {
      self.setData({
        categoryData: curCateData
      });
    };
  },
  //滚动定位当前的栏目条
  onCateViewScroll:function(e){
    var self = this;
    var scrollTop = e.detail.scrollTop;
    //循环比较
    this.data.cateViewBoundingData.forEach(function(o){
      if (scrollTop >= o.top && scrollTop < o.topToHeight){
        //防止满足条件下持续设置性能问题
        if (self.data.scrollFixId!=o.id){
          self.setData({
            scrollFixId:o.id
          });
        };
      };
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //初次调用一下
    this.getCateViewBounding();
  },

  //获取首次渲染完成的分类组布局信息
  getCateViewBounding:function(){
    var self = this;
    //获取首次渲染完成的分类组布局信息
    $.getByAll('.cate-view-item', function (res) {
      //清楚原来的数据
      self.data.cateViewBoundingData.length = 0;
      //这里为了把每一组的top值设置成从0开始，所以取第一个值的top值的绝对值
      var firstTopVal = Math.abs(res[0].top);
      //获取的数据进行筛选，要id，top和height=>
      res.forEach(function (o, i) {
        var top = o.top + firstTopVal;
        self.data.cateViewBoundingData.push({
          id: o.id,
          top: top,
          topToHeight: top + o.height
        });
      });
    });
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