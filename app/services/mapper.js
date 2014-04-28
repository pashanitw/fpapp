define(['models/user', 'models/album'], function (user, album) {
    var userAlbums,users;
    var mapAlbums = function (albums) {
            userAlbums=[];
            var index = 0, len = albums.length, model;
            for (; index < len; index++) {
                model = new album(albums[index].id, albums[index].name, albums[index].count, albums[index].cover_url);
                userAlbums.push(model);
            }
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
        }
    return{
        mapAlbums: mapAlbums,
        mapUsers:mapUsers
    }

});