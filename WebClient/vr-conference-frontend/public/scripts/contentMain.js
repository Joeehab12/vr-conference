$(document).ready(function() {
    $('select').material_select();
    $('#choose_file').on("click",function(){
        $('#video_file').click();

    });
    $('#video_file').hide();
    var id = window.location.href.substring(window.location.href.lastIndexOf("=")+1);
    console.log(id);
    $.post("http://localhost:8000/booths?token=" + $.cookie("token"),{id: id}).done(function(data){
        data.forEach(function(item){
            if (item.reserved == "false"){
                $("#location_selector").append("<option value = " + item.location + '>Location ' + item.location + "</option>");
                console.log(item.location);
                console.log($("#canvas1"));
                $('select').material_select();
            }
        });
    });
    $('#upload').on("click",function(e){
        var file = $("#video_file")[0].files[0];
        var formData = new FormData($("#video_file")[0][0]);
        formData.append("video_file",$("#video_file")[0].files[0]);
        formData.append("location",$('#location_selector').val());
        formData.append("file_type",$('#file_type').val());
        console.log($('#location_selector').val());
        console.log(file);
        console.log(formData.get("video_file"));
        var token = $.cookie("token");
        var xhr = new XMLHttpRequest();
        xhr.open("POST",'http://localhost:8000/upload?token=' + token);
        xhr.send(formData);
        $.get("http://localhost:8000/booths?token=" + $.cookie("token"),function(data){
            $("#location_selector").empty();
            data.forEach(function(item){
                if (item.reserved == "false"){

                    $("#location_selector").append("<option value = " + item.location + '>Location ' + item.location + "</option>");
                    console.log(item.location);
                    $('select').material_select();
                }
            });
        });
    });
    $('#video_file').change(function() {
        var file = $('#video_file')[0].files[0].name;
        $("#file_name").text(file);
    });
});
