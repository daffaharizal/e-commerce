export interface IUserProfile {
  fullName: string;
  email: string;
  dateOfBirth: string;
  serverError?: string;
}

export interface IUserProfileResponse {
  user: IUserProfile;
}
