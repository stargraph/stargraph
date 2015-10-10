tempStore = new Meteor.Collection('tmpstore', {
    connection: null
});
Template.cytoscape_test.helpers({
    'cytodata': function() {
        return tempStore.find();
    },
    'options': function() {
        return {
            ready: function() {
                this.on('click', function(event) {
                    if (event.cyTarget === this) {
                        tempStore.insert({
                            group: 'nodes'
                        });
                    }
                    else {
                        event.cyTarget.remove();
                    }
                });
            }
        }
    }
});
