import React from 'react';
import OrderRefundList from '@organisms/order/OrderRefundList';
import Snakebar from '@molecules/modals/Snakebar';
import Template from '@templates/Default';
import Service from './Service';

const OrderRefund = () => {
  const {
    meta,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    historyOrder,
    orderHistory,
    detailHandler,
    setOrderHistory,
    date,
    onChangeCalender,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderRefundList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        orders={orders}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        orderHistory={orderHistory}
        setOrderHistory={setOrderHistory}
        selectPartner={(value: any) => setPartner(value)}
        historyOrder={(value: number) => historyOrder(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderRefund;
