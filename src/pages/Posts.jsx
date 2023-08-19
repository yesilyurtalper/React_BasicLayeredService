import { useNavigation, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

export default function Posts(props) {
  const auth = useAuth();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!auth.isAuthenticated) 
      navigate("/");
  },[auth.isAuthenticated, navigate]);

  console.log(navigation.state);

  return (
    <main>
      <Outlet/>
    </main>
  );
}
