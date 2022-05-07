import React from 'react';
import OrderDoneList from '@organisms/order/OrderDoneList';
import Snakebar from '@molecules/modals/Snakebar';
import Template from '@templates/Default';
import Service from './Service';

const OrderDone = () => {
  const {
    meta,
    orders,
    setMeta,
    partner,
    partners,
    disabled,
    isLoader,
    setPartner,
    openUpload,
    fileHandler,
    payloadImage,
    historyOrder,
    orderHistory,
    setOpenUpload,
    detailHandler,
    uploadHandler,
    submitHandler,
    setOrderHistory,
    date,
    onChangeCalender,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderDoneList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        orders={orders}
        submitHandler={submitHandler}
        payloadImage={payloadImage}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        openUpload={openUpload}
        fileHandler={fileHandler}
        orderHistory={orderHistory}
        setOpenUpload={setOpenUpload}
        uploadHandler={uploadHandler}
        setOrderHistory={setOrderHistory}
        selectPartner={(value: any) => setPartner(value)}
        historyOrder={(value: number) => historyOrder(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
      />
    </Template>
  );
};

export default OrderDone;
