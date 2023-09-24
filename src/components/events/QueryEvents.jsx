import React, { useRef } from "react";
import { Card, Button, Typography, TextField } from "@mui/material";
import classes from "./QueryEvents.module.css";
import { useNavigation, useNavigate, useSubmit } from "react-router-dom";
import getCurrentDate, { getCurrentYear } from "../../utility/dateConversion";
import { useSelector } from "react-redux";

export default function QueryEvents(props) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const lastId = useSelector((state) => state.eventStore.lastId);
  const lastIdRef = useRef();

  return (
    <Card className={classes.form}>
      <TextField label="Event Id" name="Id" variant="standard" type="number" />
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
          defaultValue={getCurrentYear()}
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

      <Button
        disabled={navigation.state === "submitting"}
        variant="contained"
        onClick={() => props.formRef.current.reset()}
      >
        Clear
      </Button>

      <TextField
        name="LastId"
        type="hidden"
        inputRef={lastIdRef}
        value={lastId}
        style={{ display: "none" }}
      />

      <Button
        disabled={navigation.state === "submitting"}
        variant="contained"
        onClick={() => {
          lastIdRef.current.value = "0";
          props.formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }}
      >
        Query
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate("create")}
        style={{ gridArea: "2/8" }}
      >
        Create
      </Button>
    </Card>
  );
}
