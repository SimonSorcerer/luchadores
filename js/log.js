/// <reference path='../typings/jquery/jquery.d.ts'/>

window.luchadores = window.luchadores || {};

(function log() {
	var colors = window.luchadores.colors,
		$log = $('.log');
	
	function write(text, colorClass) {
		var $el = $(document.createElement('p'));
			
		if (colorClass) {
			$el.attr('class', colorClass);
		}
		$el.text(text);
		
		$log.prepend($el);
	}
	
	function show() {
		write('Log displayed', colors.log);
		write('Game started', colors.game);
		$log.show();
	}
	
	function hide() {
		write('Log hidden', colors.log);
		$log.hide();
	}
	
	window.luchadores.log = {
		show: show,
		hide: hide,
		write: write,
		writeAs: {
			player: function (text, isSecondPlayer) {
				if (isSecondPlayer) {
					write(text, colors.player2);
				} else {
					write(text, colors.player1);
				}
			},
			game: function (text) {
				write(text, colors.game);
			},
			log: function (text) {
				write(text, colors.log);
			}
		}
	};
}());