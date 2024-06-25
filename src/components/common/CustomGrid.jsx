
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";

export default function CustomGrid({
  columns,
  rows,
  loading,
  totalCount,
  paginationModel,
  onPaginationChange,
  onRowDoubleClick,
  rowHeight = 40,
  paginationMode = "server",
  height = 500,
  width = "100%",
}) {

  const memoizedColumns = useMemo(() => columns, [columns] );
  const memoizedRows = useMemo(() => rows, [rows] );

  return (
    <Box sx={{ height: height, width: width, margin: "auto" }}>
      <DataGrid
        columns={memoizedColumns}
        rows={memoizedRows}
        rowHeight={rowHeight}
        loading={loading}
        rowCount={totalCount}
        sx={{ "MuiDataGrid-columnHeaderTitle": { fontWeight: 900 } }}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        onRowDoubleClick={(params) => onRowDoubleClick(params.row.id)}
      />
    </Box>
  );
}
