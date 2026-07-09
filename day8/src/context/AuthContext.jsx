import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const normalizeUser = (userData) => {
  if (!userData) return null;

  const normalizedName = userData.name || userData.email || "User";
  const derivedName =
    typeof normalizedName === "string" && normalizedName.toLowerCase() === "john doe"
      ? userData.email?.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "User"
      : normalizedName;

  return {
    ...userData,
    name: derivedName,
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return normalizeUser(storedUser);
  });

  const login = (userData, token) => {
    const normalizedUser = normalizeUser(userData);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);