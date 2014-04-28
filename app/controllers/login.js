define([],function(){
  var userPermissions=['user_likes','publish_actions','user_about_me','user_location','user_friends','user_photos','user_work_history',
        'friends_about_me','friends_hometown','friends_birthday','friends_hometown','friends_location','friends_work_history','friends_likes'].join(',');
   var login=function(){
       FB.login(function(){

       }, {scope: userPermissions});
   }
    return {
        login:login
    }
});