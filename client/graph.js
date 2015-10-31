// create links (i.e. graph edges) for a word length
function drawGraph(start_word, end_word) {
  if (start_word.length != end_word.length) { return false; }
  var length = start_word.length;
  var links = [];
  var used_words = {};
  var nodes = {};

  for (var word in dictionary) {
    // find unused words of matching length and find children
    if (word.length == length && !(word in used_words)) {
      used_words[word] = null;

      // go through unused children and create link
      var children = collectChildren(word);
      for (var i=0; i<children.length; i++) {
        if (!(children[i] in used_words)) {
          var edge = {
            source: word,
            target: children[i]
          };

          links.push(edge);
        }
      }
    }
  }

  // Compute the distinct nodes from the links.
  links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
    link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
  });

  var width = $('#result').width();
  var  height = $('#left-column').height() - 100;

  var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(20)
    .charge(-30)
    .gravity(0.3)
    .on("tick", tick)
    .start();

  var svg = d3.select("#result").append("svg")
    .attr("width", width)
    .attr("height", height);

  var link = svg.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .attr("class", "link");

  var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);

  node.append("circle")
    .attr("r", 4);

  node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

  function tick() {
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  function mouseover() {
    d3.select(this).select("circle").transition()
      .duration(200)
      .attr("r", 16);
  }

  function mouseout() {
    d3.select(this).select("circle").transition()
      .duration(200)
      .attr("r", 4);
  }
}

