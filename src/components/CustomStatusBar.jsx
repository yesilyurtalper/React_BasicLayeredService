import Typography from "@mui/material/Typography";

export default function CustomStatusBar(props) {
  console.log("customStatusBar rendered");

  return (
    <Typography variant="h6" noWrap component="div">
      Custom Status Bar
    </Typography>
  );
}
