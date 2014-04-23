var User=function(){
    (function (s) {
        this.name=s[0];
        this.firstName=s[1];
        this.secondName=s[2];
        this.followerCount=s[3];
        this.albumCount=s[4];
        this.followingCount=s[5];
    })(arguments)
};