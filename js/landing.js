function login() {
    var username = $('#l-user').val();
    var password = $('#l-pass').val();
    var data = {user : username, pass : password};
    console.log(data);
    $.ajax({
        url: 'https://galactic-node-sqweeks.c9users.io/login',
        type: 'POST',
        data: data,
        success: function (response) {
            console.log(response);
            localStorage.setItem('swgc-token', response.token);
            window.location.href = response.redirect + '?username=' + response.user;
        },
        error: function (xhr, status) {
            console.log('ERROR');
            console.log(xhr);
            console.log(status);
        }
    })
}

function signup() {
    var username = $('#s-user').val();
    var pass1 = $('#s-pass-0').val();
    var pass2 = $('#s-pass-1').val();
    var data = {};
    data.user = username;
    data.pass1 = pass1;
    data.pass2 = pass2;
    $.ajax({
        url: 'https://galactic-node-sqweeks.c9users.io/signup',
        type: 'POST',
        data: data,
        success: function (response) {
            console.log(response);
            if (response.redirect && response.user && response.token) {
                localStorage.setItem('swgc-token', response.token);
                window.location.href = response.redirect + '?username=' + response.user; 
            }
        },
        error: function (xhr, status) {
            console.log('ERROR');
            console.log(xhr);
            console.log(status);
        }
    });
}

function showlogin() {
    $('#initial').hide();
    $('#login').show();
}

function showsignup() {
    $('#initial').hide();
    $('#signup').show();
}