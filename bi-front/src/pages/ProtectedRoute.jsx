import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserData } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const { data, isFetched } = useUserData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!data && isFetched) navigate("/login", { state: { from: location } });
    console.log(isFetched);
  }, [data, navigate, location, isFetched]);

  return children;
}
