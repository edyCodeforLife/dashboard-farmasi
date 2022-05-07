import React from 'react';
import Template from '@templates/Default';
import OrderPickupList from '@organisms/order/OrderPickupList';
import Snakebar from '@molecules/modals/Snakebar';
import Service from './Service';

const OrderPickup = () => {
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
    sendHandler,
    detailHandler,
    date,
    onChangeCalender,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderPickupList
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
        sendHandler={sendHandler}
        selectPartner={(value: any) => setPartner(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderPickup;
