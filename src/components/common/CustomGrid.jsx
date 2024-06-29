
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

export default function CustomGrid({
  columns,
  rows,
  loading,
  totalItems,
  paginationModel,
  onPaginationChange,
  onRowDoubleClick,
  rowHeight = 40,
  paginationMode = "server",
  height = 510,
  width = "100%",
}) {

  const memoizedColumns = useMemo(() => columns, [columns] );
  const memoizedRows = useMemo(() => rows, [rows] );

  return (
    <Box sx={{ height: height, width: width, margin: "auto" }}>
      <DataGrid
        columns={memoizedColumns}
        pagination
        rows={memoizedRows}
        rowHeight={rowHeight}
        loading={loading}
        rowCount={totalItems}
        sx={{ "MuiDataGrid-columnHeaderTitle": { fontWeight: 900 } }}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
