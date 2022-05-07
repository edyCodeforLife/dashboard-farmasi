import React from 'react';
import ComplaintDoneList from '@organisms/complaint/ComplaintDoneList';
import Snakebar from '@molecules/modals/Snakebar';
import Template from '@templates/Default';
import Service from './Service';

const ComplaintDone = () => {
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
    imageComplaintHandler,
    setShowComplaintImage,
    onChangeCalender,
    date,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <ComplaintDoneList
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
        imageComplaintHandler={(value: number) => imageComplaintHandler(value)}
        setShowComplaintImage={(value: boolean) => setShowComplaintImage(value)}
      />
    </Template>
  );
};

export default ComplaintDone;
