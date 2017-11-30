$(document).ready(function(){
    console.log(location.host);
    $("#login").click(function(){
        $.post('http://localhost:8000/login',{email: $("#email").val(),password: $("#password").val()})
        .done(function( data ) {
            $.cookie("token",data.token);
            if (data.status == "Success"){
                if (data.user_type == "visitor"){
                $(location).attr('href','http://localhost:8080/visitor');
                }
                else if (data.user_type == "content provider"){
                $(location).attr('href','http://localhost:8080/content');
                }
            }
            else{
                $('#error-message').text(data.message);
            }
        });
    });
    $("#password").keypress(function(event){
        if (event.which == 13){
            $.post('http://localhost:8000/login',{email: $("#email").val(),password: $("#password").val()})
            .done(function( data ) {
                $.cookie("token",data.token);
                if (data.status == "Success"){
                    $(location).attr('href','http://localhost:8080/visitor');
                }
                else{
                    $('#error-message').text(data.message);
                }
            });
        }
    });

})
