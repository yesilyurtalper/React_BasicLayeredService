import React, { useRef } from "react";
import { Card, Button, TextField } from "@mui/material";
import classes from "./QueryEvents.module.css";
import { useNavigation, useNavigate, Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { eventActions } from "../../store/eventStore";

export default function QueryEvents(props) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef();
  const dispatch = useDispatch();
  const input = useSelector((state) => state.eventStore.queryInput);
  const pageSize = useSelector(
    (state) => state.eventStore.paginationModel.pageSize
  );

  return (
    <Card>
      <Form className={classes.form} ref={formRef} method="post" 
        onSubmit={() => dispatch(eventActions.setPaginationModel({page:0,pageSize}))}>
        <TextField
          label="Event Id"
          name="Id"
          variant="standard"
          type="number"
          defaultValue={input.Id}
          size="small"
          style={{flex:1}}
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
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({ ...input, Author: e.target.value })
            )
          }
        />

        <TextField
          label="Title"
          name="Title"
          variant="standard"
          defaultValue={input.Title}
          size="small"
          style={{flex:1}}
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({ ...input, Title: e.target.value })
            )
          }
        />

        <TextField
          label="Body"
          name="Body"
          variant="standard"
          defaultValue={input.Body}
          size="small"
          style={{flex:1}}
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({ ...input, Body: e.target.value })
            )
          }
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
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({
                ...input,
                DateStart: e.target.value,
              })
            )
          }
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
          onChange={(e) =>
            dispatch(
              eventActions.setQueryInput({ ...input, DateEnd: e.target.value })
            )
          }
        />

        <TextField
          label="Price Start"
          name="PriceStart"
          variant="standard"
          type="number"
          inputProps={{ step: "0.01" }}
          size="small"
          style={{flex:1}}
        />
        <TextField
          label="Price End"
          name="PriceEnd"
          variant="standard"
          type="number"
          inputProps={{ step: "0.01" }}
          size="small"
          style={{flex:1}}
        />

        <TextField
          name="PageSize"
          type="hidden"
          style={{ display: "none", flex:1 }}
          value={pageSize}
          size="small"
        />

        <TextField
          name="Page"
          type="hidden"
          style={{ display: "none", flex:1 }}
          value="0"
          size="small"
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
