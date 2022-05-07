import React, { useEffect, useState } from 'react';
import Icon from '@mui/material/Icon';

interface Options {
  text: string;
  display: boolean;
  sorting: boolean;
  value: string;
}

interface SortingOption {
  text: string;
  value: string;
}

interface Props {
  sortKey?: string;
  orderKey?: string;
  data?: any;
  sortingHandler?: (event: string) => void;
}

const TableHeader = (props: Props) => {
  const {
    data,
    sortingHandler,
    orderKey,
    sortKey,
  } = props;
  const [rowData, setRowData] = useState<Array<Options>>([]);

  useEffect(() => {
    setRowData(data.filter((item) => item.display === true));
  }, [data]);

  const sortingIcon = (params: string) => {
    switch (params) {
      case 'ASC':
        return (
          <div className="flex justify-center justify-items-center content-center items-center w-4 h-4">
            <i className="icon-sort"><Icon>arrow_drop_up_icon</Icon></i>
          </div>
        );
      case 'DESC':
        return (
          <div className="flex justify-center content-center items-center w-4 h-4">
            <i className="icon-sort"><Icon>arrow_drop_down_icon</Icon></i>
          </div>
        );
      case '':
        return (
          <div className="flex justify-center justify-items-center content-center items-center w-4 h-4">
            <i className="icon-sort"><Icon>arrow_drop_up_icon</Icon></i>
          </div>
        );
      default:
        return false;
    }
  };

  return (
    <thead>
      <tr className="bg-mainColor rounded-t tb-header">
        {rowData.map((item) => (
          <th className="p-2 text-white cursor-pointer row-header font-normal text-sm" onClick={() => { if (sortingHandler) sortingHandler(item.value); }}>
            {item.sorting ? (
              <div className="flex w-auto align-middle items-center">
                {item.text}
                {item.value === orderKey ? sortingIcon(sortKey || '') : sortingIcon('')}
              </div>
            ) : (
              <div className="flex w-auto justify-between">
                {item.text}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.defaultProps = {
  data: [],
  sortingHandler: () => { },
  sortKey: '',
  orderKey: '',
};

export default TableHeader;
