define(['views/profile'],function(profileView){
    var activate=function(){
        $.get('../template/profile.html', function (data) {
            if (data) {
                $('body').append(data);

            }
        });
        fetchAlbumInfo();
    }
    var render=function(){
        console.log(coverPhotos);
        document.getElementById('app').innerHTML= tmpl("profile",{albums:coverPhotos});
    }
    var coverPhotos=[],promises=[];
    var fetchAlbumInfo=function(){
        FB.api('me?fields=albums', 'get', function(data){
            var albums=data.albums.data;
            for(var i=0;i<albums.length;i++){
                $.when(coverPhoto(albums[i].cover_photo)).then(function(){
                    //render();
                });
            }


        });
    }
    var width=500,height=506;
    var coverPhoto=function(id){
       return FB.api('/'+id+'/picture?width='+width+'&height='+height, function(resp){
            console.log("this is resp",resp);
           coverPhotos=[resp.data.url];
           render();
           // return resp.data.url;
        });
    }
    return {
        activate:activate
    }
});