var planets = [{id : 'endor',
				name : 'Endor',
                coords : {'x' : 899, 'y' : 831},
                nodes : ['geonosis', 'kashyyyk', 'hoth', 'bespin']
               },
               {id : 'hoth',
                name : 'Hoth',
                coords : {'x' : 911, 'y' : 942},
                nodes : ['death-star', 'coruscant', 'endor']
               },
               {id : 'bespin',
                name : 'Bespin',
                coords : {'x' : 911, 'y' : 942},
                nodes : ['death-star', 'endor', 'tatooine']
               },
               {id : 'geonosis',
                name : 'Geonosis',
                coords : {'x' : 1060, 'y' : 1057},
                nodes : ['yavin-4', 'endor', 'coruscant']
               },
               {id : 'tatooine',
                name : 'Tatooine',
                coords : {'x' : 1073, 'y' : 1063},
                nodes : ['kashyyyk', 'bespin']
               },
               {id : 'kashyyyk',
                name : 'Kashyyyk',
                coords : {'x' : 1537, 'y' : 696},
                nodes : ['yavin-4', 'tatooine', 'endor']
               },
               {id : 'yavin-4',
                name : 'Yavin IV',
                coords : {'x' : 1699, 'y' : 566},
                nodes : ['geonosis', 'kashyyyk']
               },
               {id : 'death-star',
                name : 'The Death Star',
                coords : {'x' : 1357, 'y' : 655},
                nodes : ['hoth', 'bespin']
               },
               {id : 'coruscant',
                name : 'Coruscant',
                coords : {'x' : 1304, 'y' : 631},
                nodes : ['hoth', 'geonosis']
               }];

$(document).ready(function() { createMap(); scaleMapToWindow() });
$(window).resize(function() { scaleMapToWindow() });

function createMap() {
	var map = $('#galactic-map');
	planets.forEach(function(p) {
		var html = '<area shape="circle" id="' + p.id + '" coords="0, 0, 10" onclick="displayPlanet(\'' + p.id + '\')"/>';
		map.append(html);
	});
	console.log(map);
}

function scaleMapToWindow() {
	var x = $('#galaxy').height();
	var scale = x / 1428;
	planets.forEach(function(p) {
	    $('#' + p.id).attr('coords', (p.coords.x * scale + ',' + p.coords.y * scale + ',' + 100));
	});
}

function displayPlanet(p) {
    var planet = planets.filter(function (obj) {
     return obj.id === p;
    })[0];
    var nodes = planet.nodes;
    nodes.forEach(function(n) {
       console.log(n); 
    });
    var nodestring = '';
    nodes.forEach(function(n) {
     var obj = planets.filter(function (obj) {
     	return obj.id === n;
     })[0];
     var i = planet.nodes.indexOf(n);
     if (i + 1 < planet.nodes.length) {
     	nodestring += obj.name + ' - ';
     }
     else {
     	nodestring += obj.name;
     }
    });
    $('#planet-title').html(planet.name);
    $('#planet-nodes').html(nodestring);
} 