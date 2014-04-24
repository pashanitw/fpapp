require(['route/router','routes'],function(router,routes){
var userPermissions=['user_likes,publish_actions,user_about_me,user_location,user_friends,user_photos,user_work_history,friends_about_me,friends_hometown'].join(',');

    FB.Event.subscribe('auth.authResponseChange', function (response) {
        if (response.status === 'connected') {
            console.log('Logged in');
        } else {
            FB.login(function(){}, {scope: userPermissions});
        }
    });
    FB.login(function(){
        routes.activate();
    }, {scope: userPermissions});
});