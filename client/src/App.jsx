import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Notes from "../pages/Notes";
import ProtectedRoute from "../components/ProtectedRoute";
import About from "../pages/About";
import Account from "../pages/Account";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/register";
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/" replace />;
  }

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
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
