import {
  useActionData,
  useNavigation,
  Link,
  useNavigate,
} from "react-router-dom";
import ActionLoaderResult from "../../components/ActionLoaderResult";
import { Box, CircularProgress, TextField, accordionActionsClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../store/eventStore";
import InspectIcon from "@mui/icons-material/Search";
import { useMemo, useEffect } from "react";

export default function EventsTable() {
  const actionResult = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const loading = navigation.state != "idle";
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventStore.events);
  //const events = actionResult && actionResult.isSuccess ? actionResult.data.items : cachedEvents;
  const totalCount = useSelector((state) => state.eventStore.totalCount);
  //const totalCount = actionResult && actionResult.isSuccess ? actionResult.data.count : cachedTotalCount;
  const page = useSelector((state) => state.eventStore.page);
  const pageSize = useSelector((state) => state.eventStore.pageSize);
  
  useEffect(() => {
    if(actionResult && actionResult.isSuccess)
      dispatch(eventActions.setQueryResult(actionResult.data));
  }, [actionResult]); 

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
        flex: 1
      },
      { field: "id", headerName: "Id", headerAlign: "center", align: "center", flex: 1},
      { field: "author", headerName: "Organizer", headerAlign: "center", align: "center", flex: 3 },
      { field: "title", headerName: "Title", headerAlign: "center", align: "center", flex: 3 },
      { field: "body", headerName: "Body", headerAlign: "center", align: "center", flex: 5 },
      { field: "capacity", headerName: "Capacity", headerAlign: "center", align: "center", flex: 2 },
      { field: "price", headerName: "Price", headerAlign: "center", align: "center", flex: 2 },
      { field: "date", headerName: "Date", headerAlign: "center", align: "center", flex: 4},
      { field: "dateCreated", headerName: "Created Date", headerAlign: "center", align: "center", flex: 4 },
      { field: "dateModified", headerName: "Modified Date", headerAlign: "center", align: "center", flex: 4 }
    ],
    []
  );

  const rows = useMemo(() =>
    events.map((ev) => (
      {
        details: ev.id,
        id: ev.id,
        author: ev.author,
        title: ev.title,
        body: ev.body,
        capacity: ev.capacity,
        price: ev.price,
        date: ev.date,
        dateCreated: ev.dateCreated,
        dateModified: ev.dateModified
      }
    )),[events]);

  if (loading) 
    return <CircularProgress />;

  if(actionResult && !actionResult.isSuccess)
    return <ActionLoaderResult result={actionResult}/>;

  if (actionResult && events.length < 1)
    return <p>No events found!</p>;

  if (!actionResult && events.length < 1) 
    return;

  return (
    <Box sx={{height:600,width:"100%",margin:"auto"}}>
      <DataGrid columns={columns} rows={rows} rowHeight={40}
        rowCount={totalCount}
        sx={{'MuiDataGrid-columnHeaderTitle':{fontWeight:900}}}
        onRowDoubleClick={(params) => navigate("id/"+params.row.id) }/>
    </Box>
  );
}
