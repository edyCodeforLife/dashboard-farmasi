import React from 'react';
import ComplaintProcessedList from '@organisms/complaint/ComplaintProcessedList';
import Snakebar from '@molecules/modals/Snakebar';
import Template from '@templates/Default';
import Service from './Service';

const ComplaintProcessed = () => {
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
    complaintData,
    detailHandler,
    setOrderHistory,
    showComplaintImage,
    complaintDoneHandler,
    imageComplaintHandler,
    setShowComplaintImage,
    onChangeCalender,
    date,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <ComplaintProcessedList
        date={date}
        onChangeCalendar={(event) => onChangeCalender(event)}
        meta={meta}
        partner={partner}
        partners={partners}
        disabled={disabled}
        isLoader={isLoader}
        complaints={orders}
        orderHistory={orderHistory}
        complaintData={complaintData}
        setOrderHistory={setOrderHistory}
        showComplaintImage={showComplaintImage}
        selectPartner={(value: any) => setPartner(value)}
        historyOrder={(value: number) => historyOrder(value)}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
        complaintDoneHandler={(value: number) => complaintDoneHandler(value)}
        imageComplaintHandler={(value: number) => imageComplaintHandler(value)}
        setShowComplaintImage={(value: boolean) => setShowComplaintImage(value)}
      />
    </Template>
  );
};

export default ComplaintProcessed;
