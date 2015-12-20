angular
    .module('twentyfourtyeightApp',['Game', 'Grid'])
    .controller('GameController', function(GameManager) {
        this.game = GameManager;

    });
