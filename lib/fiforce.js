var Fiforce = module.exports = function () {
    var queue = [];

    var flush = function () {
        while (queue[0] && queue[0].call) {
            queue.shift().call();
        }
    };

    return function (callback) {
        var callbackObject = {};

        queue.push(callbackObject);

        return function () {
            var args = arguments;
            callbackObject.call = function () {
                callback.apply(null, args);
            };

            flush();
        };
    };
};
