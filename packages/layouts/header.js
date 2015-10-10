Template.header.events({
    'click .add-graph':function(){
        Graphs.insert({
            ownerId:Meteor.userId(),
            public:false,
            tags:[]
        });
        // after user creates a new graph, should send them to the new route automatically
    }
})