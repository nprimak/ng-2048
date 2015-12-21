/**
 * Created by nprimak on 12/19/15.
 */
describe('Game module', function() {
    describe('GameManager', function() {
        beforeEach(module('Game'));

        beforeEach(module(function($provide) {
            _gridService = {
                anyCellsAvailable: angular.noop,
                tileMatchesAvailable: angular.noop
            };

            //switch out the real GridService for our fake version
            $provide.value('GridService', _gridService);
        }));

        var gameManager;
        beforeEach(inject(function(GameManager) {
            gameManager = GameManager;
        }));

        var gridService;
        beforeEach(inject(function(GridService) {
            gridService = GridService;
        }));

        var _gridService;

        describe('.movesAvailable', function() {
            it('should report true if there are cells available', function() {
                spyOn(_gridService, 'anyCellsAvailable').and.returnValue(true);
                expect(gameManager.movesAvailable()).toBeTruthy();
            });
            it('should report true if there are matches available', function() {
                spyOn(_gridService, 'anyCellsAvailable').and.returnValue(false);
                spyOn(_gridService, 'tileMatchesAvailable').and.returnValue(true);
                expect(gameManager.movesAvailable()).toBeTruthy();
            });
            it('should report false if there are no cells nor matches available', function() {
                spyOn(_gridService, 'anyCellsAvailable').and.returnValue(false);
                spyOn(_gridService, 'tileMatchesAvailable').and.returnValue(false);
                expect(gameManager.movesAvailable()).toBeFalsy();
            })
        });

        describe('.buildEmptyGameBoard', function() {
            var nullArr;

            beforeEach(function() {
                nullArr = [];
                for(var x = 0; x < 16; x++) {
                    nullArr.push(null);
                }
            });
            it('should clear out the grid array with nulls', function() {
                var grid= [];
                for(var x = 0; x < 16; x++) {
                    grid.push(x);
                }
                gridService.grid = grid;
                gridService.buildEmptyGameBoard();
                expect(gridService.grid).toEqual(nullArr);
            });
            it('should clear out the tiles array with nulls', function() {
                var tiles = [];
                for(var x = 0; x < 16; x++) {
                    tiles.push(x);
                }
                gridService.tiles = tiles;
                gridService.buildEmptyGameBoard();
                expect(gridService.tiles).toEqual(nullArr);
            })
        })
    });
});