Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notfound'
});

Router.route('/', {
  'layoutTemplate': 'layout',
  'name': 'home',
});

Router.route('/graph', {
  'layoutTemplate': 'layout',
  'name': 'main'
});


/*Router.route("/graph/(.*)", function() {
    this.render('notfoundGraph');
    this.next();
}); */