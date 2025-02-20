import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Ong from "./pages/Ong";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import OngPosts from "./components/OngPosts/OngPosts";

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
                <Ong />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={"home"} />} />
            <Route path="home" element={<Home />}>
              <Route index element={<Navigate replace to={"solicitacoes"} />} />
              <Route
                path="solicitacoes"
                element={<OngPosts tipo={"solicitacao"} />}
              />
              <Route path="repasse" element={<OngPosts tipo={"repasse"} />} />
            </Route>
          </Route>
          <Route path="*" element={<p>404 Página não encontrada</p>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
