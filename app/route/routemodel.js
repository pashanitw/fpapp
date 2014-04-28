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
var render=function(template){
    console.log("template is",template);
    var deferred = $.Deferred();
    $.get(template, function (data) {
        console.log(data);
        $("#app").html('');
        $("#app").append(data);
        setTimeout(function () {
            deferred.resolve();
        });
    });
    return deferred.promise();
    };
Route.prototype.activate=function(){
    var self=this;
    $.when(render(self.view)).then(function(){
        require([self.controller], function (controller) {
            controller.activate();
        });
    });
}
    return Route;
})