var planets = [
    {
        id : 'endor',
    	name : 'Endor',
        coords : {
            map : {'x' : 899, 'y' : 831, 'r' : 10},
            graph : {'x' : 1269, 'y' : 715, 'r' : 150}
    },
        nodes : ['geonosis', 'kashyyyk', 'hoth', 'bespin']
    },
    {
        id : 'hoth',
        name : 'Hoth',
        coords : {
            map : {'x' : 911, 'y' : 942, 'r' : 10},
            graph : {'x' : 759, 'y' : 482, 'r' : 150}
    },
        nodes : ['death-star', 'coruscant', 'endor']
    },
    {
        id : 'bespin',
        name : 'Bespin',
        coords : {
            map : {'x' : 991, 'y' : 927, 'r' : 10},
            graph : {'x' : 759, 'y' : 946, 'r' : 150}
    },
        nodes : ['death-star', 'endor', 'tatooine']
    },
    {
        id : 'geonosis',
        name : 'Geonosis',
        coords : {
            map : {'x' : 1062, 'y' : 1058, 'r' : 10},
            graph : {'x' : 1780, 'y' : 482, 'r' : 150}
    },
        nodes : ['yavin-4', 'endor', 'coruscant']
    },
    {
        id : 'tatooine',
        name : 'Tatooine',
        coords : {
            map : {'x' : 1126, 'y' : 1062, 'r' : 10},
            graph : {'x' : 1269, 'y' : 1178, 'r' : 150}
    },
        nodes : ['kashyyyk', 'bespin']
    },
    {
        id : 'kashyyyk',
        name : 'Kashyyyk',
        coords : {
            map : {'x' : 1537, 'y' : 696, 'r' : 10},
            graph : {'x' : 1780, 'y' : 946, 'r' : 150}
    },
        nodes : ['yavin-4', 'tatooine', 'endor']
    },
    {
        id : 'yavin-4',
        name : 'Yavin IV',
        coords : {
            map : {'x' : 1699, 'y' : 566, 'r' : 10},
            graph : {'x' : 2289, 'y' : 715, 'r' : 150}
    },
        nodes : ['geonosis', 'kashyyyk']
    },
    {
        id : 'death-star',
        name : 'The Death Star',
        coords : {
            map : {'x' : 1357, 'y' : 655, 'r' : 10},
            graph : {'x' : 250, 'y' : 715, 'r' : 150}
    },
        nodes : ['hoth', 'bespin']
    },
    {
        id : 'coruscant',
        name : 'Coruscant',
        coords : {
            map : {'x' : 1304, 'y' : 631, 'r' : 10},
            graph : {'x' : 1269, 'y' : 250, 'r' : 150}
    },
        nodes : ['hoth', 'geonosis']
    }
];

var locationInfo = playerLocations().responseJSON;
console.log(locationInfo);
var scale = 1;
var currentPlanet = null;
var view = 'map';


$(document).ready(function() { createMap(); scaleMapToWindow(); $('#user-name').append(window.location.href.slice(window.location.href.indexOf('=') + 1).charAt(0).toUpperCase() + window.location.href.slice(window.location.href.indexOf('=') + 1).slice(1))});
$(window).resize(function() { scaleMapToWindow() });

function createMap() {
	var map = $('#galactic-map');
	planets.forEach(function(p) {
		var html = '<area shape="circle" id="' + p.id + '" coords="0, 0, 10" onclick="displayPlanet(\'' + p.id + '\')"/>';
		map.append(html);
	});
}

function scaleMapToWindow() {
	var g = $('#' + view);
    var x = g.height();
	scale = x / 1428;
    var ca = $('#canvas-a');
    var cb = $('#canvas-b');
    var cc = $('#canvas-c');
    ca.attr('width', ca.parent()[0].getBoundingClientRect().width);
    ca.attr('height', ca.parent()[0].getBoundingClientRect().height);
    cb.attr('width', cb.parent()[0].getBoundingClientRect().width);
    cb.attr('height', cb.parent()[0].getBoundingClientRect().height);
    cc.attr('width', cc.parent()[0].getBoundingClientRect().width);
    cc.attr('height', cc.parent()[0].getBoundingClientRect().height);
	planets.forEach(function(p) {
	    $('#' + p.id).attr('coords', (p.coords[view].x * scale + ',' + p.coords[view].y * scale + ',' + 2 * p.coords[view].r * scale));
	});
	var cc = returnContext('#canvas-c', '2d');
	var loc = arrayFilter(planets, locationInfo.location);
	console.log(cc);
	console.log(loc);
	drawCircle(cc, loc, '#0099ff', 7);
}

