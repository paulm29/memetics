export class User {
  id: number;
  username: string;
  givenNames: string;
  surname: string;
  role: string;
  socialMediaSignin: string;

  permissions: string[] = [];

  version: number;
}
