// main problem-solving function
function drawLadder(start_word, end_word) {
  start_word = start_word.toLowerCase();
  end_word = end_word.toLowerCase();

  // input errors
  if (start_word.length != end_word.length) { return writeHTML('errors','text-danger','Words must be the same length'); }
  if (!(start_word in dictionary)) { return writeHTML('errors','text-danger','"' + start_word + '"' + ' was not found in the dictionary.'); }
  if (!(end_word in dictionary)) { return writeHTML('errors','text-danger','"' + end_word + '"' + ' was not found in the dictionary.'); }

  // create object to push used words
  var used_words = {};

  // create queue for BFS and enqueue start_word
  var queue = new Queue();
  queue.enqueue(new GraphNode(start_word));

  // BFS
  while (!queue.isEmpty()) {
    var node = queue.dequeue();

    // return if end_word is reached
    if (node.word == end_word) {
      return writeHTML('result', 'text-success', node.path());
    }

    if (!(node.word in used_words)) {
      // add node word to resource object
      used_words[node.word] = null;

      // create and enqueue adjacent words
      var children = collectChildren(node.word);

      for (var i=0; i<children.length; i++) {
        var child = new GraphNode(children[i]);
        child.parent = node; // set child's parent
        node.adjacent.push(child); // update array of parent's adjacent nodes
        queue.enqueue(child);
      }
    }
  }

  // return only if search was unsuccessful
  return writeHTML('result', 'text-danger', 'No paths exist between these two words.');
}

// substitute each character in the word
function collectChildren (word) {
  var result = [];

  for (var i=0; i<word.length; i++) {
    for (var ch=97; ch<121; ch++) {
      var child = word.substring(0,i) + String.fromCharCode(ch) + word.substring(i+1);
      if (child != word && child in dictionary) { result.push(child); }
    }
  }

  return result;
}

// graph object
var GraphNode = function(word) {
  this.word = word;
  this.parent = null;
  this.adjacent = [];

  // print path by traversing backwards
  this.path = function() {
    var path = [];
    var result = '';
    var current = this.parent;

    while(current) {
      path.push(current.word);
      current = current.parent;
    }

    for (var i=path.length-1; i>=0; i--) {
      result += path[i];
      result += ' -> ';
    }

    return result + this.word;
  };
};

