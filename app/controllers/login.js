define(['services/datacontext'],function(datacontext){
   var login=function(){
       datacontext.login();
       }
    var applyBindings = function () {
        var node = document.getElementById('app');
        ko.cleanNode(node);
        ko.applyBindings({
            login: login,
        }, node);
    }

    var activate=function(){
        datacontext.disableProgress()
       // login();
    }

    return {
        login:login,
        activate:activate,
        applyBindings:applyBindings
    }
});