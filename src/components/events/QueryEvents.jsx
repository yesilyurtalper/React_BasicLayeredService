import React from "react";
import { Card, Button, Typography, TextField } from "@mui/material";
import classes from "./QueryEvents.module.css";
import { useNavigation, useNavigate, Form } from "react-router-dom";

export default function QueryEvents() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submitting = navigation.state === "submitting";

  return (
    <Card className={classes.card}>
      <div className={classes.header}>
        <Typography variant="h6">Query Events</Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create Event
        </Button>
      </div>

      <Form className={classes.form} method="POST">
        <TextField label="Event Id" name="Id" variant="standard" type="number"/>
        <TextField label="Owner" name="Author" variant="standard" />
        <TextField label="Title" name="Title" variant="standard" />
        <TextField label="Body" name="Body" variant="standard" />
        <TextField
          label="Date"
          name="Date"
          variant="standard"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Price"
          name="Price"
          variant="standard"
          type="number"
        />
        <div className={classes.actions}>
          <Button disabled={submitting} variant="contained">
            Clear
          </Button>
          <Button disabled={submitting} variant="contained" type="submit">
            {submitting ? "Submitting" : "Query"}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
