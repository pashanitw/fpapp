define([],function(){
   function Photo(){
      var self=this;
       (function (s) {
           self.id=ko.observable(s[0])
           self.source=ko.observable(s[1]);
           self.name=ko.observable(s[2]);
       })(arguments);
       self.isNext=ko.observable(false);
       self.isPrev=ko.observable(false);
       self.isCurrent=ko.observable(false);
       self.isFirst=ko.observable(false),
       self.isAnim=ko.observable(true);
   }
return Photo;
});