import React, { useState } from 'react';
import { TableBody, TableHeader } from '@atoms/common';

interface Orders {
  id: number;
  orderCode: string;
  totalPrice: string;
  transactionCode: string;
  product: {
    total: number;
    id: string;
    name: string;
    price: string;
    actualPrice: string;
    images: string;
  };
}

interface Options {
  text: string;
  display: boolean;
  sorting: boolean;
  value: string;
}

interface Props {
  orderKey: string;
  sortKey: string;
  dataTable: any;
  orders: Array<Orders>;
  indexing: () => void;
  detailHandler: (value: number) => void;
  sortingHandler: (value: string) => void;
}

const Table = (props: Props) => {
  const {
    dataTable,
    orders,
    detailHandler,
    sortingHandler,
    indexing,
    sortKey,
    orderKey,
  } = props;

  return (
    <table className="w-full">
      <TableHeader
        sortKey={sortKey}
        orderKey={orderKey}
        sortingHandler={(event) => sortingHandler(event)}
        data={dataTable}
      />
      <TableBody
        indexing={indexing}
        detailHandler={(evt) => detailHandler(evt)}
        data={orders}
        tableOptions={dataTable}
      />
    </table>
  );
};

export default Table;
