import { browser } from "protractor";

function waitForElementToStopMoving(elem, timeout = 3000) {
  let previousLocation = {x: null, y: null};
  browser.wait(() => {
    return elem.getLocation().then((location) => {
      const result = location.x === previousLocation.x && location.y === previousLocation.y;
      previousLocation = location;
      return result;
    });
  }, timeout);
}

export { waitForElementToStopMoving };
