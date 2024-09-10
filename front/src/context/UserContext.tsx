import React from "react";
import useAxios from "../Utils/useAxios";
import Spinner from "../Components/spinner/Spinner";
import ErrorPage from "../Components/error/ErrorPage";

export type UserData = {
  _id: string;
  username: string;
  email: string;
  img: string;
  password: string;
  admin: boolean;
  criado: Date;
  links: { title: string; link: string, _id: string }[];
};

type UserContextType = {
  data: UserData | null;
  loggedUserId: string | null;
  setLoggedUserId: (id: string) => void;
  logoutUser: () => void;
  loading: boolean;
  error: string | null;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedUserId, setLoggedUserId] = React.useState<string | null>(localStorage.getItem('loggedUserId'));
  const { data, loading, error } = useAxios<UserData>(
    loggedUserId ? `http://localhost:3005/users/${loggedUserId}` : '',
    'GET',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ''}`,
      },
    }
  );

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUserId');
    setLoggedUserId(null);
  };

  const contextValue = {
    data,
    loggedUserId,
    setLoggedUserId,
    logoutUser,
    loading,
    error
  };

  return (
    <UserContext.Provider value={contextValue}>
      {loading ? <Spinner /> : error ? <ErrorPage /> : children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
