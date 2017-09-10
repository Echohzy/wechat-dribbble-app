var fetchData = require("../../utils/fetch.js").fetchData;
Page({
    data: {
        shot:{},
        comments: [],
        requesting: false,
        page: 1,
        per_page: 10,
        finished: false
    },
    staticData: {
      per_page: 10
    },
    onLoad: function(options){
        var that = this;
        this.staticData.shot_id = options.shot_id;
        fetchData({
            url : "/shots/"+ options.shot_id,
            success: function(res){
                that.setData({shot:res.data});
            }
        });
        this.fetchComments(options);
        
    },
    fetchComments: function(options){
      if(this.data.requesting||this.data.finished){
        return;
      }
      var that = this;
      this.setData({ requesting: true });
      fetchData({
        url: "/shots/" + options.shot_id + "/comments?per_page=" + that.data.per_page + "&page=" + that.data.page,
        success: function (res) {
          if (res && res.data) {
            var comments = res.data.map((comment) => {
              return that.handleComment(comment);
            });
            that.setData({
              comments: that.data.comments.concat(comments),
              page: comments.length === that.data.per_page ? that.data.page + 1 : that.data.page,
              requesting: false,
              finished: comments.length === that.data.per_page?false:true
            });
          }
        },
        error: function () {
          that.setData({ requesting: false });
        }
      });
    },
    bindViewTap: function(){
       wx.navigateTo({
           url: "../user/user?user_id=" + this.data.shot.user.id
       }); 
    },
    handleComment: function(comment){
      if(!comment||!comment.body){
        return comment;
      }
      var reg = /\<([^\>]*)?\>/g;
      return Object.assign({}, comment, {
        body: comment.body.replace(reg, "")
      });
    },
    onReachBottom: function () {
      if (this.data.requesting) {
        return;
      }
      this.fetchComments(this.staticData);
    }
});