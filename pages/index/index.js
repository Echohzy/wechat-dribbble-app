//index.js
//获取应用实例
var fetchData = require("../../utils/fetch.js").fetchData;
var app = getApp()
Page({
  data: {
    shots: []
  },
  //事件处理函数
  bindViewTap: function(event) {
    wx.navigateTo({
      url: '../detail/detail?shot_id=' + event.target.dataset.id
    })
  },
  fetchShotData: function(type){
    var that = this;
    fetchData({
      url: "/shots?per_page=15&page=1&list="+type,
      success: function(res){
        that.setData({shots: res.data});
      }
    });
  },
  onLoad: function (option) {
    //调用应用实例的方法获取全局数据
    this.fetchShotData();
    
  }
});
