/// <reference path='../typings/jquery/jquery.d.ts'/>

(function main() {
	var players = window.luchadores.players,
	moves = window.luchadores.moves,
	firstPlayer = players.random(),
	secondPlayer = players.random([firstPlayer]),
	selectedPlayers = [ 
		firstPlayer, 
		secondPlayer 
	];

	function parseMove(move, players) {
		var re = /({[0-1]})/g;
		
		return move.replace(re, function (match) {
			if (match === '{0}') {
				return players[0].name;
			}
			return players[1].name;
		});
	}
	
	function fightEnded(players) {
		return players[0].hp <= 0 || players[1].hp <= 0;
	}
	
	function startFight() {
		var playerOnTurn = 0;
			
		while (!fightEnded(selectedPlayers)) {
			var index = Math.floor(Math.random() * moves.length);
			var selectedMove = moves[index];
			
			console.log(parseMove(selectedMove.text, selectedPlayers));
			
			selectedPlayers[1 - playerOnTurn].hp -= selectedMove.score;
			if (selectedMove.score > 0) {
				console.warn(selectedPlayers[1 - playerOnTurn].name + ' was hit for ' + selectedMove.score + ' damage.');
			} else {
				console.warn(selectedPlayers[playerOnTurn].name + ' lost ' + (-1 * selectedMove.score) + ' hitpoint(s).');
			}
			
			playerOnTurn = 1 - playerOnTurn;
		} 
	}
		
	$('.fightImage').click(function () {
		startFight();
	});
	
	$(document).ready(function () {
		//setPlayer(selectedPlayers[0], '.first');
		//setPlayer(selectedPlayers[1], '.second');
	});	
}());