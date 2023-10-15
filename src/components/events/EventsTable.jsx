import {
  useActionData,
  useNavigation,
  Link,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import {
  Box,
  CircularProgress,
  TextField,
  accordionActionsClasses,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../store/eventStore";
import InspectIcon from "@mui/icons-material/Search";
import { useMemo, useEffect, useCallback, useState } from "react";

export default function EventsTable() {
  const actionResult = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const loading = navigation.state != "idle" && navigation.location?.pathname.includes("events");
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventStore.events);
  const queryInput = useSelector((state) => state.eventStore.queryInput);
  const totalCount = useSelector((state) => state.eventStore.totalCount);
  const submit = useSubmit();
  console.log(navigation);
  const paginationModel = useSelector(
    (state) => state.eventStore.paginationModel
  );

  useEffect(() => {
    if (actionResult?.isSuccess)
      dispatch(eventActions.setEvents(actionResult.data));
  }, [actionResult]);

  const handlePaginationChange = useCallback(
    (newModel) => {
      if (newModel.page > paginationModel.page)
        submit(
          { ...queryInput, LastId: events[events.length - 1].id },
          { method: "post" }
        );
      else if (newModel.page < paginationModel.page)
        submit({ ...queryInput, FirstId: events[0].id }, { method: "post" });
      dispatch(eventActions.setPaginationModel(newModel));
    },
    [queryInput]
  );

  const columns = useMemo(
    () => [
      {
        field: "details",
        headerName: "",
        sortable: false,
        renderCell: (params) => (
          <Link to={"id/" + params.value}>
            <InspectIcon />
          </Link>
        ),
        flex: 1,
      },
      {
        field: "id",
        headerName: "Id",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "author",
        headerName: "Organizer",
        headerAlign: "center",
        align: "center",
        flex: 3,
      },
      {
        field: "title",
        headerName: "Title",
        headerAlign: "center",
        align: "center",
        flex: 3,
      },
      {
        field: "body",
        headerName: "Body",
        headerAlign: "center",
        align: "center",
        flex: 5,
      },
      {
        field: "capacity",
        headerName: "Capacity",
        headerAlign: "center",
        align: "center",
        flex: 2,
      },
      {
        field: "price",
        headerName: "Price",
        headerAlign: "center",
        align: "center",
        flex: 2,
      },
      {
        field: "date",
        headerName: "Date",
        headerAlign: "center",
        align: "center",
        flex: 4,
      },
      {
        field: "dateCreated",
        headerName: "Created Date",
        headerAlign: "center",
        align: "center",
        flex: 4,
      },
      {
        field: "dateModified",
        headerName: "Modified Date",
        headerAlign: "center",
        align: "center",
        flex: 4,
      },
    ],
    []
  );

  const rows = useMemo(
    () =>
      events.map((ev) => ({
        details: ev.id,
        id: ev.id,
        author: ev.author,
        title: ev.title,
        body: ev.body,
        capacity: ev.capacity,
        price: ev.price,
        date: ev.date,
        dateCreated: ev.dateCreated,
        dateModified: ev.dateModified,
      })),
    [events]
  );

  if (loading && (events.length == 0 || !actionResult || !actionResult.isSuccess) )  
    return <CircularProgress />;

  if (!actionResult && events.length == 0) return;

  if (actionResult && !actionResult.isSuccess)
    return <ActionLoaderResult result={actionResult} />;

  if (actionResult && events.length == 0) 
    return <p>No events found!</p>;

  return (
    <Box sx={{ height: 500, width: "100%", margin: "auto" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
        loading={loading}
        rowCount={totalCount}
        sx={{ "MuiDataGrid-columnHeaderTitle": { fontWeight: 900 } }}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
        onRowDoubleClick={(params) => navigate("id/" + params.row.id)}
      />
    </Box>
  );
}
