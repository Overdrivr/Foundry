var inputNodes = [];
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

  // Remember if this node is a starting point for computation
  if(type == "input")
  {
    inputNodes.push(node);
  }

  return id;
}

function connect(fromA,portA,toB,portB){
  // Check A and B exist
  var A = graph.getNode(fromA);
  if(!A)
    throw new Error("node ",fromA," not found");

  var B = graph.getNode(toB);
  if(!B)
    throw new Error("node ",toB," not found");

  // TODO: check portA and port B are valid

  // TODO: Check destination port portB is not already connected to something

  // Build the connection
  var edge = graph.addEdge(fromA, toB);

  if(!edge)
    throw new Eror("connection could not be created.")

  edge.fromPort = portA;
  edge.toPort = portB;
}

function compute(){
  var updateStack = [];
  // Put all input nodes in the update queue. These nodes are computations starting point
  // These nodes can be either image-spec, static parameter, etc.
  inputNodes.forEach(function(node){
    updateStack.append(node);
  });

  // while update queue contains elements
  // For each element of the queue
  updateStack.forEach(node){
      // Check all input data are available

      // Compute the node (compute node and update output edges)

      // For each outgoing connections
        // Put next nodes into the update stack
  }
}
