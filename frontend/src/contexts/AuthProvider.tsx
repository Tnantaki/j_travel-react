import { createContext, ReactNode, useContext, useState } from "react";
import userService, { MyJwtPayload } from "../services/user-service";

interface AuthContextType {
  user: MyJwtPayload | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(userService.getCurrentUser());

  const login = () => {
    setUser(userService.getCurrentUser());
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthProvider;
