export class User {
  Username: string;
  Password: string;
  Email: string;
  FirstName: string;
  LastName: string;
  LastLoginDate: string;
  ProfilePicturePath: string;
  RegistrationDate: Date;
  AlternateMail: string;
  UserStatus: string;

  constructor(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    lastLoginDate: string,
    profilePicturePath: string,
    registrationDate: Date,
    alternateMail: string,
    userStatus: string
  ) {
    this.Username = username;
    this.Password = password;
    this.Email = email;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.LastLoginDate = lastLoginDate;
    this.ProfilePicturePath = profilePicturePath;
    this.RegistrationDate = registrationDate;
    this.AlternateMail = alternateMail;
    this.UserStatus = userStatus;
  }
}
