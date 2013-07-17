var Fiforce = require('./index');

var assert = require('assert');

describe('fiforce', function () {
    var fiforce = new Fiforce();

    var slow = function (i, callback) {
        setTimeout(callback.bind(null, i), i * 100);
    };

    var counter = 4;

    it('ensures fifo when callbacks trigger in reverse order', function (done) {
        var test = function (i) {
            assert.equal(i, counter--);
            if (i === 0) {
                done();
            }
        };

        for (var i = counter; i >= 0; i--) {
            slow(i, fiforce(test));
        }
    });
});
