import {PhoneNumber} from "../common/interface";

export interface AuthSignUpInput {
  name: string;
  phone?: PhoneNumber;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthSignInInput {
  email: string;
  password: string;
}
