import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const { data, isFetched, isPending } = useUserData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isPending) {
      if (!data && isFetched) navigate("/login", { state: { from: location } });
    }
  }, [data, navigate, location, isFetched]);

  return children;
}
