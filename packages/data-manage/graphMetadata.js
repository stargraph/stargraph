Session.setDefault('selected_graph', '');
Session.setDefault('selected_graph_modal', false);
Template.datamanage.events = {
    'click #closeGraphMetadata': function(event) {
        Session.set('selected_graph_modal', false);
    }
};
Template.graphMetadata.helpers({
    'selectedGraph': function() {
        return Network.findOne(Session.get('selected_node')) || {};
    },
    'selectedGraphModal': function() {
        return Session.get('selected_graph_modal');
    }
});
Template.registerHelper('defaultTitle', function(){
    return "Untitled - "+this.id;
});
Template.registerHelper('onEditSuccess', function() {
    var id = this._id;
    return function(res, val) {
        var field = $(this).parent().attr('data-field');
        var setter = {
            $set: {}
        };
        setter.$set[field] = val;
        Graph.update(id, setter);
    }
})