import React from 'react';
import Template from '@templates/Default';
import Snakebar from '@molecules/modals/Snakebar';
import OrderAcceptedList from '@organisms/order/OrderAcceptedList';
import Service from './Service';

const OrderAccepted = () => {
  const {
    meta,
    orders,
    submit,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    warning,
    selectPartner,
    detailHandler,
    orderHistory,
    setOrderHistory,
    historyOrder,
    onChangeCalender,
    date,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderAcceptedList
        date={date}
        onChangeCalendar={(e) => onChangeCalender(e)}
        meta={meta}
        orders={orders}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        processHandler={submit}
        partnerHandler={selectPartner}
        orderHistory={orderHistory}
        setOrderHistory={setOrderHistory}
        historyOrder={(value: number) => historyOrder(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderAccepted;
