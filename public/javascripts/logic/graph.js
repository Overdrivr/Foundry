var Graph = require("data-structures").Graph;
var Queue = require("data-structures").Queue;

var inputNodes = [];
// Data structure to store the graph and its connections
var graph = new Graph;
var uniqueid = 0;

module.exports = {
  /*
   * Adds a node to the graph.
   *
   */
  add: function(type){
    var id = "node" + uniqueid;
    uniqueid++;
    var node = graph.addNode(id);

    if(!node)
      throw new Error("Node could not be created. Id ",id," probably already in use");

    node.type = type;
    node.compute = function(){
      return "Computing ";
    };

    // Remember if this node is a starting point for computation
    if(type == "input")
    {
      inputNodes.push(node);
    }
    console.log("Created node with id",id);
    return id;
  },

  connect: function(fromA,portA,toB,portB){
    // Check A and B exist
    var A = graph.getNode(fromA);
    if(!A)
      throw new Error("node "+fromA+" not found");

    var B = graph.getNode(toB);
    if(!B)
      throw new Error("node "+toB+" not found");

    // TODO: check portA and port B are valid

    // TODO: Check destination port portB is not already connected to something

    // Build the connection
    var edge = graph.addEdge(fromA, toB);

    if(!edge)
      throw new Eror("connection could not be created.")

    edge.fromPort = portA;
    edge.toPort = portB;

    console.log("Connected ",fromA," to ",toB);
  },

  compute: function(){
    // Put all input nodes in the update queue. These nodes are computations starting point
    // These nodes can be either image-spec, static parameter, etc.
    var updateQueue = new Queue(inputNodes);

    // while update queue contains elements
    while(updateQueue.size > 0){
        // Get an item
        var node = updateQueue.dequeue();
        console.log("Computing ",node);

        // Check input data is fully available

        // Else put the node at the end of the queue

        // Retrieve input data
        //var inputData;

        // Compute the node (compute node and update output edges)
        var outputData = node.compute();

        // For each outgoing connections, put next nodes into the update stack
        graph.getOutEdgesOf(node).forEach(function(i, edge){
          updateQueue.append(graph.getNode(edge.toId));
        });
    }
  }
}