function displayPlanet(p) {
    var planet = arrayFilter(planets, p);
    currentPlanet = planet;
    var nodes = planet.nodes;
    var contexta = returnContext('#canvas-a', '2d');
    clearCanvas(contexta);
    var contextb = returnContext('#canvas-b', '2d');
    clearCanvas(contextb);
    $('#planet-nodes').html('');
    drawCircle(contexta, planet, '#ff0000', 7);
    nodes.forEach(function(n) {
        var obj = arrayFilter(planets, n);
        drawLine(contexta, planet, obj, '#FF0000', 10 * scale);
        drawCircle(contexta, obj, '#ff000', 7);
    });
    if (planet.id == locationInfo.location) {
        nodes.forEach(function(n) {
            var obj = arrayFilter(planets, n);
            $('#planet-nodes').append('<button onclick="displayRoute(this, \'' + obj.id + '\')">' + obj.name + '</button>');
        });
    }
    $('#planet-title').html(planet.name);
    $('#planet-players').html('Players');
    $('#move-button').hide();
    $('#move-button').attr('onclick', '');
    planetInfo(planet.id);
}

function displayRoute(e, o) {
    var obj = arrayFilter(planets, o);
    var p = currentPlanet;
    var cb = $('#canvas-b');
    var context = cb[0].getContext('2d');
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();
    drawLine(context, p, obj, '#0099ff', 10 * scale);
    drawCircle(returnContext($('#canvas-b'), '2d'), obj, '#00D81B', 7);
    $('#move-button').attr('onclick', 'move(this, \'' + obj.id + '\')');
    $('#move-button').show();
}

function clearCanvas(ctx) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}

function arrayFilter(a, n) {
    var o = a.filter(function (o) {
            return o.id === n;
        })[0];
    return o;
}

function drawLine(ctx, p, o, c, w) {
    ctx.beginPath();
    var xdiff = p.coords[view].x - o.coords[view].x;
    var ydiff = p.coords[view].y - o.coords[view].y;
    var hyp = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
    var spacing = (p.coords[view].r + 20) / hyp;
    ctx.moveTo((p.coords[view].x - xdiff * spacing) * scale, (p.coords[view].y - ydiff * spacing) * scale);
    ctx.lineTo((o.coords[view].x + xdiff * spacing) * scale, (o.coords[view].y + ydiff * spacing) * scale);
    ctx.strokeStyle = c;
    ctx.lineWidth = w;
    ctx.stroke();
}

function drawCircle(ctx, p, c, w) {
    ctx.beginPath();
    ctx.arc(p.coords[view].x * scale, p.coords[view].y * scale, (p.coords[view].r + 20) * scale, 0, 2*Math.PI, false);
    ctx.strokeStyle = c;
    ctx.lineWidth = w;
    ctx.stroke();
}

function returnContext(id, ctx) {
    var e = $(id);
    return e[0].getContext(ctx);
}

function changeView(e) {
    console.log('change');
    currentPlanet = null;
    var ca = returnContext('#canvas-a', '2d');
    var cb = returnContext('#canvas-b', '2d');
    clearCanvas(ca);
    clearCanvas(cb);
    if (view === 'map') {
        view = 'graph';
        $('#map').hide();
        $('#graph').show();
        scaleMapToWindow();
    }
    else if (view === 'graph') {
        view = 'map';
        $('#map').show();
        $('#graph').hide();
        scaleMapToWindow();
    }
    else {
        view = 'graph';
        $('#map').hide();
        $('#graph').show();
        scaleMapToWindow();
    }
}

function planetInfo(p) {
    console.log(locationInfo);
    var planet = locationInfo.planets[p];
    planet.forEach(function(player) {
        if (player) {
           $('#planet-players').append('<li id=li-' + player.id + '>' + player.id.charAt(0).toUpperCase() + player.id.slice(1) + '</li>'); 
        }
    });
}

function playerLocations() {
    var username = window.location.href.split('=')[1];
    var gameID = window.location.href.split('=')[2];
    var token = localStorage.getItem('swgc-token');
    var data = {
        user : username,
        token : token,
        game : gameID,
    };
    return $.ajax({
        url: 'https://galactic-node-sqweeks.c9users.io/playerlocations',
        type: 'POST',
        data: data,
        async: false,
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
            console.log('ERROR');
            console.log(status);
            var route = xhr.responseJSON.redirect;
			console.log('route: ' + route);
			if (route) {
			    window.location.href = route;
			}
        }
    });
}

function move(e, destination) {
    var username = window.location.href.split('=')[1];
    var gameID = window.location.href.split('=')[2];
    var token = localStorage.getItem('swgc-token');
    var data = {
        user : username, 
        token : token,
        game : gameID,
        origin : currentPlanet.id, 
        destination : destination
    };
	$.ajax({
		url: "https://galactic-node-sqweeks.c9users.io/moveplayer",
		type: "POST",
        data: data,
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status) {
			console.log(xhr);
			if (xhr.responseJSON.redirect) {
			    window.location.href = xhr.responseJSON.redirect;
			}
			if (xhr.responseJSON.code == 400) {
			    alert(xhr.responseJSON.message);
			}
        }
	});
}

function logout() {
    localStorage.clear();
    window.location.href = 'landing.html';
}