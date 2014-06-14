define(['services/datacontext','services/global'], function (datacontext,global) {
    var albums = ko.observableArray([]),
        isAlbumExpanded=ko.observable(false),
        isUploadExpanded=ko.observable(false),
        slidePhotos=ko.observableArray([]),
        pointer= 0,
        selectedAlbum=ko.observable();
    var activate = function (data) {
        datacontext.enableProgress();
        $.when(datacontext.getBasicInfo()).then(function (resp) {
            debugger;
            albums(resp["metaAlbums"]);
            console.log("this is albums",albums());
            datacontext.show("slide-show");
            datacontext.disableProgress()
            if(data){
                getPhotosOfAlbum(data);
            }
        });

        },
        getPhotosOfAlbum=function(id){
            //fetchAlbumById
            datacontext.enableProgress();
            $.when(datacontext.fetchAlbumById(id)).then(function(photos){
                slidePhotos(photos);
                console.log("slide pics",slidePhotos());
                datacontext.disableProgress();
            })

        }
        toggleAlbumExpand = function (k) {
            debugger;
            isAlbumExpanded(k)
        },
        toggleUploadExpand = function (k) {
            isUploadExpanded(k)
        },
        uploadPhoto = function () {
            console.log("sel album",selectedAlbum());
            var action_url = 'https://graph.facebook.com/'+selectedAlbum().id()+'/photos?access_token=' +  global.getAccessToken();
            var form = document.getElementById('upload-photo-form');
            form.setAttribute('action', action_url);
            form.submit();
        },
        changeSource=function(data){
            console.log(data.id());
            getPhotosOfAlbum(data.id());
        },
        nextClicked = function () {
            if(pointer<slidePhotos().length-1){
                slidePhotos()[pointer].isCurrent(false);
                slidePhotos()[pointer].isPrev(true);
                pointer++;
                if(pointer<slidePhotos().length){
                    slidePhotos()[pointer].isCurrent(true);
                }

            }
        }
       prevClicked=function(){
           if(pointer>0){
               slidePhotos()[pointer].isCurrent(false);
               slidePhotos()[pointer].isPrev(false);
               //  slidePhotos()[pointer].isNext(true);
               pointer--;
               slidePhotos()[pointer].isCurrent(true);
           }
       }

      var applyBindings = function () {
          var node=document.getElementById('app');
        ko.cleanNode(node);
        ko.applyBindings({
            albums: albums,
            isAlbumExpanded:isAlbumExpanded,
            isUploadExpanded:isUploadExpanded,
            toggleAlbumExpand:toggleAlbumExpand,
            toggleUploadExpand:toggleUploadExpand,
            slidePhotos:slidePhotos,
            uploadPhoto:uploadPhoto,
            prevClicked:prevClicked,
            selectedAlbum:selectedAlbum
        }, node);
    };

    return {
        activate: activate,
        applyBindings:applyBindings
    }
});