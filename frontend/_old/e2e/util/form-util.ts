import { by, element } from "protractor";


// function enterField(enterFieldFunction, data) {
//   fields.forEach(fields, function (field, name) {
//     if (!_.isUndefined(data[name])) {
//       enterFieldFunction(field, data[name]);
//     }
//   });
// }

function enterSelect(select, value) {
  select.element(by.css("option:checked")).getText().then((currentValue) => {
    if (currentValue !== value) {
      select.sendKeys(value);
    }
  });
}

function enterTextInputs(textInputs, fields) {
  Object.keys(textInputs).map((fieldName, value) => {
    const el = textInputs[fieldName];
    enterTextInput(el, fields[fieldName]);
  });
}

function enterTextInput(textInput, value) {
  textInput.clear().then(() => {
    textInput.sendKeys(value);
  });
}

function enterCheckbox(checkbox, value) {
  checkbox.isSelected().then((selected) => {
    if (value && !selected) {
      checkbox.click();
    }
  });
}

function expectInputText(textInputId, value) {
  const textInput = element(by.id(textInputId));
  expect(textInput.getAttribute("value")).toBe(value);
}


export { enterSelect, enterTextInput, enterCheckbox, enterTextInputs, expectInputText };
