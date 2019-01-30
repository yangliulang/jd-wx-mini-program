// pages/shopCart/shopCart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购物车数据
    items: [
      {
        id: 234543,
        num: 10,
        checked:true,
        pic: "https://img10.360buyimg.com/n4/jfs/t7606/8/1090268725/35793/45344fc7/599a45e3Na37888ec.jpg",
        price: "369.20",
        name: "美宝莲（MAYBELLINE）好气色轻唇膏07 粉嫩蔷薇3g（唇彩 唇膏 口红 保湿滋润 新老包装"
      },
      {
        id: 65612,
        num: 3,
        pic: "https://img10.360buyimg.com/n4/jfs/t17251/246/1258761565/248955/ee2ab55b/5ac3262eN5880e918.jpg",
        price: "28.0",
        name: "【现货速发】小米（MI）AI音箱蓝牙wifi小爱同学人工语音智能网络迷你音响低音炮 小米小爱音箱mini"
      },
      {
        id: 565612,
        num: 8,
        pic: "https://img10.360buyimg.com/n4/jfs/t18292/208/1324228170/313409/713b0de4/5ac59352Ncfed6cbb.jpg",
        price: "281.0",
        name: "【现货速发】小米（MI）AI音箱蓝牙wifi小爱同学人工语音智能网络迷你音响低音炮 小米ai音箱"
      },
      {
        id: 6785612,
        num: 1,
        pic: "https://img10.360buyimg.com/n4/jfs/t826/299/897016175/58116/42fc02ba/5565743eN9f279521.jpg",
        price: "51.80",
        name: "德业（Deye）除湿机/抽湿机 除湿量50升/天 噪音50分贝 家用地下室别墅商用工业吸湿器 DYD-D50A3"
      },
      {
        id: 236562,
        num: 2,
        pic: "https://img10.360buyimg.com/n4/jfs/t16756/260/694141171/101627/24e2f8ff/5aa1db3bNfb615d4f.jpg",
        price: "181.50",
        name: "多乐信（DOROSIN） 除湿机 DR-1382L工业地下室抽湿机大功率仓库除湿器"
      }
    ],
    //商品是否全选
    isAllSelect: false,
    //总价格
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  //在商品上右滑执行
  onSwiperRight: function (e) {
    var goodsId = e.currentTarget.dataset.goodsId;
    this.data.items.forEach(function (o) {
      if (o.id == goodsId) {
        o.edit = false;
      };
    });
    this.setData({
      items: this.data.items
    });
  },
  //向左滑动
  onSwiperLeft: function (e) {
    var goodsId = e.currentTarget.dataset.goodsId;
    this.data.items.forEach(function (o) {
      if (o.id == goodsId) {
        o.edit = true;
      };
    });
    this.setData({
      items: this.data.items
    });
  },
  //选择和取消选择
  onSelectCurrent: function (e) {
    var id = e.currentTarget.dataset.goodsId;
    //更具Id查询到当前的商品
    this.data.items.forEach(function (o) {
      if (o.id == id) {
        o.checked = !o.checked;
        return;
      };
    });
    this.setData({
      items: this.data.items
    });
    //调用下是非全选
    this.isSelectAll();
    this.calculatePriceAndNum();
  },
  //计算是否全选
  isSelectAll: function () {
    var total = this.data.items.length;
    var currentSelects = 0;
    if (total > 0) {
      this.data.items.forEach(function (o) {
        if (o.checked) {
          currentSelects++;
        } else {
          return;
        };
      });
      //设置全选
      this.setData({
        isAllSelect: total == currentSelects
      });
    } else {
      //设置全选
      this.setData({
        isAllSelect: false
      });
    };
  },
  //全选和取消全选
  onSelectAll: function () {
    //判断全选状态
    if (this.data.isAllSelect) {
      this.data.items.forEach(function (o) {
        o.checked = false;
      });
      this.setData({
        items: this.data.items
      });
    } else {
      this.data.items.forEach(function (o) {
        o.checked = true;
      });
      this.setData({
        items: this.data.items
      });
    };
    //执行全选检查
    this.isSelectAll();
    this.calculatePriceAndNum();
  },
  //计算所以被选中的和数量
  calculatePriceAndNum: function () {
    var price = 0,
      num = 0;
    this.data.items.forEach(function (o) {
      if (o.checked) {
        price += Number(o.price) * o.num;
        num += o.num;
      }
    });

    this.setData({
      totalPrice: price.toFixed(2),
      totalNum: num
    });

  },
  //删除商品
  onDelGoods: function (e) {
    var id = e.currentTarget.dataset.goodsId,
      index = 0;
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          this.data.items.forEach(function (o, i) {
            if (o.id == id) {
              index = i
            };
          });
          this.data.items.splice(index, 1);
          this.setData({
            items: this.data.items
          });
          //执行全选和统计
          this.isSelectAll();
          //计算统计值
          this.calculatePriceAndNum();
        }else{
          //收起删除按钮
          this.data.items.forEach(function (o, i) {
            if (o.id == id) {
              index = i
            };
          });
          this.data.items[index].edit = false;
          this.setData({
            items:this.data.items
          });
        };
      }.bind(this)
    });
  },
  //去结算
  onPay:function(){
    if (!this.data.totalNum){
      wx.showToast({
        title: '请选择结算商品!',
        duration:2000,
        icon:"none"
      })
    }else{
      wx.requestPayment({
        'timeStamp': '',
        'nonceStr': '',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) {
        },
        'fail': function (res) {
        }
      });
    }
  },
  //调整数量
  onReduce:function(e){
    var id = e.currentTarget.dataset.goodsId;
    this.data.items.forEach(function(o){
      if(o.id == id){
        if(o.num>1){
          o.num -= 1;
        }else{
          o.num = 1;
        }
        return;
      }
    });
   
    this.setData({
      items:this.data.items
    });
    //计算统计值
    this.calculatePriceAndNum();
  },
  onAdd: function (e) {
    var id = e.currentTarget.dataset.goodsId;
    this.data.items.forEach(function (o) {
      if (o.id == id) {
          o.num += 1;
        return;
      }
    });
    this.setData({
      items: this.data.items
    });
    //计算统计值
    this.calculatePriceAndNum();
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //当一切准备好初始化一下全选状态
    this.isSelectAll();
    //计算统计值
    this.calculatePriceAndNum();
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