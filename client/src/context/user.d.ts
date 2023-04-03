export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  isAdmin?: boolean;
  address?: string;
  createdAt?: Date;
}
