import React from 'react';

import { FilterList, OptionMenu, Table } from '@molecules/order-list-transaction';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import Loader from '@molecules/common/Loader';

interface ParamsSearch {
  orderId: string;
  shippingPrice: string;
  originPrice: string;
  salePrice: string;
  discount: string;
  nettTrans: string;
  username: string;
  recipientName: string;
  recipientAddress: string;
  medicine: string;
}
interface Orders {
  id: number;
  orderCode: string;
  createdAt: string;
  totalPrice: string;
  transactionCode: string;
  product: {
    total: number;
    id: string;
    name: string;
    price: string;
    actualPrice: string;
    images: string;
  };
}

interface TableConf {
  text: string;
  display: boolean;
  sorting: boolean;
  value: string;
}
interface TransactionTime {
  startDate: string;
  endDate: string;
}
interface Meta {
  page: number;
  totalData: number;
  totalPage: number;
  totalResult: number;
  limit: number;
  maxPage: number;
}

interface Partner {
  label: string;
  value: string;
  orderId: number;
}

interface Props {
  loading: boolean;
  resetFilter?: () => void;
  orderKey: string;
  sortKey: string;
  paramsSearch: ParamsSearch;
  previousNumber: () => void;
  sortingHandler: (value: string) => void,
  listRange: Array<any>;
  setKeyOriginPrice: (value: any) => void,
  setKeyOrderId: (value: any) => void,
  setKeyShippingPrice: (value: any) => void,
  setSalePrice: (value: any) => void,
  setDiscount: (value: any) => void,
  setNettTrans: (value: any) => void,
  setUsername: (value: any) => void,
  setRecipientName: (value: any) => void,
  setRecipientAddr: (value: any) => void,
  setMedicine: (value: any) => void,
  defaultTable: Array<any>;
  setDefaultTable: (value: any) => void;
  trxDate: TransactionTime;
  createdDate: TransactionTime;
  meta: Meta;
  orders: Array<Orders>;
  partner?: any;
  partners: any;
  isLoader: boolean;
  pagination: (meta: any) => void;
  setRows: (meta: any) => void;
  detailHandler: (id: number) => void;
  partnerHandler: (value: any) => void;
  listPaymentMethod: any;
  paymentMethod: any;
  paymentHandler: (value: any) => void;
  listStatus: any;
  status: any;
  statusHandler: (value: any) => void;
  exportToExcel: () => void;
  setTransactionTime: (value: any) => void;
  setCreatedTime: (value: any) => void;
}

const OrderListTransaction = (props: Props) => {
  const {
    meta,
    orders,
    partner,
    partners,
    isLoader,
    pagination,
    setRows,
    detailHandler,
    partnerHandler,
    listStatus,
    status,
    statusHandler,
    defaultTable,
    setDefaultTable,
    exportToExcel,
    setKeyOrderId,
    setKeyShippingPrice,
    setKeyOriginPrice,
    setSalePrice,
    setDiscount,
    setNettTrans,
    setUsername,
    setRecipientName,
    setRecipientAddr,
    setMedicine,
    listRange,
    sortingHandler,
    previousNumber,
    paramsSearch,
    sortKey,
    orderKey,
    resetFilter,
    trxDate,
    createdDate,
    setTransactionTime,
    setCreatedTime,
    listPaymentMethod,
    paymentMethod,
    paymentHandler,
    loading,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-2 overflow-hidden">
      <FilterList
        loading={loading}
        discount={paramsSearch.discount}
        setDiscount={setDiscount}
        nettTrans={paramsSearch.nettTrans}
        setNettTrans={setNettTrans}
        salePrice={paramsSearch.salePrice}
        setSalePrice={setSalePrice}
        originPrice={paramsSearch.originPrice}
        setOriginPrice={setKeyOriginPrice}
        shippingPrice={paramsSearch.shippingPrice}
        setShippingPrice={setKeyShippingPrice}
        orderId={paramsSearch.orderId}
        setOrderId={setKeyOrderId}
        username={paramsSearch.username}
        setUsername={setUsername}
        recipientName={paramsSearch.recipientName}
        setRecipientName={setRecipientName}
        recipientAddress={paramsSearch.recipientAddress}
        setRecipientAddress={setRecipientAddr}
        medicine={paramsSearch.medicine}
        setMedicine={setMedicine}
        exportToExcel={exportToExcel}
        // combo box status
        dataStatus={status}
        setStatus={statusHandler}
        listDataStatus={listStatus}
        // combo box hospital
        dataPartner={partner}
        setPartner={partnerHandler}
        listDataPartners={partners}
        // combo box payment method
        dataPaymentMethod={paymentMethod}
        setDataPaymentMethod={paymentHandler}
        listDataPaymentMethod={listPaymentMethod}
        // transaction time
        trxDate={trxDate}
        createdDate={createdDate}
        setTrx={(value: any) => setTransactionTime(value)}
        setCreated={(value: any) => setCreatedTime(value)}
      />
      <OptionMenu
        setOptions={(e) => setDefaultTable(e)}
        dataTableView={defaultTable}
        resetFilter={() => { if (resetFilter) resetFilter(); }}
      />
      <div className="w-full h-full bg-white overflow-hidden pb-12">
        {
          !isLoader && orders.length > 0 && (
            <>
              <div className="border rounded h-full w-full overflow-x-scroll scroll-green">
                <Table
                  orderKey={orderKey}
                  sortKey={sortKey}
                  indexing={previousNumber}
                  sortingHandler={(event) => sortingHandler(event)}
                  detailHandler={(event) => detailHandler(event)}
                  orders={orders}
                  dataTable={defaultTable}
                />
              </div>
              <div className="py-4 px-8 flex justify-start items-center border-t border-gray-100 border-solid shadow">
                <Pagination
                  maxPage={meta?.maxPage}
                  totalData={meta?.limit}
                  setRows={(value: number) => setRows(value)}
                  listRange={listRange}
                  active={meta?.page}
                  total={meta?.totalPage}
                  handler={(value: number) => pagination(value)}
                />
              </div>
            </>
          )
        }
        {!isLoader && orders.length < 1 && <OrderEmpty text="Tidak ada data yang sesuai" />}
        {isLoader && <Loader />}
      </div>
    </div>
  );
};

OrderListTransaction.defaultProps = {
  partner: null,
  resetFilter: () => { },
};

export default OrderListTransaction;
