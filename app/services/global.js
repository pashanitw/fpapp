define([],function(){
var accessToken='',isLoggedin;
    var setAccessToken=function(token){
        accessToken=token;
    },
    getAccessToken=function(token){
        return accessToken;
    },
        setLogin=function(){
            isLoggedin();
        },
        isLoggedIn=function(){
            return isLoggedin;
        };

    return{
        setAccessToken:setAccessToken,
        getAccessToken:getAccessToken,
        setLogin:setLogin,
        isLoggedIn:isLoggedIn
    }
});