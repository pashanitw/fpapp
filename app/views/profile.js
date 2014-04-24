define(function(){
    var template;

    var render=function(){
        $.get('../template/profile.html', function (data) {
            if (data) {
                $('body').append(data);
                document.getElementById('app').innerHTML= tmpl("profile",{name:"hello pasha"});
            }
        });

    }
    return {
        render:render
    }
});