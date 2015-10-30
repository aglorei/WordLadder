// main problem-solving function
function WordLadder(startWord, endWord) {
  startWord = startWord.toLowerCase();
  endWord = endWord.toLowerCase();

  // input errors
  if (startWord.length != endWord.length) { return writeHTML('errors','text-danger','Words must be the same length'); }
  if (!(startWord in dictionary)) { return writeHTML('errors','text-danger','"' + startWord + '"' + ' was not found in the dictionary.'); }
  if (!(endWord in dictionary)) { return writeHTML('errors','text-danger','"' + endWord + '"' + ' was not found in the dictionary.'); }

  // create object to push used words
  var usedWords = {};

  // create queue for BFS and enqueue startWord
  var queue = new Queue();
  queue.enqueue(new graphNode(startWord));

  // BFS
  while (!queue.isEmpty()) {
    var node = queue.dequeue();

    // return if endWord is reached
    if (node.word == endWord) {
      return writeHTML('result', 'text-success', node.path());
    }

    if (!(node.word in usedWords)) {
      // add node word to resource object
      usedWords[node.word] = null;

      // create and enqueue adjacent words
      var children = graphExtend(node.word);

      for (var i=0; i<children.length; i++) {
        var child = new graphNode(children[i]);
        child.parent = node; // set child's parent
        node.adjacent.push(child); // update array of parent's adjacent nodes
        queue.enqueue(child);
      }
    }
  }

  // return only if search was unsuccessful
  return writeHTML('result', 'text-danger', 'No paths exist between these two words.');
}

// substitute each character in the word all characters
function graphExtend (word) {
  var result = [];

  for (var i=0; i<word.length; i++) {
    for (var ch=97; ch<121; ch++) {
      var child = word.substring(0,i) + String.fromCharCode(ch) + word.substring(i+1);
      if (child != word && child in dictionary) { result.push(child); }
    }
  }

  return result;
}

// graph item
var graphNode = function(word) {
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

