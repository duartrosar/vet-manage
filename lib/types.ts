// export type Inputs = {
//     name: string
// }

export type Owner = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  mobileNumber: string;
  address: string;
  gender: string;
  userId: string;
  pets?: Pet[];
};

export type Pet = {
  id: number;
  name: string;
  type: string;
  ownerId: number;
};

export type Login = {
  username: string;
  password: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
};
