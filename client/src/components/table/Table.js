import React from 'react';
import MaterialTable from 'material-table';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Icon,
  Tooltip
} from '@material-ui/core';

const Table = (props) => {
  return (
    <div className="table">
      <MaterialTable
        columns={[ // FIXME
          { title: 'Title', field: 'title' },
          { title: 'Material', field: 'material' },
          { title: 'Type', field: 'type' },
          { title: 'Period', field: 'period' },
          { title: 'Town', field: 'municipality' },
        ]}
        data={props.tableData}
        title="Finds"
        detailPanel={rowData => {
          return renderDetailPanel(rowData);
        }}
        options={{
          pageSize: 20,
          pageSizeOptions: [20, 50, 100, 1000],
          search: false,
          showTitle: false,
          maxBodyHeight: 1000,
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
};

const renderDetailPanel = (row) => {
  return (
    <Card className="table__detail-panel">
      <CardActionArea className="table__detail-panel__container">
        {
          row.image ? (
            <CardMedia
              className="table__detail-panel__container__image"
              image={row.image}
              title={row.title}
            />
          ) : (
            <Tooltip title="No Image" placement="top">
              <Icon className="table__detail-panel__container__icon">crop_original</Icon>
            </Tooltip>
          )
        }
        <CardContent className="table__detail-panel__container__content">
          <Typography gutterBottom variant="subtitle1">
            Province: {row.province}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            Specification: {row.specification}
          </Typography>
          <Typography component="p">
            {row.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Table;
