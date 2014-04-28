define([], function () {
    var Album = function () {
        var self = this;
        (function (s) {
            self.id = ko.observable(s[0]),
            self.name = ko.observable(s[1]);
            self.count = ko.observable(s[2]);
            self.cover=ko.observable(s[3]);
            self.photos = ko.observableArray([]);
            self.isPhotoFetched = ko.observable(false);
        })(arguments)
    };
    return Album;
});
