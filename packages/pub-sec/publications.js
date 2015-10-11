Meteor.publish('myGraphs', function() {
    return Graphs.find({$or:[{'ownerId': this.userId},{'public':true}]});
});

Meteor.publish('graph', function (graphId) {
    var graph = Graphs.findOne(graphId);
    if(graph.public || graph.ownerId === this.userId){
        return Network.find({'graphId': graphId});
    }
    return false;
});

Meteor.publish("flights",function(){
    var self = this;
    var js = Npm.require('node-json-csv');
    this.added("graphs", "flights", {title:"Flights", public:true});
    var CSV = HTTP.get('https://raw.githubusercontent.com/devsar/d3talk/master/flights-airport.csv', function(res, res2){
        var json_data = js(res2.content);
        for(var j in json_data){
            var data = json_data[j];
            data.id = data.destination;
            data.weight = data.count;
            this.added("network", data.destination,{group:'nodes',data:data, graphId:"flights"});
        }
    });

    this.ready();
})