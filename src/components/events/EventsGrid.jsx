import { Link } from "react-router-dom";
import InspectIcon from "@mui/icons-material/Search";
import CustomGrid from "../common/CustomGrid";

export default function EventsGrid({
  data: events,
  loading,
  totalCount,
  paginationModel,
  onPaginationChange,
  onRowDoubleClick,
  rowHeight,
}) {
  const columns = [
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
  ];

  const rows = events.map((ev) => ({
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
  }));
  
  return (
    <CustomGrid
        columns={columns}
        rows={rows}
        loading={loading}
        rowCount={totalCount}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
      />
  );
}
