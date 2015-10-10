Template.header.events({
    'click .addGraph':function(){
        Graphs.insert({
            ownerId:Meteor.userId(),
            public:false,
            tags:[]
        });
    }
})