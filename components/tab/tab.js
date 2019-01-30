var $ = require("../../utils/util.js");
Component({
  externalClasses: [],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabItem:{
      type:Array,
      value:[]
    },
    currentTabIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowWidth:wx.getSystemInfoSync().windowWidth,
    selectTabLeft:0
  },
  moved:function(){
    //console.log('moved')
  },
  created:function(){
    //console.log('created')
  },
  detached:function(){
    //console.log('detached')
  },
  ready:function(){
    //console.log('ready')
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSelectTab:function(e){
      var self = this;
      //这里要注意组件选择的问题，
      this.createSelectorQuery().select('#'+e.currentTarget.id).boundingClientRect(function(res){
        var width = res.width;
        var offsetLeft = e.currentTarget.offsetLeft;
        if (offsetLeft > self.data.windowWidth/2){
          self.setData({
            currentTabIndex: e.currentTarget.dataset.index,
            selectTabLeft: e.currentTarget.offsetLeft - self.data.windowWidth / 2+width/2
          });
        }else{
          self.setData({
            currentTabIndex: e.currentTarget.dataset.index,
            selectTabLeft:0
          });
        };
        //触发回调去和页面进行通讯
        self.triggerEvent('onTabChange', self.data.currentTabIndex);
      }).exec();
    }
  }
})
