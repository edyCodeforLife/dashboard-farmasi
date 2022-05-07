import React, { useState } from 'react';

interface Options {
  text: string;
  display: boolean;
  sorting: boolean;
  value: string;
}
interface Props {
  indexing?: () => void;
  data?: any;
  tableOptions: any;
  detailHandler: (evt: number) => void;
}

const TableBody = (props: Props) => {
  const {
    data,
    tableOptions,
    detailHandler,
    indexing,
  } = props;
  const [numberIndex, setNumberIndex] = useState(indexing);
  return (
    <tbody>
      {data.length > 0 ? (
        <>
          {data.map((item, index) => (
            <tr className="bg-white border cursor-pointer group" onClick={() => detailHandler(item.id)}>
              {tableOptions.filter((opt) => opt.display === true).map((itm) => (
                <td className="p-2 group-hover:bg-subtle font-normal text-sm">
                  {itm.value === 'number' ? numberIndex + (index + 1) : item[itm.value]}
                </td>
              ))}
            </tr>
          ))}
        </>
      ) : (
        <tr className="bg-white border">
          <td
            className="p-4"
            colSpan={tableOptions.length}
          >
            <span>Data masih kosong !</span>
          </td>
        </tr>
      )}
    </tbody>
  );
};

TableBody.defaultProps = {
  data: [],
  indexing: () => { },
};

export default TableBody;
