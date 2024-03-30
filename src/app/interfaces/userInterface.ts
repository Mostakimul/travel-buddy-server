type TUserProfile = {
  bio: string;
  age: number;
};

export type TUser = {
  name: string;
  email: string;
  password: string;
  profile: TUserProfile;
};
