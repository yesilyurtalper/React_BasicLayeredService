import { useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function CustomGrid({
  columns,
  rows,
  loading,
  totalItems,
  paginationModel,
  sortModel,
  onPaginationChange,
  onSortChange,
  onRowDoubleClick,
  height = 450,
  width = 1310,
}) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedRows = useMemo(() => rows, [rows]);

  return (
    <DataTable
      value={memoizedRows}
      style={{ maxWidth: width }}
      showGridlines
      stripedRows
      resizableColumns
      scrollable
      scrollHeight={height}
      paginator
      rowsPerPageOptions={[5, 10, 25, 50]}
      lazy
      totalRecords={totalItems}
      page={paginationModel.page}
      rows={paginationModel.pageSize}
      first={paginationModel.page * paginationModel.pageSize}
      onPage={onPaginationChange}
      loading={loading}
      sortMode="single"
      removableSort
      onSort={onSortChange}
      sortField={sortModel?.sortField}
      sortOrder={sortModel?.sortOrder}
    >
      {memoizedColumns?.map((col) => (
        <Column
          field={col?.field}
          header={col?.headerName}
          body={col?.renderCell}
          sortable={col?.sortable}
        />
      ))}
    </DataTable>
  );
}
