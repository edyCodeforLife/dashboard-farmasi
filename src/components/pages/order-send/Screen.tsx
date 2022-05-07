import React from 'react';
import Template from '@templates/Default';
import OrderSendList from '@organisms/order/OrderSendList';
import Snakebar from '@molecules/modals/Snakebar';
import Service from './Service';

const OrderSend = () => {
  const {
    meta,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    orderHistory,
    historyOrder,
    setOrderHistory,
    detailHandler,
    arrivedHandler,
    date,
    onChangeCalender,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderSendList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        orders={orders}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        orderHistory={orderHistory}
        historyOrder={(value: number) => historyOrder(value)}
        setOrderHistory={setOrderHistory}
        arrivedHandler={arrivedHandler}
        selectPartner={(value: any) => setPartner(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderSend;
