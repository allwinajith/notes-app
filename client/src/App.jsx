import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "../components/login";
import SignUp from "../components/SignUp";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Notes from "../components/Notes";

function App() {
  return (
    <Router>
      <div className="appWrapper">
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
