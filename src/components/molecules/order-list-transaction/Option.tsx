import React from 'react';
import Icon from '@mui/material/Icon';
import TableOption from '@atoms/custom/TableOption';

interface Props {
  dataTableView: any;
  setOptions: (any) => void;
  resetFilter?: () => void;
}

const OptionMenu = (props: Props) => {
  const {
    dataTableView,
    resetFilter,
    setOptions,
  } = props;

  return (
    <div className="flex my-2 flex-row-reverse items-center w-full px-1">
      <button type="submit" className="text-mainColor font-normal text-sm mx-5 my-auto" onClick={() => { if (resetFilter) resetFilter(); }}>Reset Filters</button>
      <TableOption
        options={dataTableView}
        direction="row"
        handlerOptions={(value) => setOptions(value)}
        icon={<i><Icon>table_chart_icon</Icon></i>}
      />
    </div>
  );
};

OptionMenu.defaultProps = {
  resetFilter: () => { },
};

export default OptionMenu;
