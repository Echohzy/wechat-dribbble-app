var host = "https://api.dribbble.com/v1";
var access_token = "d38a9798b383a8fff48910e9d84774fe0cbf180428db76767e2d36a428238496";

function fetchData(params){
    return wx.request({
        url: host + params.url,
        header: {
           "Authorization":  "Bearer " + access_token,
           'Content-Type': 'application/json'
        },
        data:params.data,
        method: params.method || "GET",
        success: params.success,
        error: params.error
    });
}

module.exports = {
   fetchData: fetchData 
}