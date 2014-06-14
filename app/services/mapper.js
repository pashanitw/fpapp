define(['models/user', 'models/album','models/photo'], function (user, album,photo) {
    var userAlbums,users;
    var mapAlbums = function (albums,cacheAlbum) {
            userAlbums=[];
            var index = 0, len = albums.length, model;
            for (; index < len; index++) {
                model = new album(albums[index].id, albums[index].name, albums[index].count, albums[index].cover_url);
                userAlbums.push(model);
                cacheAlbum[albums[index].id]=model;
            }
            cacheAlbum.fetched=true;
            return userAlbums;
        },
        mapUsers = function (friends) {
            users=[];
            var index = 0, len = friends.length, model;
            for (; index < len; index++) {
                model = new user(friends[index].id, friends[index].name, friends[index].birthday, friends[index].work,friends[index].location,friends[index].quotes,friends[index].picture.data.url,friends[index].hometown);
                users.push(model);
            }
            return users;
        },
        mapPhotos=function(resp){
            var photos=[],photoModel;
            for(var i=0;i<resp.length;i++){
                photoModel=new photo(resp[i].id,resp[i].source,resp[i].name);
                photos.push(photoModel);
            }
            photos[0].isFirst(true);
            return photos;
        }
    return{
        mapAlbums: mapAlbums,
        mapUsers:mapUsers,
        mapPhotos:mapPhotos
    }

});