define(function(){
    var shallowExtend=function(source,dest){
        for(var prop in source){
           if(isObject(source[prop])){
               dest[prop]=dest[prop] || {};
               shallowExtend(source[prop],dest[prop]);
           }else{
               dest[prop]=source[prop];
           }
        }
            return dest;
        },
        copy=function(src){
            var dest;
            if(isObject(src)){
                dest={};
            }else if(isArray(src)){
                dest=[];
            }
            for(var prop in src){
                if(isObject(src[prop]) || isArray(src[prop])){
                    dest[prop]=copy(src[prop]);
                }else{
                    console.log("its copying");
                    dest[prop]=src[prop];
                }
            }
            return dest;
        },
        isArray=function(source){
           return source&&source.constructor&&source.constructor===Array
        },
        isObject=function(source){
            return source&&source.constructor&&source.constructor===Object
        },
        isDefined=function(source){
           return !typeof source===undefined;
        }
    return{
        extend:shallowExtend,
        isArray:isArray,
        isObject:isObject,
        isDefined:isDefined
    }
});