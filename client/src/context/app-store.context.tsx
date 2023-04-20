import React from "react";
import { IUser } from "./user";
import { SearchPayloadI } from "../components/Search.component";

export type AppStorContextType = {
  user: IUser | undefined;
  saveUser: (user: IUser) => void;
  updateUser: (updatePayload: Partial<IUser>) => void;
  saveSearchPayload: (searchPayload: SearchPayloadI) => void;
  searchPayload: SearchPayloadI;
};

export const AppStorContext = React.createContext<AppStorContextType | null>(
  null
);

export const AppStorContextProvider = ({ children }: any) => {
  const [user, setUser] = React.useState<IUser>();
  const [searchPayload, setSearchPayload] = React.useState<SearchPayloadI>({});
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

  const saveSearchPayload = (searchPayload: SearchPayloadI) => {
    setSearchPayload(searchPayload);
  };

  return (
    <AppStorContext.Provider
      value={{ user, searchPayload, saveUser, updateUser, saveSearchPayload }}
    >
      {children}
    </AppStorContext.Provider>
  );
};
