Template.home.helpers({
    'graphs':function(){
        return Graphs.find({ownerId: Meteor.userId()});
    },
    'public':function(){
        return Graphs.find({public:true, ownerId:{$nin:[Meteor.userId()]}});
    }
});
Template.home.events({
    'click .makePublic':function(){
        Graphs.update(this._id, {$set:{public:!this.public}});
    },
    'click .deleteGraph':function(){
        Graphs.remove(this._id);
    }
});