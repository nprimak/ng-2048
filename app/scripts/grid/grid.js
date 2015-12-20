/**
 * Created by nprimak on 12/19/15.
 */
angular.module('Grid', [])
    .factory('TileModel', function() {
        var Tile = function(pos, val) {
            this.x = pos.x;
            this.y = pos.y;
            this.value = val || 2;
        };

        return Tile;
    })
    .service('GridService', function(TileModel) {
        this.grid =[];
        this.tiles = [];
        //Size of the board
        this.size = 4;
        this.tiles.push(new TileModel({x: 1, y: 1}, 2));
        this.tiles.push(new TileModel({x: 1, y: 2}, 2));
});
