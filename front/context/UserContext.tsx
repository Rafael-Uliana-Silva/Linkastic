import React from "react";
import axios from "axios";

export type UserData = {
  id: string,
  username: string,
  email: string,
  img: string,
  password: string,
  admin: boolean,
  criado: Date,
  links: {title: string, link: string}[],
}

type UserContextType = {
  userData: UserData | null;
  fetchUserData: (id: string) => Promise<void>;
  setLoggedUserId: (id: string) => void;
  loggedUserId: string | null;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [loggedUserId, setLoggedUserId] = React.useState<string | null>(localStorage.getItem('loggedUserId'));

  const fetchUserData = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:3001/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  React.useEffect(() => {
    const storedUserId = localStorage.getItem('loggedUserId');
    if (storedUserId) {
      setLoggedUserId(storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, fetchUserData, loggedUserId, setLoggedUserId}}>
      {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserProvider}
