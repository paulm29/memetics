import { browser, by } from "protractor";
import { ProfileData } from "../data/profile-data";
import { LoginPage } from "../page/login.page";
import { MemeSearchPage } from "../page/meme-search.page";
import { Profile } from "../../src/app/model/profile";
import { HeaderPartPage } from "../page/header-part.page";

async function login(profile: Profile) {
  console.log("login");
  const headerPage = new HeaderPartPage();

  // browser.getAllWindowHandles().then((handles) => {
  //   console.log("handles", handles);
  //   if (handles.length === 0) {
  //     doLogin();
  //     return;
  //   } else {
  // console.log("start sleep");
  // browser.sleep(10000);
  // console.log("end sleep");
  //
  // browser.getCurrentUrl().then((url: string) => {
  const url = await browser.getCurrentUrl();
  console.log("url", url);

  if (url.includes("/profile")) {
    // headerPage.nickname().then((nickname) => {
    const nickname = await headerPage.nickname();
    console.log("nickname", nickname);

    if (nickname.includes(profile.nickname)) {
      console.log("do nothing - already logged in");
      return;
    }
    // });
  }

  // });
  //   }
  // });

  doLogin();
}

async function doLogin() {
  console.log("doLogin");
  const loginPage = new LoginPage();
  const memeSearchPage = new MemeSearchPage();

  const url = await browser.getCurrentUrl();

  if (!url.includes("login")) {
    await browser.get("");
  }

  loginPage.expectOn();
  loginPage.loginEmail(ProfileData.existingAdminAccount());
  memeSearchPage.expectOn();

  // browser.get("");
  // browser.driver.manage().deleteAllCookies();
  // browser.executeScript("window.sessionStorage.clear();");
  // browser.executeScript("window.localStorage.clear();");
  // browser.get("");
  // browser.sleep(2000);
}

// async function login(user, provider, isAdmin: boolean = false) {
//   const portalHomePage = new PortalHomePage();
//
//   await closeAllEaselTabs();
//
//   await portalHomePage.username()
//     .then(
//       (name) => {
//         if (user.name !== name) {
//           return performLogoutAndLogin(user);
//         }
//         return true;
//       },
//       () => {
//         browser.driver.manage().window().setSize(1280, 800);
//         return performLogin(user);
//       })
//     .then(() => openEaselTab(provider, isAdmin));
//   return true;
// }

// function openEaselTab(provider, isAdmin: boolean) {
//   const homePage = new HomePage();
//   const portalHomePage = new PortalHomePage();
//
//   if (isAdmin) {
//     portalHomePage.setProviderViaSearch(provider);
//   } else {
//     portalHomePage.setProvider(provider);
//   }
//   return portalHomePage.clickOnEaselTile().then(() => homePage.expectOnProvider(provider));
// }
//
// function performLogoutAndLogin(user) {
//   const portalHomePage = new PortalHomePage();
//   return portalHomePage.logout()
//     .then(() => performLogin(user));
// }
//
// function performLogin(user) {
//   const portalLandingPage = new PortalLandingPage();
//   const portalLoginPage = new PortalLoginPage();
//   const portalHomePage = new PortalHomePage();
//
//   browser.get("");
//   browser.driver.manage().deleteAllCookies();
//   portalLandingPage.get();
//   portalLandingPage.expectOn();
//   portalLandingPage.navigateToExternalLoginPage();
//   portalLoginPage.login(user);
//   portalHomePage.expectOn();
//   return true;
// }
//
// function closeAllEaselTabs() {
//   return browser.getAllWindowHandles().then((handles) => {
//     for (let i = handles.length - 1; i > 0; i--) {
//       browser.driver.switchTo().window(handles[i]);
//       browser.driver.close();
//     }
//     return browser.switchTo().window(handles[0]).then(() => {
//       return browser.waitForAngularEnabled(false);
//     });
//   });
// }

async function loginTwitter(profile) {
  const loginPage = new LoginPage();
  loginPage.expectOn();

  browser.waitForAngularEnabled(false);
  browser.ignoreSynchronization = true;
  loginPage.signinTwitter();

  const username_or_email = browser.driver.findElement(by.id("username_or_email"));
  username_or_email.clear().then(() => {
    username_or_email.sendKeys(profile.username);
  });
  const password = browser.driver.findElement(by.id("password"));
  password.clear().then(() => {
    password.sendKeys(profile.password);
  });
  browser.driver.findElement(by.id("allow")).click();

  browser.ignoreSynchronization = false;
  browser.waitForAngularEnabled(true);
}

export { login, loginTwitter };
