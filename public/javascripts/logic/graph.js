var nodes = [];
// Need a tree-like data structure to store the graph connections

function register_node(nodeid, type){

}

function connect(nodeA,portA,nodeB,portB){

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
