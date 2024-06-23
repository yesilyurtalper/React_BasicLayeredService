import { Outlet } from "react-router-dom";

export default function withOutlet(Component) {
  return (props) => {
    return (
      <main style={{
        display:"flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center"
      }}>
        <Component {...props}/>
        <Outlet />
      </main>
    );
  };
}
