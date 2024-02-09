export interface IMessage {
  fromSelf: boolean;
  message: string;
}

export interface IUser {
  _id: string;
  username: string;
  avatarImage: string;
  email: string;
  isAvatarImageSet: boolean;
  __v: number;
}

export interface IContact {
  _id: string;
  username: string;
  avatarImage: string;
  email: string;
}
