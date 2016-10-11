var fetchData = require("../../utils/fetch.js").fetchData;
Page({
    data: {
        shot:{}
    },
    onLoad: function(options){
        var that = this;
        fetchData({
            url : "/shots/"+ options.shot_id,
            success: function(res){
                that.setData({shot:res.data});
            }
        });
    }
});