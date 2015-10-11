Template.home.helpers({
    'graphs':function(){
        return Graphs.find({ownerId: Meteor.userId()});
    },
    'public':function(){
        return Graphs.find({public:true, ownerId:{$nin:[Meteor.userId()]}});
    },
    'hasItems':function(){
        return this.length > 0;
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