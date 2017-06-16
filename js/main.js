$(document).ready(function() {
    var res = retrieveGames().responseJSON;
    res.games.forEach(function(id) {
        var game = gameInfo(id).responseJSON;
        console.log(game);
        var html = '<div class="game" onclick="loadgame(\'' + id + '\')">';
        html += '<div class="game-title">' + game.info.name + '</div>';
        html += '<div class="game-players">Size: ' + game.info.size + ' players</div>';
        html += '<div class="game-description">' + game.info.desc + '</div></div>';
        $('.container').append(html);
    });
});

var retrieveGames = function() {
    var response;
    var user = window.location.href.split('=')[1];
    var token = localStorage.getItem('swgc-token');
    var data = {
        user : user,
        token : token
    };
    return $.ajax({
        url: 'https://galactic-node-sqweeks.c9users.io/retrievegames',
        type: 'POST',
        data: data,
        async: false,
        success: function (res) {
            console.log(res);
        },
        error: function (xhr, status) {
            console.log('ERROR');
            console.log(xhr);
            console.log(status);
            var route = xhr.responseJSON.redirect;
			console.log('route: ' + route);
			if (route) {
			    window.location.href = route;
			}
        }
    });
}

var gameInfo = function(id) {
    var user = window.location.href.split('=')[1];
    var token = localStorage.getItem('swgc-token');
    var game = id;
    var data = {
        user : user,
        token : token,
        game : game
    };
    return $.ajax({
        url: 'https://galactic-node-sqweeks.c9users.io/gameinfo',
        type: 'POST',
        data: data,
        async: false,
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log('ERROR');
            console.log(xhr);
            console.log(status);
            var route = xhr.responseJSON.redirect;
			console.log('route: ' + route);
			if (route) {
			    window.location.href = route;
			}
        }
    });
};

function loadgame(id) {
    window.location.href = 'game.html?username=' + window.location.href.split('=')[1] + '=' + id;
}