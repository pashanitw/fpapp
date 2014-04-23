define(function(){
var Route=function(){
    var self=this;
    (function(s){
        self.name=s[0];
        self.url=s[1];
        self.controller=s[2];
        self.view=s[3];
    })(arguments);
}
Route.prototype.activate=function(){
    var self=this;
    console.log("in activating Url",this.url);
    require([self.controller], function (controller) {
       controller.activate();
    });
}
    return Route;
})