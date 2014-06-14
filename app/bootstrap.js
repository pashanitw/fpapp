require(['route/router','routes','services/global'],function(router,routes,global){
var userPermissions=['user_likes','publish_actions','user_about_me','user_location','user_friends','user_photos','user_work_history',
    'friends_about_me','friends_hometown','friends_birthday','friends_hometown','friends_location','friends_work_history','friends_likes'].join(',');
    require.config({
      shim: {
        'facebook' : {
          exports: 'FB'
        }
      },
      paths: {
        'facebook': '//connect.facebook.net/en_US/all'
      }
    });
    require(['facebook'],function(FB){
        FB.init({
                    appId: '572927169465707',
                    status: true,
                    xfbml: true
                });
        FB.Event.subscribe('auth.authResponseChange', function (response) {
            if (response.status === 'connected') {
                console.log('Logged in');
            } else {
                FB.login(function(){}, {scope: userPermissions});
            }
        });
        FB.getLoginStatus(function(response) {
            if (response.authResponse) {
                global.setAccessToken(response.authResponse.accessToken);
                if(location.hash){
                    changeRoute();
                }else{
                    router.activate("profile");
                }
            }else{
                router.activate("login");
            }

        });
    });
  //  FB.login(function(){}, {scope: userPermissions});
    function changeRoute(){
        router.activate(location.hash.split("#")[1]);
    }
    $(window).bind( 'hashchange', function(e) {
        changeRoute();
    });

});