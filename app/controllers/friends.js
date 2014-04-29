define(['services/datacontext'], function (datacontext) {
    var friends=ko.observableArray([]);
    var activate=function(){
            getFriends();
        },
        getFriends=function () {
            datacontext.enableProgress();
            $.when(datacontext.getFriendsInfo()).then(function (data) {
                 friends(data);
                datacontext.disableProgress();
                datacontext.show("friends");
            });
        },
        toggleFriendExpand = function (data) {
            data.isExpanded(data.isExpanded()?false:true);
        },
        loadMoreFriends=function(){
            datacontext.increaseLimit();
            getFriends();
        },
        applyBindings=function(){
        var node = document.getElementById('app');
        ko.cleanNode(node);
        ko.applyBindings({
            friends: friends,
            toggleFriendExpand:toggleFriendExpand,
            loadMoreFriends:loadMoreFriends
        }, node);
    }
    return{
        activate:activate,
        applyBindings:applyBindings
    }
})