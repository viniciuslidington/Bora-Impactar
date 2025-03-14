import { useContext, useEffect } from "react";
import { AuthContext } from "../components/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !isAuthenticated && navigate("/login", { state: { from: location } });
  }, [isAuthenticated, navigate, location]);

  return children;
}
