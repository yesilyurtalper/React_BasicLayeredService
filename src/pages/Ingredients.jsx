import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Ingredients(props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main>
      <p>Ingredients</p>
    </main>
  );
    
}
