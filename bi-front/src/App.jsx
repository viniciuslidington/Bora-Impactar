import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainPage from "./pages/mainPage";
import Login from "./pages/Login";
import Ong from "./pages/Ong";
import { ModalProvider } from "./components/contexts/ModalContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomeOng from "./pages/HomeOng";
import SolicitacoesPosts from "./components/Solicitacoes/SolicitacoesPosts";
import RepassePosts from "./components/Repasse/RepassePosts";
import Voluntario from "./pages/Voluntario";
import HomeVoluntario from "./pages/HomeVoluntario";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import SearchVol from "./pages/SearchVol";
import SearchOng from "./pages/SearchOng";
import { NotFoundPage } from "./pages/NotFoundPage";

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
                <Route path="solicitacoes" element={<SolicitacoesPosts />} />
                <Route path="repasse" element={<RepassePosts />} />
              </Route>
              <Route path="search" element={<SearchOng />} />
            </Route>
            <Route path="voluntario" element={<Voluntario />}>
              <Route index element={<Navigate replace to={"home"} />} />
              <Route path="home" element={<HomeVoluntario />} />
              <Route path="search" element={<SearchVol />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;
