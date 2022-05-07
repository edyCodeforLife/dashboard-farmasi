import React from 'react';
import CardHeader from '@molecules/common/CardHeader';
import CardBody from '@molecules/common/CardBody';
import CardFooter from '@molecules/common/CardFooter';
import { ComboBox, Label, Button } from '@atoms/common';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import ModalHistory from '@molecules/modals/History';
import Loader from '@molecules/common/Loader';
import WindowLoader from '@molecules/modals/WindowLoader';
import PanelTitlePageList from '@molecules/common/PanelTitlePageList';

interface Orders {
  id: number;
  address: string;
  receiverName: string;
  orderDate: string;
  createdAt: string;
  orderCode: string;
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

interface Meta {
  page: number;
  totalData: number;
  totalPage: number;
  totalResult: number;
}

interface TransactionCode {
  id: number;
  code: string;
}

interface Props {
  onChangeCalendar: (value: any) => void;
  date: Array<any>;
  meta: Meta;
  trxCode: TransactionCode;
  orders: Array<Orders>;
  partner: any;
  partners: any;
  disabled: boolean;
  isLoader: boolean;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  historyOrder: (id: number) => void;
  pagination: (meta: any) => void;
  pickupHandler: (id: number) => void;
  inputHandler: (code: string, id: number) => void;
  detailHandler: (id: number) => void;
}

const OrderProcessedList = (props: Props) => {
  const {
    meta,
    orders,
    trxCode,
    partner,
    partners,
    disabled,
    isLoader,
    selectPartner,
    orderHistory,
    setOrderHistory,
    historyOrder,
    pagination,
    pickupHandler,
    inputHandler,
    detailHandler,
    onChangeCalendar,
    date,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-3">
      {disabled && <WindowLoader />}
      {orderHistory && (
        <ModalHistory
          history={orderHistory}
          handler={() => setOrderHistory(null)}
        />
      )}
      <PanelTitlePageList
        showDate
        onChangeCalendar={(event) => onChangeCalendar(event)}
        date={date}
        comboBoxComponent={(
          <ComboBox
            placeholder="Pilih Rumah Sakit"
            option={partner}
            options={partners}
            selectHandler={(item: object) => selectPartner(item)}
          />
        )}
      />
      <div className="flex-1 h-full relative bg-white">
        {
          !isLoader && orders.length > 0 && (
            <div className="w-full h-full px-3 py-2 absolute inset-0 overflow-y-auto">
              {
                orders.map((order) => (
                  <div key={order.id} className="pt-1 pb-4">
                    <div className="border border-solid border-gray-300 shadow rounded-lg">
                      <CardHeader
                        showHistory
                        tagDate={(order.orderDate !== '-') ? 'Dibayar pada ' : 'Dibuat pada '}
                        orderDate={(order.orderDate !== '-') ? order?.orderDate : order?.createdAt}
                        historyHandler={() => historyOrder(order.id)}
                        orderCode={order.orderCode}
                        detailHandler={() => detailHandler(order.id)}
                      />
                      <CardBody
                        receiverName={order.receiverName}
                        address={order.address}
                        product={order.product}
                        transactionCode={{ label: 'Kode Transaksi', placeholder: 'Masukan Kode Transaksi' }}
                        inputHandler={(value) => inputHandler(value, order.id)}
                        code={trxCode.id === order.id ? trxCode.code : ''}
                        anotherButton={(
                          <Button
                            handler={() => pickupHandler(order.id)}
                            text="Siap di pickup"
                            disabled={trxCode.id !== order.id}
                            classes={`w-full py-2 rounded-lg text-sm text-white
                                ${trxCode.id !== order.id ? 'cursor-default bg-dark4' : 'bg-mainColor'} font-bold`}
                          />
                        )}
                      />
                      <CardFooter totalPrice={order.totalPrice} />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
        {!isLoader && orders.length < 1 && <OrderEmpty text="Belum ada pesanan yang masuk" />}
        {isLoader && <Loader />}
      </div>
      <div className="py-4 px-8 flex justify-center items-center border-t border-gray-200 border-solid shadow bg-white">
        <Pagination
          active={meta?.page}
          total={meta?.totalPage}
          handler={(value: number) => pagination(value)}
        />
      </div>
    </div>
  );
};

export default OrderProcessedList;
