// Karma configuration
// Generated on Fri Jun 28 2013 11:09:07 GMT+0100 (BST)


// base path, that will be used to resolve files and exclude
basePath = '../../app/public';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
    'components/angular/angular.js',
    'components/angular-mocks/angular-mocks.js',
    'components/angular-resource/angular-resource.js',
    'components/chai/chai.js',
    'js/**/*.js',
    '../../test/client/unit/*spec.js',
    // templates
    'js/**/*.template.html'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
// add growl support: npm install karma-growl-reporter -g
reporters = ['progress','growl'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;

autoWatch = true;
