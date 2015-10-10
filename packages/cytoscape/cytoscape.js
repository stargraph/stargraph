Template.Cytoscape.rendered = function(options) {
    var self = this;
    self.graph = cytoscape({
        container: self.$('.cytoscape')[0]
    });
    this.autorun(function(){
        var data = Blaze.getData().fetch();
        var dataCollection = Blaze.getData().collection;
        for(var d in data){
            var current = data[d];
            var collection = self.graph.getElementById(current._id)
            var existing = collection.json();

            if(existing === undefined){
                current.data = current.data || {};
                current.data.id = current._id;
                self.graph.add(current);

            }else{
                delete existing.data.id;
                existing.data._id = current._id;
                existing.data.group = existing.group;
                if(!_.isEqual(existing.data, current)){
                    self.graph.remove(collection);
                }
            }
        }

        var collection = self.graph.collection("*");
        if(collection.length > data.length){
            var cData = collection.jsons();
            for(var c in cData){
                var cd = cData[c];
                if(dataCollection.findOne(cd.data._id) === undefined){
                    self.graph.elements().remove("#"+cd.data._id);
                    self.graph.forceRender();
                }
            }
        }
        self.graph.elements().layout({ name: 'grid' });
    });
}
