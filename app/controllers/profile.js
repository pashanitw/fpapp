define(['views/profile', 'services/datacontext'], function (profileView, datacontext) {
    var albums = ko.observableArray([]),
        albumCount = ko.observable(),
        likesCount = ko.observable(),
        friendsCount = ko.observable(),
        me=ko.observable();
    var activate = function () {
        $.when(datacontext.getBasicInfo()).then(function (resp) {
            albums(resp['albums']);
            albumCount(resp.albums.length);
            likesCount(resp.likesCount);
            friendsCount(resp.friendCount);
            me(resp.me);
            debugger;
            console.log("this is me",me);
        });
    }
    var render = function () {
        console.log(coverPhotos);
    };
    var node = document.getElementById('app');
    ko.cleanNode(node);
    ko.applyBindings({
        albums: albums,
        me: me,
        albumCount: albumCount,
        likesCount: likesCount,
        friendsCount: friendsCount
    }, node);
    return {
        activate: activate
    }
});