var fetchData = require("../../utils/fetch.js").fetchData;
Page({
    data: {
        user: {},
        shots:[]
    },
    onLoad: function(options){
        var that = this;
        fetchData({
            url: '/users/' + options.user_id,
            success: function(res){
                that.setData({user: res.data});
            }
        });

        fetchData({
            url: "/users/" + options.user_id + "/shots?per_page=10&page=1",
            success: function(res){
                that.setData({
                    shots: res.data
                });
            }
        });
    }
});