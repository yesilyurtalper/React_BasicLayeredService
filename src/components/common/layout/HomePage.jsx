
import { CircularProgress } from "@mui/material";
import React from "react";
import { useNavigation } from "react-router-dom";
import LogInOut from "../LogInOut";

export default function HomePage(props) {
  const navigation = useNavigation();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {navigation.state === "loading" && <CircularProgress />}

      <p>Welcome to React_BasicLayeredService</p>

      <LogInOut />
    </main>
  );
}
