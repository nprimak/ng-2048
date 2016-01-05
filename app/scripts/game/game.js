angular.module('Game', ['Grid'])
.service('GameManager', function(GridService) {

    this.grid = GridService.grid;
    this.tiles = GridService.tiles;

    //Create a new game
    this.newGame = function() {
        GridService.buildEmptyGameBoard();
        GridService.buildStartingPosition();
        this.reinit();

    };

    this.reinit = function() {
        this.gameOver = false;
        this.win = false;
        this.currentScore = 0;
        this.highScore = 0;
    };

    this.move = function(key) {
        var self = this;
        //define move here
        if (self.win) {return false;}
        var positions = GridService.traversalDirections(key);
        var hasWon = false;
        var hasMoved = false;
        //Update Grid
        GridService.prepareTiles();

        positions.x.forEach(function(x){
            positions.y.forEach(function(y) {
                //For every position save the tiles original position
                var originalPosition = { x:x, y:y };
                var tile = GridService.getCellAt(originalPosition);

                if(tile) {
                    //if we have a tile here
                    var cell = GridService.calculateNextPosition(tile, key), next = cell.next;
                    //console.log("cell.newPosition X is :" + cell.newPosition.x);
                    //console.log("cell.newPosition Y is :" + cell.newPosition.y);

                    if(next && next.value === tile.value && !next.merged) {
                        // Handle merged
                        var newValue = tile.value * 2;
                        var merged = GridService.newTile(tile, newValue);
                        merged.merged = [tile, cell.next];

                        // Insert the new tile
                        GridService.insertTile(merged);
                        //Remove old tile
                        GridService.removeTile(tile);
                        //Move the location of the mergedTile into the next position
                        GridService.moveTile(merged, next);
                        //Update the score of the game
                        self.updateScore(self.currentScore + newValue);
                        //Check for winning value
                        if (merged.value >= self.winningValue) {
                            hasWon = true;
                        }
                        hasMoved = true;
                    } else {
                        GridService.moveTile(tile, cell.newPosition);
                    }

                    if(!GridService.samePositions(originalPosition, cell.newPosition)) {
                        hasMoved = true;
                    }
                }
            });
        });

        if (hasMoved) {
            GridService.randomlyInsertNewTile();

            if(self.win || !self.movesAvailable()) {
                self.gameOver = true;
            }
        }

    };

    this.updateScore = function(newScore) {

    };

    this.movesAvailable = function() {
        return GridService.anyCellsAvailable() || GridService.tileMatchesAvailable();
    };
});