Session.setDefault('selected_node', '');
Session.setDefault('selected_node_modal', false);
Template.datamanage.events({
    'click #closeDataManage': function(event) {
        //$(".info-well").css('visibility', 'hidden');
        Session.set('selected_node_modal', false);
    }
});
Template.datamanage.helpers({
    'selectedNode': function() {
        return Network.findOne(Session.get('selected_node')) || {};
    },
    'selectedNodeModal': function() {
        return Session.get('selected_node_modal');
    }
});
Template.registerHelper('defaultTitle', function(){
    return "Untitled - "+this._id;
});
Template.registerHelper('onEditSuccess', function() {
    var id = this._id;
    return function(res, val) {
        var field = $(this).parent().attr('data-field');
        var setter = {
            $set: {}
        };
        setter.$set[field] = val;
        Network.update(id, setter);
    }
})