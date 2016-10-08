exports.config = {
    framework: 'jasmine',
    directConnect: true,
    specs: ['./spec/mainPageSpec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
};
