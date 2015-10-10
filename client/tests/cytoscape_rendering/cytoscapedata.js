tempStore = new Meteor.Collection('tmpstore', {
    connection: null
});
Template.cytoscape_test.helpers({
    'cytodata': function() {
        return tempStore.find();
    }
});