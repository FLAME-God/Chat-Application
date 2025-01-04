import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Setting from "./pages/Setting";
import ProfilePage from "./pages/ProfilePage";

import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import useThemeStore from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <Signin /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Setting />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
