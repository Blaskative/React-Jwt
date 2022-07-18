import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [roles, setRoles] = useState([]);
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4000/login";
    let _headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    let acount = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios.post(url, JSON.stringify(acount), _headers).then(response => {
            let token =  response.data.accesToken;
            let roles =  response.data.roles;
            console.log(response.data.roles);
            setRoles(roles);
            setAuthTokens(token);
            setUser(jwt_decode(token));
            localStorage.setItem("authTokens", JSON.stringify(token));
            navigate("/home");
    })
    .catch(err => err);
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    roles:roles,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
