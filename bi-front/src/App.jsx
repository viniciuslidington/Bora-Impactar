import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import HomeOng from "./pages/HomeOng";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Solicitacoes from "./pages/Solicitacoes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="ong"
            element={
              <ProtectedRoute>
                <HomeOng />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={"solicitacoes"} />} />
            <Route path="solicitacoes" element={<Solicitacoes />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
