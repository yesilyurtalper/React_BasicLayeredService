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
  const input = useSelector((state) => state.eventStore.queryInput);
  const actionData = useActionData();
  
  const idRef = useRef();
  const titleRef = useRef();
  const authorRef = useRef();
  const bodyRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const priceStartRef = useRef();
  const priceEndRef = useRef();

  useEffect(() => {
    if(actionData && actionData.isSuccess)
      dispatch(eventActions.setQueryInput({
        Id : idRef.current.value,
        Title : titleRef.current.value,
        Author : authorRef.current.value,
        Body : bodyRef.current.value,
        DateStart : dateStartRef.current.value,
        DateEnd : dateEndRef.current.value,
        PriceStart : priceStartRef.current.value,
        PriceEnd : priceEndRef.current.value,
      }))
  },[actionData]);

  return (
    <Card>
      <Form className={classes.form} ref={formRef} method="post"
        onSubmit={() => dispatch(eventActions.setPaginationModel({page:0,pageSize:10}))}>
        <TextField
          label="Event Id"
          name="Id"
          variant="standard"
          type="number"
          defaultValue={input.Id}
          size="small"
          style={{flex:1}}
          inputRef={idRef}
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({ ...input, Id: e.target.value })
            )
          }
        />

        <TextField
          label="Organizer"
          name="Author"
          variant="standard"
          defaultValue={input.Author}
          size="small"
          style={{flex:1}}
          inputRef={authorRef}
        />

        <TextField
          label="Title"
          name="Title"
          variant="standard"
          defaultValue={input.Title}
          size="small"
          style={{flex:1}}
          inputRef={titleRef}
        />

        <TextField
          label="Body"
          name="Body"
          variant="standard"
          defaultValue={input.Body}
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
          defaultValue={input.DateStart}
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
          defaultValue={input.DateEnd}
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
          defaultValue={input.PriceStart}
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
          defaultValue={input.PriceEnd}
          size="small"
          style={{flex:1}}
          inputRef={priceEndRef}
        />

        <TextField
          name="PageSize"
          type="hidden"
          style={{ display: "none", flex:1 }}
          value="10"
          size="small"
        />

        <TextField
          name="LastId"
          type="hidden"
          style={{ display: "none", flex:1 }}
          value="0"
          size="small"
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
      </Form>
    </Card>
  );
}
