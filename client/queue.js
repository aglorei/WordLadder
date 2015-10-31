// queue item
var QueueNode = function(item) {
  this.item = item;
  this.next = null;
};

// Queue class. enqueue to last, dequeue from first
var Queue = function() {
  var first = null;
  var last = null;

  this.enqueue = function(item) {
    if (this.isEmpty()) {
      last = new QueueNode(item);
      first = last;
    } else {
      last.next = new QueueNode(item);
      last = last.next;
    }
  };

  this.dequeue = function() {
    if (!this.isEmpty()) {
      var item = first.item;

      first = first.next;
      if (this.isEmpty()) { last = null; } // if empty, empty queue

      return item;
    }
    return null;
  };

  this.isEmpty = function() {
    return !first;
  };
};

