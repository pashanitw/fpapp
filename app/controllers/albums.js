define(['services/datacontext'], function (datacontext) {
    var albums = ko.observableArray([]),
        isAlbumExpanded=ko.observable(false),
        isUploadExpanded=ko.observable(false);
    var activate = function () {
        datacontext.enableProgress();
        $.when(datacontext.getBasicInfo()).then(function (resp) {
            debugger;
            albums(resp["albums"]);
            datacontext.show("slide-show");
            datacontext.disableProgress();
        });
        },
        toggleAlbumExpand = function (k) {
            debugger;
            isAlbumExpanded(k)
        },
        toggleUploadExpand = function (k) {
            isUploadExpanded(k)
        };
      var applyBindings = function () {
          var node=document.getElementById('app');
        ko.cleanNode(node);
        ko.applyBindings({
            albums: albums,
            isAlbumExpanded:isAlbumExpanded,
            isUploadExpanded:isUploadExpanded,
            toggleAlbumExpand:toggleAlbumExpand,
            toggleUploadExpand:toggleUploadExpand
        }, node);
    };

    return {
        activate: activate,
        applyBindings:applyBindings
    }
});