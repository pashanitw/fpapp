require(['route/router','routes'],function(router,routes){
var userPermissions=['user_likes','publish_actions','user_about_me','user_location','user_friends','user_photos','user_work_history',
    'friends_about_me','friends_hometown','friends_birthday','friends_hometown','friends_location','friends_work_history','friends_likes'].join(',');

    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            console.log('Logged in');
        } else {
            FB.login(function(){}, {scope: userPermissions});
        }
    });
  //  FB.login(function(){}, {scope: userPermissions});
    FB.getLoginStatus(function(response) {
        /*if (response.authResponse) {
            // alert('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                alert('Good to see you, ' + response.name + '.');
            });
        }*/
       /* FB.api('me/friends?fields=first_name,work,hometown,location,birthday,picture.width(200).height(200)', function(response) {
            console.log('Good to see you, ' , response);
        });*/
        console.log(response);
    });
    function changeRoute(){
        router.activate(location.hash.split("#")[1]);
    }
    if(location.hash){
        changeRoute();
    }
    $(window).bind( 'hashchange', function(e) {
        changeRoute();
    });

});