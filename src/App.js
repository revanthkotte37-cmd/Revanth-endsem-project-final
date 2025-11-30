import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FundsList from "./pages/FundsList";
import FundDetails from "./pages/FundDetails";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import { UserProvider } from "./context/UserContext";
import './App.css';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <div className="content" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/funds" element={<FundsList />} />
            <Route path="/funds/:id" element={<FundDetails />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
