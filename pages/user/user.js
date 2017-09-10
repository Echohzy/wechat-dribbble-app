var fetchData = require("../../utils/fetch.js").fetchData;
Page({
    data: {
        user: {},
        shots:[],
        page: 1,
        requesting: false,
        finished: false
    },
    staticData:{
      per_page: 10
    },
    onLoad: function(options){
        var that = this;
        this.staticData.user_id = options.user_id;
        fetchData({
            url: '/users/' + options.user_id,
            success: function(res){
                that.setData({user: res.data});
            }
        });
        this.fetchUserShots();
    },
    fetchUserShots: function(){
      if(this.data.requesting||this.data.finished){
        return;
      }
      var that = this;
      this.setData({
        requesting: true
      });
      fetchData({
        url: "/users/" + that.staticData.user_id + "/shots?per_page="+that.staticData.per_page+"&page="+that.data.page,
        success: function (res) {
          that.setData({
            shots: that.data.shots.concat(res.data),
            requesting: false,
            page: res.data.length === that.staticData.per_page ? that.data.page + 1 : that.data.page,
            finished: res.data.length === that.staticData.per_page ? false : true
          });
        },
        error: function(){
          that.setData({requesting: false});
        }
      });
    },
    onReachBottom: function () {
      if (this.data.requesting) {
        return;
      }
      this.fetchUserShots();
    }
});