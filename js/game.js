/// <reference path='../typings/jquery/jquery.d.ts'/>

window.luchadores = window.luchadores || {};

(function game() {
	var log = window.luchadores.log,
		colors = window.luchadores.colors,
		players = window.luchadores.players,
		activePlayers = [];
	
	function listenToGameStartKey() {
		function onGameReadyHandler(event) {
			if (event.which === 32) {
				startGame();
				$(document).off('keypress', onGameReadyHandler);
				event.preventDefault();
			}
		}
		$(document).on('keypress', onGameReadyHandler);
	}
	
	function theOther(activePlayer) {
		return activePlayers[1 - activePlayers.indexOf(activePlayer)];
	} 
	
	function punch(enemy) {
		var player = theOther(enemy),
			damage = 4;
			
		if (enemy.isBlocking) {
			log.writeAs.player(enemy.model.name + ' blocks punch from ' + player.model.name + ' for ' + damage + ' damage', activePlayers.indexOf(player));
		} else {
			log.writeAs.player(player.model.name + ' punches ' + enemy.model.name + ' for ' + damage + ' damage', activePlayers.indexOf(player));
			hitPlayer(enemy, damage);
		}
		
		setCooldown(player);
	}
	
	function kick(enemy) {
		var player = theOther(enemy),
			damage = 8;
		
		if (enemy.isBlocking) {
			log.writeAs.player(enemy.model.name + ' blocks kick from ' + player.model.name + ' for ' + damage + ' damage', activePlayers.indexOf(player));
		} else {
			log.writeAs.player(player.model.name + ' kicks ' + enemy.model.name + ' for ' + damage + ' damage', activePlayers.indexOf(player));
			hitPlayer(enemy, damage);
		}
		
		setCooldown(player);
	}
	
	function hitPlayer(player, damage) {
		player.model.hp -= damage;
		player.$hp.width(player.model.hp * 1.2);
		player.$hitAnimation.text(damage);
		player.$hitAnimation.css({ opacity: 1 });
		player.$hitAnimation.fadeTo(600, 0);
	}
	
	function block(enemy) {
		var player = theOther(enemy);
		
		log.writeAs.player(player.model.name + ' is blocking enemy move', activePlayers.indexOf(player));
		
		player.isBlocking = true;
		setCooldown(player);
	}
	
	function setCooldown(activePlayer) {
		var cooldownIntervalId;
		
		activePlayer.$cooldown.width(activePlayer.cooldown);
		
		cooldownIntervalId = window.setInterval(function() {
			activePlayer.cooldown += 5;
			activePlayer.$cooldown.width(activePlayer.cooldown);
			
			if (activePlayer.cooldown >= 120) {
				window.clearInterval(cooldownIntervalId);
				activePlayer.cooldown = 0;
				activePlayer.isBlocking = false;
			}
		}, 10);
	}
	
	function getWinner() {
		if (activePlayers[0].model.hp <= 0) {
			return activePlayers[0];
		} else if (activePlayers[1].model.hp <= 0) {
			return activePlayers[1];
		}
		
		return false;
	}
	
	function listenToGameKeys() {
		function onGameStartedHandler(event) {
			var winner;
			
			if (!activePlayers[0].cooldown) {
				if (event.which === 97) { // small A
					punch(activePlayers[1]);
				
				} else if (event.which === 115) { // small S
					block(activePlayers[1]);
					
				} else if (event.which === 100) { // small D
					kick(activePlayers[1]);
				}
			}
			
			if (!activePlayers[1].cooldown) {
				if (event.which === 106) { // small J
					punch(activePlayers[0]);
					
				} else if (event.which === 107) { // small K
					block(activePlayers[0]);
					
				} else if (event.which === 108) { // small L
					kick(activePlayers[0]);
				}
			}
			
			winner = getWinner();
			if (winner) {
				$(document).off('keypress', onGameStartedHandler);
				endGame(winner);
			}
		}
		
		$(document).on('keypress', onGameStartedHandler);
	}
	
	function removePickers() {
		$('.picker').remove();
	}
	
	function setActivePlayers() {
		var firstPlayerElement = $('.luchador.first'),
			secondPlayerElement = $('.luchador.second'),
			firstPlayerId = $('.luchador.first .playerLabel span').data('id'),
			secondPlayerId = $('.luchador.second .playerLabel span').data('id');
			
		activePlayers.push({
			cooldown: 0,
			isBlocking: false,
			model: players.get(firstPlayerId),
			$hp: $(firstPlayerElement.children('.hpbar')),
			$cooldown: $(firstPlayerElement.children('.cooldown')),
			$hitAnimation: $(firstPlayerElement.children('.hitAnimation')),
			$dom: firstPlayerElement
		});
		activePlayers.push({
			cooldown: 0,
			isBlocking: false,
			model: players.get(secondPlayerId),
			$hp: $(secondPlayerElement.children('.hpbar')),
			$cooldown: $(secondPlayerElement.children('.cooldown')),
			$hitAnimation: $(secondPlayerElement.children('.hitAnimation')),
			$dom: secondPlayerElement
		});
	}
	
	function setStateToReady() {
		$('.vs span').text('READY!');
		$('.vs span').addClass('blink_me');
		$('.ready').show();
		
		log.write('Game ready', colors.game);
		listenToGameStartKey();
	}
	
	function startGame() {
		$('.vs span').text('FIGHT!');
		$('.vs span').removeClass('blink_me');
		$('.ready').hide();
		
		log.show();
		listenToGameKeys();
		removePickers();
		setActivePlayers();
	}
	
	function endGame(winner) {
		var playerLoader = window.luchadores.playerLoader;
		
		log.writeAs.game('Game ended');
		log.writeAs.game(winner.model.name + ' is the winner!');
		
		playerLoader.loadGrave(winner.$dom);
	}
	
	window.luchadores.game = {
		ready: setStateToReady
	};
}());