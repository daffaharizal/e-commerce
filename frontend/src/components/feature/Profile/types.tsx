export interface IUserProfile {
  fullName: string;
  email: string;
  serverError?: string;
}

export interface IUserProfileResponse {
  user: IUserProfile;
}
