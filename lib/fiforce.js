var Fiforce = module.exports = function () {
    var queue = [];

    var flush = function () {
        while (queue[0] && queue[0].completed) {
            queue.shift().call();
        }
    };

    return function (callback) {
        var callbackObject = {
            completed: false,
            arguments: [],
            callback: callback,
            call: function () {
                callback.apply(null, this.arguments);
            }
        };

        queue.push(callbackObject);

        return function () {
            callbackObject.completed = true;
            callbackObject.arguments = arguments;
            flush();
        };
    };
};
