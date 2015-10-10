tempStore = new Meteor.Collection('tmpstore', {
    connection: null
});


//Test Target Source
tempStore.insert({
    group: 'edges',
    data: {
        target: tempStore.insert({group:'nodes'}),
        source: tempStore.insert({group:'nodes'})
    }
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
