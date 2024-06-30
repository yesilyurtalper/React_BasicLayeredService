import { Link } from "react-router-dom";
import InspectIcon from "@mui/icons-material/Search";
import CustomGrid from "../common/CustomGrid";
import withSWRGrid from "../HOCs/withSWRGrid";

const PostsGrid = ({
  items: posts,
  loading,
  totalItems,
  paginationModel,
  sortModel,
  onPaginationChange,
  onRowDoubleClick,
  onSortChange,
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
        sortModel={sortModel}
        onPaginationChange={onPaginationChange}
        onSortChange={onSortChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
      />
  );
}

const PostsGridWithSWR = withSWRGrid(PostsGrid,"posts");

export default PostsGridWithSWR;