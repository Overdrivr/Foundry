jsPlumb.bind("ready", function() {

  // your jsPlumb related init code goes here
  jsPlumb.setContainer("conteneur");

  jsPlumb.draggable("item_left");
  jsPlumb.draggable("item_right");

  jsPlumb.addEndpoint("item_left", {
  endpoint:"Dot",
  isSource:true,
  isTarget:true,
  anchor:[ "Perimeter", { shape:"Square" } ]
  });
  jsPlumb.addEndpoint("item_right", {
  endpoint:"Dot",
  isSource:true,
  isTarget:true,
  anchor:[ "Perimeter", { shape:"Square" } ]
  });
});
