import React, { useContext } from "react";
import { IUser } from "../interfaces/IUser";

const AuthContext = React.createContext<null | {
  userState: IUser | undefined;
  signInWithGoogle: () => Promise<IUser>;
}>(null);
const GetAuthContext = () => useContext(AuthContext);

export { AuthContext, GetAuthContext };
