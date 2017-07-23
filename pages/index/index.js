//index.js
//获取应用实例
var fetchData = require("../../utils/fetch.js").fetchData;
var app = getApp()
Page({
  data: {
    shots: [],
    current_page: 0,
    requesting: false
  },
  //事件处理函数
  bindViewTap: function(event) {
    wx.navigateTo({
      url: '../detail/detail?shot_id=' + event.target.dataset.id
    })
  },
  fetchShotData: function(){
    let {data} = this;
    let that = this;
    that.setData({requesting: true});
    fetchData({
      url: "/shots?per_page=15&page="+(data.current_page+1),
      success: function(res){
        that.setData({ shots: data.shots.concat(res.data), current_page: data.current_page + 1,requesting: false});
      },
      error: function(){
        that.setData({requesting: false});
      }
    });
  },
  onLoad: function (option) {
    //调用应用实例的方法获取全局数据
    this.fetchShotData();
    
  },
  onReachBottom:function(){
    if(this.data.requesting){
      return;
    }
    this.fetchShotData();
  }
});
