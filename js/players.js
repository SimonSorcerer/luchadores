window.luchadores = window.luchadores || {};

var collection = [
	{
		id: 'matejS',
		name: 'Matej Suta',
		image: 'avatar1.jpg'
	},
	{
		id: 'arturK',
		name: 'Artur Kania',
		image: 'avatar2.jpg'
	},
	{
		id: 'petrK',
		name: 'Petr Komarek',
		image: 'petr.jpg'
	},
	{
		id: 'denisP',
		name: 'Denis Postu',
		image: 'denis.jpg'
	},
	{
		id: 'sebastienP',
		name: 'Sebastien Poirier'
	},
	{
		id: 'milanT',
		name: 'Milan Turon',
		image: 'milan.jpg'
	},
	{
		id: 'matejJ',
		name: 'Matej Janacek',
		image: 'matej.jpg'
	},
	{
		id: 'lukasK',
		name: 'Lukas Kotrba'
	}
];

var unplayables = [
	{
		id: 'grave',
		name: 'R.I.P.',
		image: 'grave.jpg'
	}
]

function extend(player) {
	return {
		id: player.id,
		name: player.name || 'Unknown fighter',
		image: player.image || 'sumo_default.jpg',
		hp: player.hp || 100
	};
}

var players = {
	get: function(id) {
		var matches = collection.filter(function (player) {
			return player.id === id;
		});
		
		if (matches.length === 1) {
			return extend(matches[0]);
		}
		return extend({});
	},
	getOther: function(id) {
		var matches = unplayables.filter(function (other) {
			return other.id === id;
		});
		
		if (matches.length === 1) {
			return extend(matches[0]);
		}
		return extend({});
	},
	all: function() {
		return collection.map(function (player) {
			return extend(player);
		});
	},
	random: function(excludedPlayers) {
		var filtered = collection.filter(function (player) {
			var excludedNames = [];
			
			if (excludedPlayers && excludedPlayers.length > 0) {
				excludedNames = excludedPlayers.map(function (player) {
					return player.name;
				});
			}
			
			return excludedNames.indexOf(player.name) < 0;
		});
		
		return extend(filtered[Math.floor(Math.random() * filtered.length)]);
	}
};

window.luchadores.players = players;