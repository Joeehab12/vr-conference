$(document).ready(function(){
    $.get("http://localhost:8000/conferences?token="+ $.cookie("token"),function(data){
        var index = 0;
        data.forEach(function(item){
            var string = "<li><div class=\"collapsible-header\"><img class=\"circle\" width = \"40px\" height = \"40px\"" + "src = \"" + item.thumbnail + "\"></img>"
            + item.host_company + " Conference</div><div class=\"collapsible-body\"><p>" + item.description + "</p><a href = \"http://localhost:8080/content-main?id="+index+"\">Go to Conference</a></div></li>";
            console.log(string);
            $('.collapsible').append(string);
            index++;
        });
    });
});
