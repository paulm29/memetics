import * as faker from "faker/locale/en_AU";
import { Profile } from "../../src/app/model/profile";


export class ProfileData {

  static newTwitterProfile() {
    return ProfileData.twitterDetailsOnly(ProfileData.emailAccount());
  }

  static newFacebookProfile() {
    return ProfileData.facebookDetailsOnly(ProfileData.emailAccount());
  }

  static requiredDetailsOnly(profile) {
    return {
      username: profile.username,
      password: profile.password,
      passwordVerification: profile.passwordVerification,
      email: profile.email,
      nickname: profile.firstName,
      country: profile.country
    };
  }

  // firstName and lastName filled in via social media account. No password / passwordVerification
  static twitterDetailsOnly(profile) {
    return {
      username: profile.username,
      email: profile.email,
      nickname: profile.firstName,
      country: profile.country
    };
  }

  // also email
  static facebookDetailsOnly(profile) {
    return {
      username: profile.username,
      nickname: profile.firstName,
      country: profile.country
    };
  }

  static emailAccount() {
    return {
      email: faker.internet.email(),
      password: "test",
      passwordVerification: "test",
      nickname: faker.name.firstName(),
      country: faker.address.country(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      state: faker.address.state(),
      webSite: faker.internet.url(),
    };
  }

  static existingAdminAccount(): Profile {
    return Object.assign(new Profile(),
      {
        id: 14,
        username: "test@test.com",
        email: "test@test.com",
        password: "password",
        passwordVerification: "password",
        nickname: "nicknameTest",
        city: "Melbourne",
        country: "Australia",
        firstName: "firstName",
        lastName: "lastName",
        state: "QLD",
        webSite: "http://",
      });
  }

  static existingUserAccount() {
    return {
      id: 15,
      username: "role_user@test.com",
      email: "role_user@test.com",
      password: "password",
      passwordVerification: "password",
      nickname: "role_user",
      country: "Australia",
      firstName: "role",
      lastName: "user",
      state: "QLD",
      webSite: "http://",
    };
  }

  static existingTwitterAccount(): Profile {
    return Object.assign(new Profile(),
      {
        id: 14,
        username: "AussieMAGA",
        email: "drmobutu@gmail.com",
        password: "Babyg101_",
        passwordVerification: "Babyg101_",
        nickname: "AussieMAGA",
        city: "Melbourne",
        country: "Australia",
        firstName: "firstName",
        lastName: "lastName",
        state: "QLD",
        webSite: "http://",
      });
  }

  // TODO need an easy way to delete this, including data in the userconnection table, so that tests can be re-run easily
  static newTwitterAccount(): Profile {
    return Object.assign(new Profile(),
      {
        id: 14,
        username: "AussieBloke1788",
        email: "paul.miscellaneous@gmail.com",
        password: "Babyg101_",
        passwordVerification: "Babyg101_",
        nickname: "AussieBloke1788",
        city: "Melbourne",
        country: "Australia",
        firstName: "AussieBloke",
        lastName: "",
        state: "QLD",
        webSite: "http://",
      });
  }
}
