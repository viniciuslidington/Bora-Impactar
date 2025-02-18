import { useContext, useEffect } from "react";
import { AuthContext } from "../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated, navigate]);

  return children;
}
