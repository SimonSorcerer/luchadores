/// <reference path='../typings/jquery/jquery.d.ts'/>

(function playerPicker() {
	var players = window.luchadores.players.all(),
		playerLoader = window.luchadores.playerLoader,
		game = window.luchadores.game,
		log = window.luchadores.log;
	
	function playersAreReady() {
		var firstPlayerId = $('.luchador.first .playerLabel span').data('id'),
			secondPlayerId = $('.luchador.second .playerLabel span').data('id');
		
		return firstPlayerId && secondPlayerId && firstPlayerId !== secondPlayerId;
	}
	
	function selectPlayer(event) {
		var $this = $(event.target), 
			playerId = $this.data('id'),
			playerElement = $this.parents('.luchador')[0];
		
		if (playerId && playerElement) {
			playerLoader.load(playerId, $(playerElement));
			log.writeAs.game('Player id "' + playerId + '" selected');
		}
		
		if (playersAreReady()) {
			game.ready();
		}
	}
	
	function createAvatar(player) {
		var $wrapper = $(document.createElement('div')),
			$avatar = $(document.createElement('img'));
		
		$avatar.attr({
			'src': 'images/' + player.image,
			'alt': player.name,
			'title': player.name,
		});
		$avatar.data({
			'id': player.id	
		});
		
		$avatar.width(60);
		$avatar.height(60);
		
		$avatar.click(selectPlayer);
		
		$wrapper.addClass('avatar');
		$wrapper.append($avatar);
		
		return $wrapper;
	}
	
	function createPicker($parent) {
		var $picker = $(document.createElement('div'));
		
		$picker.addClass('picker');
		
		players.forEach(function (player) {
			var $avatar = createAvatar(player);
			
			$picker.append($avatar);
		});
		
		$picker.hide();
		$parent.append($picker);
	}
	
	function togglePicker() {
		$(this).children('.picker').toggle();
	}
	
	$(document).ready(function () {
		createPicker($('.luchador'));
		
		$('.luchador').hover(togglePicker);
	});
}());