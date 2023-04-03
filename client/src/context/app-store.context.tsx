import React from "react";
import { IUser } from "./user";

export type AppStorContextType = {
  user: IUser | undefined;
  saveUser: (user: IUser) => void;
  updateUser: (updatePayload: Partial<IUser>) => void;
};

export const AppStorContext = React.createContext<AppStorContextType | null>(
  null
);

export const AppStorContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<IUser>();

  const saveUser = (user: IUser) => {
    setUser(user);
  };
  const updateUser = (updatePayload: Partial<IUser>) => {
    user &&
      setUser({
        ...user,
        ...updatePayload,
      });
  };

  return (
    <AppStorContext.Provider value={{ user, saveUser, updateUser }}>
      {children}
    </AppStorContext.Provider>
  );
};
