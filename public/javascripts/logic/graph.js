var nodes = [];
// Data structure to store the graph and its connections
var graph = new Graph();
var uniqueid = 0;

/*
 * Adds a node to the graph.
 *
 */
function add(type){
  var id = "node" + uniqueid;
  uniqueid++;
  var node = graph.addNode(id);

  if(!node)
    throw new Error("Node could not be created. Id ",id," probably already in use");

  node.type = type;

  return id;
}

function connect(fromA,portA,toB,portB){
  // Check A and B exist

  // check portA and port B are valid

  // Check destination port portB is not already connected to something

  // Build the connection


}

function compute(){
  // Put all input nodes in the update queue. These nodes are computations starting point
  // These nodes can be either image-spec, static parameter, etc.

  // while update queue contains elements
    // For each element of the queue
      // Update it (compute node, update output(s))

      // List child nodes
      // For each
        // Mark the child's computed input as ready

        // If the child has all inputs marked as ready, place it in the update queue

}
