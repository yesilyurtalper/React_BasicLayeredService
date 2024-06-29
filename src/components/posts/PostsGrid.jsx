import { Link } from "react-router-dom";
import InspectIcon from "@mui/icons-material/Search";
import CustomGrid from "../common/CustomGrid";
import withSWRGrid from "../HOCs/withSWRGrid";

const PostsGrid = ({
  items: posts,
  loading,
  totalItems,
  paginationModel,
  onPaginationChange,
  onRowDoubleClick,
  rowHeight,
}) => {
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

  const rows = posts?.map((ev) => ({
    details: ev.id,
    id: ev.id,
    author: ev.author,
    title: ev.title,
    body: ev.body,
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
        onPaginationChange={onPaginationChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
      />
  );
}

const PostsGridWithSWR = withSWRGrid(PostsGrid,"posts");

export default PostsGridWithSWR;