import React from 'react';
import Template from '@templates/Default';
import Snakebar from '@molecules/modals/Snakebar';
import OrderUnpaidList from '@organisms/order/OrderUnpaidList';
import Service from './Service';

const OrderUnpaid = () => {
  const {
    meta,
    orders,
    setMeta,
    isLoader,
    warning,
    detailHandler,
    historyOrder,
    setOrderHistory,
    orderHistory,
  } = Service();

  return (
    <Template>
      { warning !== '' && <Snakebar type="error" message={warning} /> }
      <OrderUnpaidList
        orderHistory={orderHistory}
        setOrderHistory={setOrderHistory}
        historyOrder={(value: number) => historyOrder(value)}
        meta={meta}
        orders={orders}
        isLoader={isLoader}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
        detailHandler={(value: number) => detailHandler(value)}
      />
    </Template>
  );
};

export default OrderUnpaid;
