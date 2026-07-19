import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NewScan from "./pages/NewScan";
import History from "./pages/History";
import ScanDetails from "./pages/ScanDetails";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/new-scan" element={<ProtectedRoute><NewScan /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/scan/:id" element={<ProtectedRoute><ScanDetails /></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /> </ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;