angular.module('Game', ['Grid'])
.service('GameManager', function(GridService) {
    //Create a new game
    this.newGame = function() {

    }
    this.move = function() {

    };
    this.updateScore = function(newScore) {

    };
    this.movesAvailable = function() {
        return GridService.anyCellsAvailable() || GridService.tileMatchesAvailable();
    };
});