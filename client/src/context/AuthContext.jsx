import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const login = (newToken, newUserId) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);

    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
