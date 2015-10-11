Template.Cytoscape.rendered = function() {
    var self = this;
    //Static initial options for now;
    self.blazeData = Blaze.getData();
    var options = self.blazeData.options || {};
    var mergedOptions = _.defaults(options,{
        container: self.$('.cytoscape')[0],
        layout: {
            name: 'null'
        }
    });
    self.graph = cytoscape(mergedOptions);
    self.graph.edgehandles({
        complete:function(source, target, addedItems){
            self.blazeData.collection.insert({group:'edges',data:{source:source.id(), target:target.id()}, graphId:Router.current().params._id});
        }
    })
    self.fieldFunctionMap = {
        'data':function(elem, data){
            elem.data(data);
        },
        'position':function(elem, data){
            elem.position(data);
        }
    }
    self.observe = self.blazeData.data.observeChanges({
        'added':function(id, fields){
            fields.data = fields.data || {};
            fields.data.id = id;
            self.graph.add(fields).on("free", function(event){
                self.blazeData.collection.update(id, {$set:{position:event.cyTarget.position()}});
            });
        },
        'changed':function(id, fields){
            var item = self.graph.getElementById(id)
            for(var field in fields){
                var f = self.fieldFunctionMap[field];
                if(_.isFunction(f)){
                    f(item, fields[field]);
                }
            }
        },
        'removed':function(id){
            self.graph.getElementById(id).remove();
        }
    });
}
Template.Cytoscape.onDestroyed(function(){
    this.observe.stop();
})