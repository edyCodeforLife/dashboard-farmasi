import React from 'react';

import OrderComplaintList from '@organisms/complaint/ComplaintAccepted';
import Template from '@templates/Default';
import Snakebar from '@molecules/modals/Snakebar';
import Service from './Service';

const OrderComplaint = () => {
  const {
    meta,
    orders,
    setMeta,
    partner,
    confirm,
    partners,
    isLoader,
    complaint,
    setPartner,
    historyOrder,
    orderHistory,
    detailHandler,
    complaintData,
    setOrderHistory,
    complaintHandler,
    showComplaintImage,
    imageComplaintHandler,
    setShowComplaintImage,
    onChangeCalender,
    date,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderComplaintList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        confirm={confirm}
        partner={partner}
        complaints={orders}
        partners={partners}
        isLoader={isLoader}
        complaint={complaint}
        orderHistory={orderHistory}
        complaintData={complaintData}
        setOrderHistory={setOrderHistory}
        complaintHandler={complaintHandler}
        showComplaintImage={showComplaintImage}
        selectPartner={(value: any) => setPartner(value)}
        historyOrder={(value: number) => historyOrder(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
        imageComplaintHandler={(value: number) => imageComplaintHandler(value)}
        setShowComplaintImage={(value: boolean) => setShowComplaintImage(value)}
      />
    </Template>
  );
};

export default OrderComplaint;
