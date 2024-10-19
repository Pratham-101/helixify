import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("emailData") || !localStorage.getItem("passwordData")) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
}
