$(document).ready(function() {
    $('select').material_select();
    $('#video_file').on("change",function(e){
        var file = this.files[0];
        var formData = new FormData(this[0]);
        formData.append("video_file",this.files[0]);
        console.log(file);
        console.log(formData.get("video_file"));
        var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJZejRielBMeWp3TU9ENE4yU1RDeVJNVWNybDgzIiwiaWF0IjoxNTExMTE5Mjc3LCJleHAiOjE1MTExMjI4NzcsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstcHM3bmVAdnItY29uZmVyZW5jZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXBzN25lQHZyLWNvbmZlcmVuY2UuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.RMgtggyHkOpBXhqUHaF6CLgtbTGroJEm2gjmd8Ohw0i2Zd5x3MHRz_f44qLdZYcBLHCx55_p-ghY5JPC-4tSvB5_LSSFByBrbbOehpzToo2wpeIVZOdLoPJ1LB53WCpazqULzMqdpbqWpkuNEKYL-J16IqX8VLKi7-MYJ9-s1cwbydFl90ww-XiCyeBwvcPtfuYJkSsXPx3757AC938bNeAhiPpSrN3tUeGiW7oiexkBVxcWxg8wBULj5pS60KebLmFCCYzYMW5C-o6Itd5jgNMFA0YTlyxOAPl4av10V6AVQfMd2Wij2GmpNe-hrrtkCQLeP0ud_kGEAMZ5YSFWUQ";
        var xhr = new XMLHttpRequest();
        xhr.open("POST",'http://localhost:8000/video?token=' + token);
        xhr.send(formData);
    });
});
