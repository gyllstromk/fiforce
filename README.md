# Fiforce

Force FIFO on asynchronous callbacks

# Problem

Sometimes order must be guaranteed. Consider the following pseudo-JS, in which
UDP packets are received, lookups are made on the packets, then the packets are
passed to the next component:

```js
socket.on('message', function (message) {
    timeConsumingLookup(message, function (result) {
        // we can get here out of order!
        passToNext(message, result);
    });
});
```

Assuming `timeConsumingLookup` can take a relatively long time, we can
accumulate multiple packets in the `timeConsumingLookup` processing
simultaneously, and may get to its callback out-of-order. In other words, we
might call `passToNext` on a result for a packet that was received after
another packet for which `timeConsumingLookup` is still processing.

# Solution

Use Fiforce!

```js
var fiforce = new Fiforce();

socket.on('message', function (message) {
    timeConsumingLookup(message, fiforce(function (result) {
        // we only get here in order!
        passToNext(message, result);
    }));
});
```
