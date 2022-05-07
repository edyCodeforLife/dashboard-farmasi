import React from 'react';
import moment from 'moment';

import OrderListTransaction from '@organisms/order/OrderListTransaction';
import Snakebar from '@molecules/modals/Snakebar';
import Template from '@templates/Default';

import Service from './Service';

const DataTransaction = () => {
  const {
    meta,
    orders,
    setMeta,
    partners,
    isLoader,
    detailHandler,
    listStatus,
    defaultTable,
    setDefaultTable,
    exportToExcel,
    paramsSearch,
    setParamsSearch,
    listRange,
    sortingHandler,
    previousNumber,
    sortKey,
    orderKey,
    resetFilter,
    listPaymentMethod,
    loading,
    warning,
  } = Service();

  return (
    <Template>
      { warning.message !== '' && <Snakebar type={warning.type} message={warning.message} /> }
      <OrderListTransaction
        loading={loading}
        listPaymentMethod={listPaymentMethod}
        paymentMethod={paramsSearch.paymentMethod}
        paymentHandler={(event) => setParamsSearch({ ...paramsSearch, paymentMethod: event })}
        setCreatedTime={(event) => setParamsSearch({ ...paramsSearch, createdTime: { startDate: moment(event[0]).format('YYYY, MM, DD'), endDate: moment(event[1]).format('YYYY, MM, DD') } })}
        setTransactionTime={(event) => setParamsSearch({ ...paramsSearch, transactionTime: { startDate: moment(event[0]).format('YYYY, MM, DD'), endDate: moment(event[1]).format('YYYY, MM, DD') } })}
        createdDate={paramsSearch.createdTime}
        trxDate={paramsSearch.transactionTime}
        resetFilter={() => resetFilter()}
        orderKey={orderKey}
        sortKey={sortKey}
        previousNumber={previousNumber}
        sortingHandler={(event) => sortingHandler(event)}
        listRange={listRange}
        paramsSearch={paramsSearch}
        setDiscount={(event) => setParamsSearch({ ...paramsSearch, discount: event })}
        setNettTrans={(event) => setParamsSearch({ ...paramsSearch, nettTrans: event })}
        setSalePrice={(event) => setParamsSearch({ ...paramsSearch, salePrice: event })}
        setKeyOriginPrice={(event) => setParamsSearch({ ...paramsSearch, originPrice: event })}
        setKeyShippingPrice={(event) => setParamsSearch({ ...paramsSearch, shippingPrice: event })}
        setKeyOrderId={(event) => setParamsSearch({ ...paramsSearch, orderId: event })}
        setUsername={(event) => setParamsSearch({ ...paramsSearch, username: event })}
        setRecipientName={(event) => setParamsSearch({ ...paramsSearch, recipientName: event })}
        setRecipientAddr={(event) => setParamsSearch({ ...paramsSearch, recipientAddress: event })}
        setMedicine={(event) => setParamsSearch({ ...paramsSearch, medicine: event })}
        exportToExcel={exportToExcel}
        defaultTable={defaultTable}
        setDefaultTable={(value) => setDefaultTable(value)}
        meta={meta}
        orders={orders}
        partner={paramsSearch.partner}
        partners={partners}
        isLoader={isLoader}
        partnerHandler={(event) => setParamsSearch({ ...paramsSearch, partner: event })}
        listStatus={listStatus}
        status={paramsSearch.status}
        statusHandler={(event) => setParamsSearch({ ...paramsSearch, status: event })}
        detailHandler={(value: number) => detailHandler(value)}
        pagination={(value: number) => setMeta({ ...meta, page: value })}
        setRows={(value: number) => setMeta({ ...meta, limit: value, page: 1 })}
      />
    </Template>
  );
};

export default DataTransaction;
