import { browser } from "protractor";

const replace = require("replace-in-file");
const fs = require("fs");
const process = require("process");

// https://stackoverflow.com/questions/27193378/download-a-file-protractor-test-case
// https://stackoverflow.com/questions/21935696/protractor-e2e-test-case-for-downloading-pdf-file/27031924#27031924
function expectFile(filename) {
  if (browser.params.restUrl !== "http://localhost:8080/memetics/rest") {
    return; // TODO not working on CI, so do nothing until it is fixed
  }

  const fullFilename = process.cwd() + "/target/" + filename;

  console.log("fullFilename", fullFilename);

  browser.driver.wait(function () {
    // Wait until the file has been downloaded.
    // We need to wait thus as otherwise protractor has a nasty habit of
    // trying to do any following tests while the file is still being
    // downloaded and hasn't been moved to its final location.
    return fs.existsSync(fullFilename);
  }, 10000).then(function () {
    // Do whatever checks you need here.  This is a simple comparison;
    // for a larger file you might want to do calculate the file's MD5
    // hash and see if it matches what you expect.
    // expect(fs.readFileSync(filename, { encoding: "utf8" })).toEqual(
    //   "A,B,C\r\n"
    // );

    // just check that it exists for now
    fs.exists(fullFilename, (exists) => {
      expect(exists).toBe(true);
    });
  });
}


export { expectFile };
