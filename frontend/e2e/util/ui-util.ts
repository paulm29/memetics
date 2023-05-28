import { browser, by, element, protractor } from "protractor";

function clearInput(fieldName) {
  element(by.id(fieldName)).sendKeys(protractor.Key.HOME, protractor.Key.chord(protractor.Key.SHIFT, protractor.Key.END), protractor.Key.BACK_SPACE);
}

function toNumber(promise) {
  return promise.then((n) => {
    return Number(n);
  });
}

function elementByXpath(xpath: string) {
  return element(by.xpath(xpath));
}

function elementById(id: string) {
  return element(by.id(id));
}

function elementByClass(css: string) {
  return element(by.css(css));
}

function elementByName(name: string) {
  return element(by.name(name));
}

function expectSuccess(text) {
  const alert = element(by.className("alert-success"));
  expect(alert.getText()).toContain(text);
  alert.element(by.className("close")).click();
}

async function clickButtonAndCheckNewWindow(buttonElement, expectedUrl) {
  console.log("clickButtonAndCheckNewWindow", expectedUrl);

  browser.waitForAngularEnabled(false);
  browser.ignoreSynchronization = true;
  // element(by.name("facebookPost")).click();
  await buttonElement.click();
  const handles = await browser.getAllWindowHandles();
  console.log("switch to", handles[1]);

  await browser.switchTo().window(handles[1]); //.then(() => {
  browser.sleep(1500);
  const url = await browser.driver.getCurrentUrl();
  // return browser.driver.getCurrentUrl().then((u) => {
  //   console.log("url", u);
  // });
  // });
  console.log("check url", url);
  expect(url).toContain(expectedUrl);
  console.log("close");
  browser.close();
  console.log("switch to", handles[0]);

  browser.waitForAngularEnabled(true);
  browser.ignoreSynchronization = false;

  browser.switchTo().window(handles[0]);

  browser.sleep(200);
}

export {
  clearInput,
  toNumber,
  elementByXpath,
  elementById,
  elementByName,
  expectSuccess,
  clickButtonAndCheckNewWindow
};
