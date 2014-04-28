define(['services/datacontext'], function (datacontext) {
    var albums = ko.observableArray([]);
    var activate = function () {
        $.when(datacontext.getAlbums()).then(function (resp) {
            console.log(resp);
            albums(resp);
        });
    }
    var node=document.getElementById('app');
    ko.cleanNode(node);
    ko.applyBindings({
        albums: albums
    },node);
    return {
        activate: activate
    }
});