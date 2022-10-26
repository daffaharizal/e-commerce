export interface IUserProfile {
  fullName: string;
  email: string;
  dateOfBirth: string;
}

export interface IUserProfileResponse {
  user: IUserProfile;
}
