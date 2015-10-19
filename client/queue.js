// queue item
var queueNode = function(item) {
  this.item = item;
  this.next = null;
};

// Queue class. enqueue to last, dequeue from first
var Queue = function() {
  var first = null;
  var last = null;

  this.enqueue = function(item) {
    if (!first) {
      last = new queueNode(item);
      first = last;
    } else {
      last.next = new queueNode(item);
      last = last.next;
    }
  };

  this.dequeue = function() {
    if (first) {
      var item = first.item;

      first = first.next;
      if (!first) { last = null; } // if empty, empty queue

      return item;
    }
    return null;
  };

  this.isEmpty = function() {
    return (!first);
  };
};
