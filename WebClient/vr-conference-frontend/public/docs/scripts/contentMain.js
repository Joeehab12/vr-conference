$(document).ready(function() {
    $('select').material_select();
    $('#choose_file').on("click",function(){
        $('#video_file').click();

    });
    $('#video_file').hide();
    $('#upload').hide();
    $("#file_type_selector").hide();
    $("#choose_file").hide();
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
        formData.append("id",id);
        console.log($('#location_selector').val());
        console.log(file);
        console.log(formData.get("video_file"));
        var token = $.cookie("token");
        var xhr = new XMLHttpRequest();
        xhr.open("POST",'http://localhost:8000/upload?token=' + token);
        xhr.send(formData);

    });
    var locations_map = {
        "A": "0",
        "B": "1",
        "C": "2",
        "D": "3",
        "E": "4",
        "F": "5"
    }
    $("#reserve").on("click",function(){

        $.post("http://localhost:8000/reserve?token=" + $.cookie("token"),{boothId: locations_map[$("#location_selector").val()],conferenceId:id}).done(function(data){
            $('#upload').show();
            $("#file_type_selector").show();
            $("#choose_file").show();
            $("#reserve").hide();
            $("#location_selector").prop("disabled", true);
            $('select').material_select();
            console.log("reserved successfully");
        });

        // $.post("http://localhost:8000/booths?token=" + $.cookie("token"),{id: id}).done(function(data){
        //     // $("#location_selector").empty();
        //     // data.forEach(function(item){
        //     //     if (item.reserved == "false"){
        //     //         $("#location_selector").append("<option value = " + item.location + '>Location ' + item.location + "</option>");
        //     //         console.log(item.location);
        //     //         console.log($("#canvas1"));
        //     //         $('select').material_select();
        //     //     }
        //     // });
        // });
    });
    $('#video_file').change(function() {
        var file = $('#video_file')[0].files[0].name;
        $("#file_name").text(file);
    });
});
