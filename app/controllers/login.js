define(['services/datacontext'],function(datacontext){
   var login=function(){
       datacontext.login();
       },
       showView=ko.observable(false);
    var applyBindings = function () {
        var node = document.getElementById('app');
        ko.cleanNode(node);
        ko.applyBindings({
            login: login,
            showView: showView
        }, node);
    }

    var activate=function(){
        login();
    }

    return {
        login:login,
        activate:activate,
        showView:showView,
        applyBindings:applyBindings

    }
});