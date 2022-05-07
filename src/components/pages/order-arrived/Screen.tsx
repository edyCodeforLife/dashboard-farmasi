import React from 'react';
import Template from '@templates/Default';
import OrderArrivedList from '@organisms/order/OrderArrivedList';
import Snakebar from '@molecules/modals/Snakebar';
import Service from './Service';

const OrderArrived = () => {
  const {
    meta,
    orders,
    upload,
    setMeta,
    partner,
    partners,
    isLoader,
    setUpload,
    setPartner,
    orderHistory,
    historyOrder,
    setOrderHistory,
    fileHandler,
    inputHandler,
    submitHandler,
    detailHandler,
    complaintPayload,
    complaintHandler,
    date,
    onChangeCalender,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderArrivedList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        orders={orders}
        upload={upload}
        partner={partner}
        partners={partners}
        isLoader={isLoader}
        orderHistory={orderHistory}
        historyOrder={(value: number) => historyOrder(value)}
        setOrderHistory={setOrderHistory}
        cancelUpload={setUpload}
        fileHandler={fileHandler}
        inputHandler={inputHandler}
        complaint={complaintPayload}
        submitHandler={submitHandler}
        complaintHandler={complaintHandler}
        selectPartner={(value: any) => setPartner(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderArrived;
