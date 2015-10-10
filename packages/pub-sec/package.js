Package.describe({
  name: 'sg:pub-sec',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'data publish and security',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('mongo');
  api.addFiles('collections.js');
  api.addFiles(['publications.js','methods.js','security.js'],'server');
  api.export(['Graphs', 'Network']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sg:pub-sec');
  api.addFiles('pub-sec-tests.js');
});
