import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Notes from "../pages/Notes";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";
  return (
      <div className="appWrapper">
        {!isAuthPage && <Header />}
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </div>
  );
}

export default App;
