define(['route/router'],function(router){
    var routes=[
        {
            name:'Profile',
            url:"profile",
            controller:'controllers/profile',
            view:'template/profile.html'
        },

        {
            name:'Albums',
            url:"albums",
            controller:'controllers/albums',
            view:'template/albums.html'
        },
        {
            name: 'Friends',
            url: "friends",
            controller: 'controllers/friends',
            view: 'template/friends.html'
        },
        {
            name:'Login',
            url:"login",
            controller:'controllers/login',
            view:'template/login.html'
        }
        ],
        activate=function(){
            if(arguments.length===0){
              router.activateDefault();
                return;
            }
              router.activate(arguments[0])
        }
    router.register(routes,0);
    return {
        activate:activate
    }
});