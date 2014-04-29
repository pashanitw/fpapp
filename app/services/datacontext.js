define(['services/mapper','routes','facebook'],function(mapper,routes,FB){
    var cacheData={
        "albums":'',
        "friends":[],
        "me":'',
        "friendCount":'',
        "albumCount":'',
        "likesCount":''
    },
    friendOffset= 0,
    friendLimit=10;
    var userPermissions=['user_likes','publish_actions','user_about_me','user_location','user_friends','user_photos','user_work_history',
        'friends_about_me','friends_hometown','friends_birthday','friends_hometown','friends_location','friends_work_history','friends_likes'].join(',');
    var login=function(){
           enableProgress();
        FB.login(function(response){
            disableProgress();
             routes.activate("profile");
        }, {scope: userPermissions});
        },
 getBasicInfo=function(){
        var deferred= $.Deferred(),coverRequests=[];
        if(cacheData["albums"]&&cacheData["friendCount"]&&cacheData["albumCount"]&&cacheData["likesCount"]&&cacheData["me"]){
            deferred.resolve(cacheData);
        }else{
            FB.api('me?fields=id,name,birthday,work,about,friends,location,hometown,quotes,albums,likes,picture.width(100).height(100)', 'get', function(response){
                var albums=response.albums?response.albums.data:[],
                    resolved= 0,
                    friends=response.friends?response.friends.data:[],
                    likes=response.likes?response.likes.data:[];

                console.log("pic url",response.picture.data.url);
                for(var i=0;i<albums.length;i++){
                    $.when(coverPhoto(albums[i])).done(function(resp){
                        if(++resolved===albums.length){
                            cacheData["albums"]= mapper.mapAlbums(albums);
                            cacheData["friendCount"]=friends.length;
                            cacheData["albumCount"]=albums.length;
                            cacheData["likesCount"]=likes.length;
                            cacheData["me"]= mapper.mapUsers([response])[0];
                            deferred.resolve(cacheData);
                        }
                    });
                }
            });
        }

        return deferred.promise();

},
increaseLimit=function(){
    friendOffset+=friendLimit;
},
getFriendsInfo=function(){
    var deferred= $.Deferred();
    console.log(friendOffset,friendLimit);
FB.api('me/friends?fields=id,name,work,about,hometown,location,quotes,likes,birthday,picture.width(200).height(200)&offset=+'+friendOffset+'&limit='+friendLimit,'get',function(response){
    if(cacheData["friends"].length&&cacheData["friends"].length===(friendOffset+friendLimit)){
        alert("im fucking");
        deferred.resolve(cacheData["friends"]);
    }else{
        debugger;
        cacheData["friends"]= cacheData["friends"].concat(mapper.mapUsers(response.data));
        console.log("test flags",cacheData["friends"],response.data);
        deferred.resolve(cacheData["friends"]);
    }
});
    return deferred.promise();
},
coverPhoto=function(album){
    id=album.cover_photo
    var width=500,height=500,deferred=$.Deferred();
        FB.api('/'+id+'/picture?width='+width+'&height='+height, function(resp){
            if(resp.data.url){
                album['cover_url']=resp.data.url;
            }
            deferred.resolve(resp);
        });
    return deferred.promise();
},
enableProgress = function () {
    $("#pageLoader").css('display', 'block');
},
disableProgress = function () {
    $("#pageLoader").css('display', 'none');
},
show=function(id){
    $("#"+id).css('opacity', 1);
};
    return {
        getBasicInfo:getBasicInfo,
        getFriendsInfo:getFriendsInfo,
        enableProgress:enableProgress,
        disableProgress:disableProgress,
        login:login,
        show:show,
        increaseLimit:increaseLimit
    }
});