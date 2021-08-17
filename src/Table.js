import { AgGridReact } from "ag-grid-react";
import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = () => {
  const data = [
    { name: "Rustam", age: 24 },
    { name: "Anel", age: 25 },
    { name: "Aziza", age: 45 },
    { name: "Kamilla", age: 20 },
  ];

  const columns = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true,
    },
    { headerName: "Age", field: "age" },
  ];

  const defaultColDef = { sortable: true, editable: true, filter: true };
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 400 }}>
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Table;
