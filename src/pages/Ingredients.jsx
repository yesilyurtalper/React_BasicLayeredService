import { useNavigation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

export default function Ingredients(props) {
  const auth = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  return (
    <main>
      <p>Ingredients</p>
      <Outlet/>
    </main>
  );
}
