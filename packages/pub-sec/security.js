//Need tighter security on user not being able to add additional fields.
Network.allow({
  'insert': function(uid, doc) {
    var graph = Graphs.findOne(doc.graphId);
    if(graph.public){
      return true;
    }
    if(graph.ownerId === uid){
      return true;
    }
  },
  'update':function(uid, doc, fields){
    var graph = Graphs.findOne(doc.graphId);
    if(graph.public){
      return true;
    }
    if(graph.ownerId === uid){
      return true;
    }
  },
  'remove':function(uid, doc, fields){
    var graph = Graphs.findOne(doc.graphId);
    if(graph.public){
      return true;
    }
    if(graph.ownerId === uid){
      return true;
    }
  }
});
Network.deny({
  'update':function(uid, doc, fields){
    var restricted = ["_id", "graphId","group"];
    var compare = _.difference(restricted, fields);
    if(!compare.length === restricted.length){
      return true
    }
  }
})
Graphs.allow({
  'insert': function(uid, doc) {
    if(doc.ownerId === uid){
      return true;
    }
  },
  'update': function(uid, doc) {
    if(doc.ownerId === uid){
      return true;
    }
  },
  'remove': function(uid, doc) {
    if(doc.ownerId === uid){
      return true;
    }
  }
})
Graphs.deny({
  'update':function(uid, doc, fields){
    var restricted = ["_id", "ownerId"];
    var compare = _.difference(restricted, fields);
    if(!compare.length === restricted.length){
      return true
    }
  }
})