import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Unauthorized from "./pages/Unauthorized";

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="login" exact element={<LoginPage />} />
              <Route path="unauthorized" element={<Unauthorized />} />
              <Route  element={<PrivateRoute allowedRoles={[ROLES.User,ROLES.Admin]}/>}>
                <Route exact path="/home" element={<Home />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
