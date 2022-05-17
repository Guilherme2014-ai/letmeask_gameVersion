import { IUser } from "./IUser";

interface IGetAuthContextType {
  userState: IUser | undefined;
  signInWithGoogle: () => Promise<IUser>;
}

export type { IGetAuthContextType };
