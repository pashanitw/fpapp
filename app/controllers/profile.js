define(['views/profile', 'services/datacontext'], function (profileView, datacontext) {
    var albums = ko.observableArray([]),
        albumCount = ko.observable(),
        likesCount = ko.observable(),
        friendsCount = ko.observable(),
        me=ko.observable();
    var activate = function () {
        datacontext.enableProgress();
        $.when(datacontext.getBasicInfo()).then(function (resp) {
            albums(resp['albums']);
            albumCount(resp.albums.length);
            likesCount(resp.likesCount);
            friendsCount(resp.friendCount);
            me(resp.me);
            datacontext.show("profile")
            datacontext.disableProgress();
        });
    }
    var render = function () {
        console.log(coverPhotos);
    };
    var node = document.getElementById('app');
var applyBindings=function(){
    ko.cleanNode(node);
    ko.applyBindings({
        albums: albums,
        me: me,
        albumCount: albumCount,
        likesCount: likesCount,
        friendsCount: friendsCount,
    }, node);
}

    return {
        activate: activate,
        applyBindings:applyBindings
    }
});