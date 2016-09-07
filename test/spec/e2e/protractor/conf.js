exports.config = {
  framework: 'jasmine',
  directConnect: true,
  specs: ['mainPageSpec.js'],
  capabilities: {
    'browserName': 'chrome'
  },
};
