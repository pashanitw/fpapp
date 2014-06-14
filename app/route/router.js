define(['route/routemodel','utils'],function(routemodel,utils){
var defRoute,
    routes=[],
    cacheRoutes={
        length:0
    },
    hashRegex=/^(.+?)\/(.+)$/,
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
        debugger;
        var hash,data;
        var url=route.url||route;
        var match=url.match(hashRegex);
        if(match){
            url=match[1];
          data=match[2];
        }

        var route=cacheRoutes[url]||cacheRoutes[url+"/:id"];
        if(route){
            route.activate(data);
        }

    }
    return {
        activateDefault:activateDefault,
        activate:activate,
        register:register
    }
});