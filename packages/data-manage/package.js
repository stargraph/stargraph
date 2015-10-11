Package.describe({
  name: 'sg:data-manage',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'viewing and editing element metadata, annotations, tags, comments, etc',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['twbs:bootstrap@3.3.5','natestrauser:x-editable-bootstrap','workman:x-editable-reactive-template','session','fortawesome:fontawesome@4.4.0','templating','jquery','sg:pub-sec']);
  api.addFiles(['datamanage.html','datamanage.js','datamanage.css','graphMetadata.html','graphMetadata.css','graphMetadata.js'],'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sg:data-manage');
  api.addFiles('data-manage-tests.js');
});
