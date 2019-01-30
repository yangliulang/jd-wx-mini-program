// components/swiper/swiper.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    swiperWidth:{
      type:Number,
      value:50
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _touchStartX:0,
    _touchEndX:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onTouchStart:function(e){
      //触摸开始的时候记录触摸点的clientX
      this.data._touchStartX = e.changedTouches[0].clientX;
    },
    _onTouchEnd:function(e){
      //记录触摸离开时候触摸点的clientX
      this.data._touchEndX = e.changedTouches[0].clientX;
      //当开始和离开的值不等时
      if (this.data._touchStartX != this.data._touchEndX){
        //如果两值得差值大于pro -> swiper-width
        var diffVal = this.data._touchEndX - this.data._touchStartX,
            absVal = Math.abs(diffVal);
        //如果差值大于0，表示像右滑动，反之向左滑动
        if (absVal >= this.data.swiperWidth && diffVal > 0){
          this._swiperRight();
        } else if (absVal >= this.data.swiperWidth && diffVal < 0){
          this._swiperLeft();
        }
      };
    },
    //右滑
    _swiperRight:function(){
      this.triggerEvent("swiperRight");
    },
    //左滑
    _swiperLeft:function(){
      this.triggerEvent("swiperLeft");
    }
  }
})
