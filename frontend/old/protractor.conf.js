// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter} = require('jasmine-spec-reporter');
const jasmineReporters = require("jasmine-reporters");
const HtmlScreenshotReporter = require("protractor-jasmine2-screenshot-reporter");
const path = require("path");
const process = require("process");

screenshotDir = path.join(__dirname, "target", "e2e-reports", "screenshot");

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox'],
      // https://stackoverflow.com/questions/21935696/protractor-e2e-test-case-for-downloading-pdf-file/26127745#26127745
      // https://stackoverflow.com/questions/27922587/setting-chromedriver-preferences-on-protractor-tests
      // Set download path and avoid prompting for download even though
      // this is already the default on Chrome but for completeness
      // + '../../target/e2e-reports/'
      prefs: {
        'download': {
          'prompt_for_download': false,
          'directory_upgrade': true,
          'default_directory': process.cwd() + "/target/",
        }
      }
    },

  },
  directConnect: true,
  baseUrl: 'http://localhost:8080/memetics/',
  params: {
    testImagePath: "/home/paul/projects/memetics/frontend/e2e/data/",
    restUrl: "http://localhost:8080/memetics/rest",
  },
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {
    }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      savePath: 'target/e2e-reports',
      consolidateAll: false
    }));
    jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
      dest: screenshotDir,
      filename: "screenshot-report.html",
      ignoreSkippedSpecs: true,
      captureOnlyFailedSpecs: true
    }));

    browser.driver.get(browser.baseUrl + "login");
  }
};
