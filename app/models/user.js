define(function(){
    var User=function(){
        var self=this;
        (function (s) {
            self.id=ko.observable(s[0])
            self.name=ko.observable(s[1]);
            self.birthday=ko.observable(s[2]);
            self.work = ko.observableArray([]);
            self.work(s[3])
            self.location = ko.observable(s[4]),
            self.quotes = ko.observable(s[5]);
            self.profilePic = ko.observable(s[6]);
            self.hometown=ko.observable(s[7]);
            self.firstName = ko.observable(s[8]);
            self.secondName = ko.observable(s[9]);
        })(arguments)
    };
    return User;
});
