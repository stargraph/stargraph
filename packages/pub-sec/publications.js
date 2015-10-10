Meteor.publish('myGraphs', function() {
    return Graphs.find({$or:[{'ownerId': this.userId},{'public':true}]});
});

Meteor.publish('graph', function (graphId) {
    //var nodes = Network.find({'graphId': graphId, 'group': 'nodes'}, {'sort': {sortKey: sortDir}, 'limit': limit});
    var graph = Graphs.findOne(graphId);
    if(graph.public || graph.ownerId === this.userId){
        return Network.find({'graphId': graphId});
    }
    return false;
});