import React from 'react';
import MaterialTable from 'material-table';

const Table = (props) => {
  return (
    <div className="table">
      <MaterialTable
        columns={[ // FIXME
          { title: 'Title', field: 'title' },
          { title: 'Material', field: 'material' },
          { title: 'Type', field: 'type' },
          { title: 'Period', field: 'period' },
        ]}
        data={props.tableData}
        title="Finds"
        detailPanel={rowData => {
          return (
            <div>
              <p>{rowData.description}</p>
              <img src={rowData.image} />
            </div>
          );
        }}
        options={{
          pageSize: 20,
          pageSizeOptions: [20, 50, 100, 1000]
        }}
      />
    </div>
  );
};

export default Table;
