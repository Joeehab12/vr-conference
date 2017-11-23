$(document).ready(function() {
    $('select').material_select();
    $('#choose_file').on("click",function(){
        $('#video_file').click();

    });
    $('#video_file').hide();
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
    });
    $('#video_file').change(function() {
        var file = $('#video_file')[0].files[0].name;
        $("#file_name").text(file);
    });
});
