$(document).ready(function() {
    $('select').material_select();
    $('#video_file').on("change",function(e){
        var file = this.files[0];
        var formData = new FormData(this[0]);
        formData.append("video_file",this.files[0]);
        console.log(file);
        console.log(formData.get("video_file"));
        var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJZejRielBMeWp3TU9ENE4yU1RDeVJNVWNybDgzIiwiaWF0IjoxNTExMTczMzg3LCJleHAiOjE1MTExNzY5ODcsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHl0b29sa2l0Lmdvb2dsZWFwaXMuY29tL2dvb2dsZS5pZGVudGl0eS5pZGVudGl0eXRvb2xraXQudjEuSWRlbnRpdHlUb29sa2l0IiwiaXNzIjoiZmlyZWJhc2UtYWRtaW5zZGstcHM3bmVAdnItY29uZmVyZW5jZS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXBzN25lQHZyLWNvbmZlcmVuY2UuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20ifQ.Um53Lh-FdKc5wjJGgSxXMCRr0yvuwPtd02jsta8Aj5lrYP-NmdQ-zqvCCwnPVSsCliWLBtm3C0SW_BHnGCMyoKFygFWe8mTXn9OgQjtFSD8jxFT_DcCW4qaleckkg2bh18eZgnlDxFofzN7BvkizFxuqmoqfxZjxYF3YVw-93w6OtyY1xC0CLWAUwf1dpIvAA7qxSecUFZ7ENWjrhQfZO7qH3aQGec1M2VPO0SNeAcnIBXatUyc-CQdxcaOfcwDZoYxXaL9Z4FMtv3JzAAdg9KzwwW72xZF4kVB5TRiR8DSpJuqrKB15CG782rQ4Yi3p19a5nVyU8zhJgmTvMMRVBQ";
        var xhr = new XMLHttpRequest();
        xhr.open("POST",'http://localhost:8000/upload?token=' + token);
        xhr.send(formData);
    });
});
