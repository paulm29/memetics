import { by, element } from "protractor";

export class HeaderPartPage {
  myProfileDropdown = element(by.id("myProfileDropdown"));
  nicknameItem = element(by.name("profileViewHeader"));
  logoutButton = element(by.id("logout"));

  nickname() {
    this.myProfileDropdown.click();
    return this.nicknameItem.getText();
  }

  logout() {
    this.myProfileDropdown.click();
    this.logoutButton.click();
  }

  expectSuccess() {
    const alert = element(by.className("alert-success"));
    alert.element(by.className("close")).click();
  }

  menu(label: string) {
    const xpath = "//a[contains(text(), '" + label + "')]";
    element(by.xpath(xpath)).click();
  }

  memesMenu() {
    this.menu("Memes");
  }

  queueMenu() {
    const xpath = "//a[contains(text(), 'Queue')]";
  }

  statsMenu() {
    const xpath = "//a[contains(text(), 'Stats')]";
  }

  publishingMenu() {
    const xpath = "//a[contains(text(), 'Publishing')]";
  }

  importMenu() {
    const xpath = "//a[contains(text(), 'Import')]";
  }

  utilityMenu() {
    const xpath = "//a[contains(text(), 'Utility')]";
  }

  adminMenu() {
    const xpath = "//a[contains(text(), 'Admin')]";
  }
}
