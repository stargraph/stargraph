Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',  // need to create or add package
  //notFoundTemplate: 'notfound' // need to create
});

Router.route('/', {
  'layoutTemplate': 'layout',
  'name': 'home',
  'waitOn':function(){
    return [Meteor.subscribe('myGraphs')];
  }
});

Router.route('/graph/:_id', {
  'layoutTemplate': 'layout',
  'name': 'main',
  'subscriptions':function(){
    var graphId = this.params._id;
    return Meteor.subscribe('graph', graphId);
  },

});


// catchall route ... need template for it

/*Router.route("/graph/(.*)", function() {
    this.render('notfoundGraph');
    this.next();
}); */