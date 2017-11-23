$(document).ready(function() {
  $('select').material_select();
  $('#register').click(function(){
      var pass = $('#password').val();
      var pass_confirm = $('#password_confirm').val();
      if (pass != pass_confirm){
          $('#error-message').text("Passwords do not match.");
          return;
      }
        $.post('http://localhost:8000/register',
        { firstName: $('#first_name').val(),
          lastName: $('#last_name').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          type: $('#selection').val()
        })
        .done(function(data){
            if (data.status == "Success"){
                    console.log('user saved successfuly');
                    $('#first_name').val('');
                    $('#last_name').val('');
                    $('#email').val('');
                    $('#password').val('');
                    $('#password_confirm').val('');
            }
        });
    });

});
