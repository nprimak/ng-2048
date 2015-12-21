angular.module('Game', ['Grid'])
.service('GameManager', function(GridService) {

    this.grid = GridService.grid;
    this.tiles = GridService.tiles;

    //Create a new game
    this.newGame = function() {
        GridService.buildEmptyGameBoard();

    }
    this.move = function() {

    };
    this.updateScore = function(newScore) {

    };
    this.movesAvailable = function() {
        return GridService.anyCellsAvailable() || GridService.tileMatchesAvailable();
    };
});