import React from 'react';
import CardBody from '@molecules/common/CardBody';
import CardHeader from '@molecules/common/CardHeader';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import { ComboBox, Label, Button } from '@atoms/common';
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
  orders: Array<Orders>;
  partner: any;
  partners: any;
  disabled: boolean;
  isLoader: boolean;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  historyOrder: (id: number) => void;
  arrivedHandler: (id: number) => void;
  pagination: (meta: any) => void;
  detailHandler: (id: number) => void;
}

const OrderSendList = (props: Props) => {
  const {
    meta,
    orders,
    partner,
    partners,
    disabled,
    isLoader,
    pagination,
    detailHandler,
    selectPartner,
    orderHistory,
    setOrderHistory,
    historyOrder,
    arrivedHandler,
    onChangeCalendar,
    date,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-3">
      {disabled && <WindowLoader />}
      {
        orderHistory && (
          <ModalHistory
            history={orderHistory}
            handler={() => setOrderHistory(null)}
          />
        )
      }
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
        <div className="w-full h-full px-3 py-2 absolute inset-0 overflow-y-auto">
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
                          orderCode={order.orderCode}
                          historyHandler={() => historyOrder(order.id)}
                          detailHandler={() => detailHandler(order.id)}
                        />
                        <CardBody
                          address={order.address}
                          receiverName={order.receiverName}
                          product={order.product}
                          code={order.transactionCode}
                          showTransactionCode
                          anotherButton={(
                            <Button
                              handler={() => arrivedHandler(order.id)}
                              text="Barang Tiba Ditujuan"
                              classes="w-full py-2 rounded-lg text-sm text-white font-bold bg-mainColor"
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

export default OrderSendList;
