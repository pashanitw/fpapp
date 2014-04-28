define(['services/datacontext'], function (datacontext) {
    var friends=ko.observableArray([]);
    var activate=function(){
        $.when(datacontext.getFriendsInfo()).then(function(data){
            console.log("this is data",data);
            friends(data);
        });
    }
    var node = document.getElementById('app');
    ko.cleanNode(node);
    ko.applyBindings({
        friends: friends
    }, node);
    return{
        activate:activate
    }
})