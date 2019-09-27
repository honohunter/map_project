import React from 'react';
import { ReactTabulator } from 'react-tabulator';

import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css';

const MarkerTable = props => {
  const columns = [
    { title: 'Place Name', field: 'name' },
    { title: 'Location', field: 'location', visible: false },
    { title: 'Comments', field: 'comments' },
  ];

  const handelRowClick = (event, row) => {
    const { location } = row.getData();

    props.handelRowClick(location);
  };

  return <ReactTabulator columns={columns} data={props.data} height="92vh" rowClick={handelRowClick} />;
};
export default MarkerTable;
