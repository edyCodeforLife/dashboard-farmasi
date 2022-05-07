import React from 'react';
import Template from '@templates/Default';
import OrderProcessedList from '@organisms/order/OrderProcessedList';
import Snakebar from '@molecules/modals/Snakebar';
import Service from './Service';

const OrderProcessed = () => {
  const {
    meta,
    code,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    warning,
    setPartner,
    orderHistory,
    historyOrder,
    setOrderHistory,
    inputHandler,
    pickupHandler,
    detailHandler,
    onChangeCalender,
    date,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderProcessedList
        onChangeCalendar={(event) => onChangeCalender(event)}
        date={date}
        meta={meta}
        orders={orders}
        trxCode={code}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        orderHistory={orderHistory}
        setOrderHistory={setOrderHistory}
        historyOrder={(value: number) => historyOrder(value)}
        pickupHandler={pickupHandler}
        inputHandler={inputHandler}
        selectPartner={(value: any) => setPartner(value)}
        detailHandler={(id) => detailHandler(id)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderProcessed;
