Template.Cytoscape.rendered = function() {
    var self = this;
    //Static initial options for now;
    options = Blaze.getData().options || {};
    var mergedOptions = _.defaults({
        container: self.$('.cytoscape')[0],
        layout: {
            name: 'grid'
        }
    }, options);
    self.graph = cytoscape(mergedOptions);
    this.autorun(function(comp) {
        var dataCtx = Blaze.getData().data || Blaze.getData();
        var dataMapped = _.map(dataCtx.fetch(), function(ctx) {
            _.defaults(ctx, {
                data: {
                    id: ctx._id
                }
            });
            return ctx;
        });
        if (comp.firstRun) {
            self.graph.add(dataMapped);
        }
        else {
            var collection = self.graph.collection("*");
            var collectionSize = collection.size();
            var collectionData = collection.jsons();
            var dataCount = dataCtx.count();
            if (collectionSize > dataCount) {
                for (var i = 0; i < collectionSize; i++) {
                    var ctx = collectionData[i];
                    if (dataCtx.collection.findOne(ctx.data.id) === undefined) {
                        self.graph.remove("#" + ctx.data.id);
                    }
                }
            }
            else if (collectionSize < dataCount) {
                for (var i = 0; i < dataCount; i++) {
                    var existing = self.graph.getElementById(dataMapped[i].data.id);
                    if (existing.length === 0) {
                        self.graph.add(dataMapped[i]);
                    }
                }
            }
        }
        self.graph.elements().layout(mergedOptions.layout);
    });
}
