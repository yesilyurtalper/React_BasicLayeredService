import React, { useRef, useEffect } from "react";
import { Card, Button, TextField } from "@mui/material";
import classes from "./QueryEvents.module.css";
import { useNavigation, useNavigate, Form, useActionData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../store/eventStore";

export default function QueryEvents(props) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.eventStore.query);
  
  const idRef = useRef();
  const titleRef = useRef();
  const authorRef = useRef();
  const bodyRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const priceStartRef = useRef();
  const priceEndRef = useRef();
   
  const handleSubmit = () => {
    dispatch(eventActions.setQuery({
      id : idRef.current.value,
      title : titleRef.current.value,
      author : authorRef.current.value,
      body : bodyRef.current.value,
      dateStart : dateStartRef.current.value,
      dateEnd : dateEndRef.current.value,
      priceStart : priceStartRef.current.value,
      priceEnd : priceEndRef.current.value,
    }));
  };

  return (
    <Card>
      <form className={classes.form} ref={formRef} method="post"
        onSubmit={handleSubmit}>
        <TextField
          label="Event Id"
          name="Id"
          variant="standard"
          type="number"
          defaultValue={query.id}
          size="small"
          style={{flex:1}}
          inputRef={idRef}
        />

        <TextField
          label="Organizer"
          name="Author"
          variant="standard"
          defaultValue={query.author}
          size="small"
          style={{flex:1}}
          inputRef={authorRef}
        />

        <TextField
          label="Title"
          name="Title"
          variant="standard"
          defaultValue={query.title}
          size="small"
          style={{flex:1}}
          inputRef={titleRef}
        />

        <TextField
          label="Body"
          name="Body"
          variant="standard"
          defaultValue={query.body}
          size="small"
          style={{flex:1}}
          inputRef={bodyRef}
        />

        <TextField
          label="Date Start"
          name="DateStart"
          variant="standard"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          defaultValue={query.dateStart}
          size="small"
          style={{flex:2}}
          inputRef={dateStartRef}
        />
        <TextField
          label="Date End"
          name="DateEnd"
          variant="standard"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          defaultValue={query.dateEnd}
          size="small"
          style={{flex:2}}
          inputRef={dateEndRef}
        />

        <TextField
          label="Price Start"
          name="PriceStart"
          variant="standard"
          type="number"
          inputProps={{ step: "0.01" }}
          defaultValue={query.priceStart}
          size="small"
          style={{flex:1}}
          inputRef={priceStartRef}
        />
        <TextField
          label="Price End"
          name="PriceEnd"
          variant="standard"
          type="number"
          inputProps={{ step: "0.01" }}
          defaultValue={query.priceEnd}
          size="small"
          style={{flex:1}}
          inputRef={priceEndRef}
        />

        <Button
          disabled={navigation.state === "submitting"}
          variant="contained"
          type="submit"
        >
          Query
        </Button>

        <Button
          disabled={navigation.state === "submitting"}
          variant="contained"
          onClick={() => formRef.current.reset()}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("create")}
          style={{ gridArea: "2/8" }}
          disabled={navigation.state === "submitting"}
        >
          Create
        </Button>
      </form>
    </Card>
  );
}
