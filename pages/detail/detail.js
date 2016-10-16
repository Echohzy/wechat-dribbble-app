var fetchData = require("../../utils/fetch.js").fetchData;
Page({
    data: {
        shot:{},
        comments: []
    },
    onLoad: function(options){
        var that = this;
        fetchData({
            url : "/shots/"+ options.shot_id,
            success: function(res){
                that.setData({shot:res.data});

            }
        });
        fetchData({
           url: "/shots/" + options.shot_id + "/comments",
           success: function(res){
               that.setData({comments: res.data});
           } 
        });
    },
    bindViewTap: function(){
       wx.navigateTo({
           url: "../user/user?user_id=" + this.data.shot.user.id
       }); 
    }
});