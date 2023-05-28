import { browser, by, element, protractor } from "protractor";
import { HeaderPartPage } from "./header-part.page";
import { enterTextInput } from "../util/form-util";
import { elementById } from "../util/ui-util";

const EC = protractor.ExpectedConditions;

export class RegistrationPage {
  header = new HeaderPartPage();
  registerButton = element(by.id("register"));
  cancelButton = element(by.id("cancel"));

  textInputs = {
    email: element(by.id("email")),
    password: element(by.id("password")),
    passwordVerification: element(by.id("passwordVerification")),
    nickname: element(by.id("nickname")),
    country: element(by.id("country")),
    firstName: element(by.id("firstName")),
    lastName: element(by.id("lastName")),
    state: element(by.id("state")),
    webSite: element(by.id("webSite"))
  };
  checks = {};
  selects = {};

  expectOn() {
    browser.wait(EC.urlContains("/registration"));
  }

  getHeader() {
    return this.header;
  }

  canRegister() {
    return this.registerButton.isEnabled();
  }

  register() {
    this.registerButton.click();
  }

  cancel() {
    return this.cancelButton.click();
  }

  enterProfileDetails(profile) {
    Object.keys(this.textInputs).map((fieldName, value) => {
      const el = this.textInputs[fieldName];
      enterTextInput(el, profile[fieldName]);
    });
  }

  expectEnteredDetails(profile) {
    Object.keys(this.textInputs).map((fieldName, value) => {
      const el = this.textInputs[fieldName];
      if (profile[fieldName]) {
        expect(el.getAttribute("value")).toBe(profile[fieldName], "For text input " + fieldName);
      }
    });

    Object.keys(this.selects).map((fieldName, value) => {
      const el = this.selects[fieldName];
      if (profile[fieldName]) {
        expect(el.element(by.css("option:checked")).getText()).toBe(profile[fieldName], "For select input " + fieldName);
      }
    });

    Object.keys(this.checks).map((fieldName, value) => {
      const el = this.checks[fieldName];
      if (profile[fieldName]) {
        expect(el.isSelected()).toBe(profile[fieldName], "For checkbox input " + fieldName);
      }
    });
  }

  expectValidationErrors() {
    expect(this.hasWarning("email")).toBe(true);
    expect(this.hasWarning("required")).toBe(true);
    expect(this.hasWarning("date")).toBe(true);
    expect(this.hasWarning("postcode")).toBe(true);
    expect(this.hasWarning("exitYear")).toBe(true);
  }

  hasWarning(warning) {
    return element(by.xpath("//span[@ng-message='" + warning + "']")).isPresent();
  }

  hasError(error) {
    const xpath = "//span[@class='text-danger' and contains(text(),'" + error + "')]";
    console.log("xpath", xpath);
    return element(by.xpath(xpath)).isPresent();
  }

  expectFirstName(firstName) {
    expect(elementById("firstName").isPresent()).toBe(true);
    expect(elementById("firstName").getAttribute("value")).toBe(firstName);
  }

  expectNickname(nickname) {
    expect(elementById("nickname").isPresent()).toBe(true);
    expect(elementById("nickname").getAttribute("value")).toBe(nickname);
  }
}
