import { Link } from "react-router-dom";
import InspectIcon from "@mui/icons-material/Search";
import CustomGrid from "../common/CustomGrid";
import withSWRGrid from "../HOCs/withSWRGrid";

const EventsGrid = ({
  items: events,
  loading,
  totalItems,
  paginationModel,
  sortModel,
  onPaginationChange,
  onSortChange,
  onRowDoubleClick,
  rowHeight,
}) => {
  const columns = [
    {
      field: "details",
      headerName: "",
      sortable: false,
      renderCell: (row) => (
        <Link to={"id/" + row?.id}>
          <InspectIcon />
        </Link>
      ),
    },
    {
      field: "id",
      headerName: "Id",
      sortable: true,
    },
    {
      field: "author",
      headerName: "Organizer",
      sortable: true,
    },
    {
      field: "title",
      headerName: "Title",
      sortable: true,
    },
    {
      field: "body",
      headerName: "Body",
      sortable: true,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      sortable: false,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
    },
    {
      field: "date",
      headerName: "Date",
      sortable: true,
    },
    {
      field: "dateCreated",
      headerName: "Created Date",
      sortable: true,
    },
    {
      field: "dateModified",
      headerName: "Modified Date",
      sortable: true,
    },
  ];

  const rows = events?.map((ev) => ({
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
        totalItems={totalItems}
        paginationModel={paginationModel}
        sortModel={sortModel}
        onPaginationChange={onPaginationChange}
        onSortChange={onSortChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
        height={450}
      />
  );
}

const EventsGridWithSWR = withSWRGrid(EventsGrid,"events");

export default EventsGridWithSWR;