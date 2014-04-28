define(['services/mapper'],function(mapper){
    var cacheData={
        "albums":'',
        "friends":'',
        "me":'',
        "friendCount":'',
        "albumCount":'',
        "likesCount":''
    }
var getBasicInfo=function(){
        var deferred= $.Deferred(),coverRequests=[];
        if(cacheData["albums"]&&cacheData["friendCount"]&&cacheData["albumCount"]&&cacheData["likesCount"]&&cacheData["me"]){
            deferred.resolve(cacheData["albums"]);
        }else{
            FB.api('me?fields=id,name,birthday,work,about,friends,location,hometown,quotes,albums,likes,picture.width(100).height(100)', 'get', function(response){
                var albums=response.albums.data,resolved= 0,friends=response.friends.data,likes=response.likes.data;

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
getFriendsInfo=function(){
    var deferred= $.Deferred();
FB.api('me/friends?fields=id,name,work,about,hometown,location,quotes,likes,birthday,picture.width(200).height(200)','get',function(response){
    if(cacheData["friends"]){
        alert("im fucking");
        deferred.resolve(cacheData["friends"]);
    }else{
        cacheData["friends"]=mapper.mapUsers(response.data);
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
getFriends=function(){
    FB.api('me/albums','get',function(data){
        console.log(data);
    })
}
getAlbumCoverPhoto=function(){

},
login=function(){
    FB.login(function(data){
        return data;
    }, {scope: userPermissions});
}
    return {
        getBasicInfo:getBasicInfo,
        getFriends:getFriends,
        getAlbumCoverPhoto:getAlbumCoverPhoto,
        getFriendsInfo:getFriendsInfo
    }
});