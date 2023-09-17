import React, { useRef, useState, useEffect } from "react";
import { Card, Button, Typography, TextField } from "@mui/material";
import classes from "./QueryEvents.module.css";
import {
  useNavigation,
  useNavigate,
  Form,
  useActionData,
} from "react-router-dom";
import getCurrentDate from "../../utility/currentDate";

export default function QueryEvents() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData();

  const formRef = useRef();
  const [directionsDisabled, setDirectionsDisabled] = useState(true);

  useEffect(() => {
    setDirectionsDisabled(
      navigation.state === "submitting" || !actionData || !actionData.data
    );
  }, [navigation, actionData]);

  return (
    <Card >
      <Form
        className={classes.form}
        method="POST"
        ref={formRef}
        onChange={() => setDirectionsDisabled(true)}
      >
        <TextField
          label="Event Id"
          name="Id"
          variant="standard"
          type="number"
        />
        <TextField label="Organizer" name="Author" variant="standard" />
        <TextField label="Title" name="Title" variant="standard" />
        <TextField label="Body" name="Body" variant="standard" />
        <fieldset className={classes.between}>
          <legend>Date Between</legend>
          <TextField
            label="Start"
            name="DateStart"
            variant="standard"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            defaultValue={getCurrentDate()}
          />
          <TextField
            label="End"
            name="DateEnd"
            variant="standard"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            defaultValue={getCurrentDate()}
          />
        </fieldset>

        <fieldset className={classes.between}>
          <legend>Price Between</legend>
          <TextField
            label="Start"
            name="PriceStart"
            variant="standard"
            type="number"
            inputProps={{ step: "0.01" }}
          />
          <TextField
            label="End"
            name="PriceEnd"
            variant="standard"
            type="number"
            inputProps={{ step: "0.01" }}
          />
        </fieldset>

        <TextField
          label="Count"
          name="Count"
          variant="standard"
          type="number"
          inputProps={{ step: "1", min: 1, max: 1000, defaultValue: 100 }}
        />

        <Button
          disabled={navigation.state === "submitting"}
          variant="contained"
          onClick={() => formRef.current.reset()}
        >
          Clear
        </Button>
        <Button
          disabled={navigation.state === "submitting"}
          variant="contained"
          type="submit"
        >
          Query
        </Button>

        <div className={classes.actions}>
          <Button
            disabled={directionsDisabled}
            variant="contained"
            onClick={() => formRef.current.reset()}
          >
            Prev
          </Button>
          <Button
            disabled={directionsDisabled}
            variant="contained"
            onClick={() => formRef.current.reset()}
          >
            Next
          </Button>
        </div>

        <Button variant="contained" onClick={() => navigate("create")} style={{gridArea:"2/8"}}>
            Create
          </Button>
      </Form>
    </Card>
  );
}
