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
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    fetchData({
      url: "/shots?per_page=10&page=1",
      success: function(res){
        console.log(res.data);
        that.setData({shots: res.data});
      },
      error: function(res){
        console.log(res.data);
      }
    });
  }
});
