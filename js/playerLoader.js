/// <reference path='../typings/jquery/jquery.d.ts'/>

window.luchadores = window.luchadores || {};

(function playerPicker() {
	var players = window.luchadores.players,
		playerCache = [];
	
	function createPlayerImage(player, width, height) {
		var $image = $(document.createElement('img'));
		
		$image.attr('src', 'images/' + player.image);
		$image.width(width);
		$image.height(height);
			
		return $image;
	}
	
	function createPlayerLabel(player) {
		var $label = $(document.createElement('span'));
		
		$label.text(player.name);
		$label.addClass('name');
		$label.data('id', player.id);
		
		return $label;
	}
		
	function cachePlayer(player, width, height) {
		var $image = createPlayerImage(player, width, height),
			$label = createPlayerLabel(player);
		
		playerCache[player.id] = {
			image: $image,
			label: $label
		};
		
		return playerCache[player.id];
	}
	
	function loadPlayer(playerId, $parent) {
		var player = players.get(playerId),
			cached = playerCache[playerId];
			
		if (!cached) {
			cached = cachePlayer(player, $parent.width(), $parent.height());
		}
			
		$parent.children('.playerImage').html(cached.image);
		$parent.children('.playerLabel').html(cached.label);
	}
	
	function loadGrave($parent) {
		var grave = players.getOther('grave');
		
		$parent.children('.playerImage').html(createPlayerImage(grave, $parent.width(), $parent.height()));
		$parent.children('.playerLabel').html(createPlayerLabel(grave));
	}
	
	window.luchadores.playerLoader = {
		load: loadPlayer,
		loadGrave: loadGrave
	};
}());