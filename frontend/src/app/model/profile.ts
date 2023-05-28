import { HashtagFavourite } from "./hashtag.favourite";

export class Profile {
  city: string;
  createdDate: string;
  country = "Australia";
  email: string;
  firstName: string;
  followers: Profile[] = [];
  following: Profile[] = [];
  lastName: string;
  givenNames: string;
  hashtagFavourites: HashtagFavourite[] = [];
  id: number;
  nickname: string;
  role = "ROLE_USER";
  socialMediaSignin = "NONE";
  state: string;
  surname: string;
  username: string;
  webSite: string;

  password: string; // only used during sign up
  passwordVerification: string;  // only used during sign up

  version: number;
}
