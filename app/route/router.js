define(['route/routemodel','utils'],function(routemodel,utils){
var defRoute,
    routes=[],
    cacheRoutes={
        length:0
    },
    register=function(routeArray,defaultRoute){
        var index,len,route;
        defRoute=defRoute||0;
        defRoute=routeArray[defRoute];
        for(index=0,len=routeArray.length;index<len;index++) {
            cacheRoutes[routeArray[index].url]=utils.extend(routeArray[index], new routemodel());
        }
    },
    activateDefault=function(){
        cacheRoutes[defRoute.url].activate();
    },
    activate=function(route){
       cacheRoutes[route.url].activate();
    }
    return {
        activateDefault:activateDefault,
        activate:activate,
        register:register
    }
});