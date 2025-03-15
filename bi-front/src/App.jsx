import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Ong from "./pages/Ong";
import { ModalProvider } from "./components/contexts/ModalContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeOng from "./pages/HomeOng";
import OngPosts from "./components/OngPosts/OngPosts";
import Voluntario from "./pages/Voluntario";
import HomeVoluntario from "./pages/HomeVoluntario";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalProvider>
        <Router>
          <ScrollToTop />
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
              <Route path="home" element={<HomeOng />}>
                <Route
                  index
                  element={<Navigate replace to={"solicitacoes"} />}
                />
                <Route
                  path="solicitacoes"
                  element={<OngPosts tipo={"solicitacao"} />}
                />
                <Route path="repasse" element={<OngPosts tipo={"repasse"} />} />
              </Route>
            </Route>
            <Route path="voluntario" element={<Voluntario />}>
              <Route index element={<Navigate replace to={"home"} />} />
              <Route path="home" element={<HomeVoluntario />} />
            </Route>
            <Route path="*" element={<p>404 Página não encontrada</p>} />
          </Routes>
        </Router>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
