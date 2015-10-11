Template.header.events({
    'click .add-graph':function(){
        var id = Graphs.insert({
            ownerId:Meteor.userId(),
            public:false,
            tags:[]
        });
        window.location = '/graph/'+id;
        // after user creates a new graph, should send them to the new route automatically
    }
})