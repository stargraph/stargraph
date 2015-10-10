Template.graphbox.helpers({
    'cytodata': function() {
        return Network.find();
    },
    'options': function() {
        return {
            layout:{
              name:'circle'
            },
            ready: function() {
                this.on('click', function(event) {
                    if (event.cyTarget === this) {
                        Network.insert({
                            group: 'nodes',
                            graphId:Router.current().params._id,
                            tags:[]
                        });
                    }
                    else {
                      Network.remove(event.cyTarget.data().id);
                    }
                });
            }
        }
    }
});