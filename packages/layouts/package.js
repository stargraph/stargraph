Package.describe({
  name: 'sg:layouts',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['twbs:bootstrap@3.3.5','fortawesome:fontawesome@4.4.0','iron:router@1.0.9','templating','jquery']);
  api.addFiles(['layouts.html','layouts.css','header.html','home.html','main.html','toolbar.html','toolbox.html','graphbox.html','layouts.js','toolbar.js','toolbox.js','routes.js',],'client');
  api.addFiles(['stargraph_40.png','stardust.png'],'client', {isAsset:true});
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sg:layouts');
  api.addFiles('layouts-tests.js');
});
