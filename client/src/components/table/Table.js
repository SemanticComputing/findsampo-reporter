import React from 'react';
import MaterialTable from 'material-table';
import intl from 'react-intl-universal';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Icon,
  Tooltip,
  Divider,
  CardActions,
  Button
} from '@material-ui/core';
import { RouterPaths } from '../../utils/enum/enums';
import { getIdfromUri } from '../../utils/functions/functions';
import { history } from '../../routers/AppRouter';

/**
 * Parameters
 * 
 * tableData: The data which is given to table to show
 */
const Table = (props) => {
  return (
    <div className="table">
      <MaterialTable
        columns={[
          {
            title: intl.get('nearByPage.table.previewImage'),
            field: 'image',
            render: rowData => rowData.image_url ?
              <img src={rowData.image_url.split(';')[0]/*Show only the first image*/} className="table__column__icon" / > :
              <Icon className="table__column__icon">crop_original</Icon>
          },
          { title: intl.get('nearByPage.table.title'), field: 'title' },
          { title: intl.get('nearByPage.table.material'), field: 'main_material' },
          { title: intl.get('nearByPage.table.type'), field: 'type' },
          { title: intl.get('nearByPage.table.period'), field: 'period' },
          { title: intl.get('nearByPage.table.municipality'), field: 'municipality' },
        ]}
        data={props.tableData}
        title="Finds"
        detailPanel={rowData => {
          return renderDetailPanel(rowData);
        }}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 50, 100, 1000],
          search: false,
          showTitle: false,
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
};

const renderDetailPanel = (row) => {
  return (
    <Card className="table__detail-panel">
      <CardActionArea className="table__detail-panel__container" disabled>
        {
          row.image_url ? (
            <CardMedia
              className="table__detail-panel__container__image"
              image={row.image_url.split(';')[0]}
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
            {intl.get('nearByPage.table.province')}: {row.province ? row.province : intl.get('nearByPage.table.notProvidedValue')}
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            {intl.get('nearByPage.table.specification')}: {row.specification ? row.specification : intl.get('nearByPage.table.notProvidedValue')}
          </Typography>
          <Typography component="p">
            {row.description ? row.description : intl.get('nearByPage.table.noAdditionalInformation')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className="my-finds-page__find__actions">
        <Button size="small" color="primary" onClick={() => onMoreButtonPressed(row.id)}>
          {intl.get('nearByPage.table.more')}
        </Button>
      </CardActions>
    </Card>
  );
};

const onMoreButtonPressed = (id) => {
  const findId = getIdfromUri('sualt-fha-finds', id);
  history.push(`${RouterPaths.FIND_PAGE}?id=${findId}`, { findId });
};

export default Table;
