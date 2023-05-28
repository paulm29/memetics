import { YearDirective } from "./year.directive";

describe("YearDirective", () => {
  it("should create an instance", () => {
    const directive = new YearDirective();
    expect(directive).toBeTruthy();
  });

  isValid("empty", "");
  isValid("valid", "2017");
  isValid("with leading zero", "0100");

  isNotValid("with too many digits", "12345");
  isNotValid("with too few digits", "123");
  isNotValid("contains non numeric", "asdf");

  function isValid(description, value) {
    validateYearTest("should be valid when year is " + description, value, true);
  }

  function isNotValid(description, value) {
    validateYearTest("should be not valid when year is " + description, value, false);
  }

  function validateYearTest(description, value, valid) {
    it(description, function () {
      const directive = new YearDirective();

      const control: any = { value };
      const errors = directive.validate(control);
      expect(!errors).toBe(valid);
    });
  }

});
