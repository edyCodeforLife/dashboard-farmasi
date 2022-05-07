import React from 'react';
import CardHeader from '@molecules/common/CardHeader';
import CardBody from '@molecules/common/CardBody';
import CardFooter from '@molecules/common/CardFooter';
import PanelTitlePageList from '@molecules/common/PanelTitlePageList';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import { Button } from '@atoms/common';
import Loader from '@molecules/common/Loader';
import WindowLoader from '@molecules/modals/WindowLoader';
import ModalHistory from '@molecules/modals/History';

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

interface Partner {
  label: string;
  value: string;
  orderId: number;
}

interface Props {
  onChangeCalendar: (value: any) => void;
  date: Array<any>;
  meta: Meta;
  orders: Array<Orders>;
  partner?: any;
  partners: any;
  disabled: boolean;
  isLoader: boolean;
  pagination: (meta: any) => void;
  detailHandler: (id: number) => void;
  processHandler: (id: number) => void;
  partnerHandler: (id: string, orderId: number) => void;
  orderHistory: any;
  setOrderHistory: any;
  historyOrder: (id: number) => void;
}

const OrderAcceptedList = (props: Props) => {
  const {
    meta,
    orders,
    partner,
    partners,
    disabled,
    isLoader,
    pagination,
    detailHandler,
    partnerHandler,
    processHandler,
    orderHistory,
    setOrderHistory,
    historyOrder,
    onChangeCalendar,
    date,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-3">
      { orderHistory && (
        <ModalHistory
          history={orderHistory}
          handler={() => setOrderHistory(null)}
        />
      )}
      { disabled && <WindowLoader />}
      <PanelTitlePageList
        text="Informasi Produk"
        date={date}
        onChangeCalendar={(event) => onChangeCalendar(event)}
        showDate
      />
      <div className="flex-1 max-h-100 relative bg-white">
        {
          !isLoader && orders.length > 0 && (
            <div className="w-full h-full px-3 py-2 absolute inset-0 overflow-y-auto">
              {
                orders.map((order) => (
                  <div key={order.id} className="pt-1 pb-4">
                    <div className="border border-solid border-gray-300 shadow rounded-lg">
                      <CardHeader
                        showHistory
                        showPartner
                        partners={partners}
                        historyHandler={() => historyOrder(order.id)}
                        tagDate={(order.orderDate !== '-') ? 'Dibayar pada ' : 'Dibuat pada '}
                        orderDate={(order.orderDate !== '-') ? order?.orderDate : order?.createdAt}
                        orderCode={order.orderCode}
                        detailHandler={() => detailHandler(order.id)}
                        partnerHandler={(value) => partnerHandler(value, order.id)}
                        partner={partner?.orderId === order.id && partner}
                      />
                      <CardBody
                        receiverName={order.receiverName}
                        address={order.address}
                        product={order.product}
                        anotherButton={(
                          <Button
                            handler={() => processHandler(order.id)}
                            text="Proses Pesanan"
                            disabled={partner?.orderId !== order.id}
                            classes={`w-full py-2 rounded-lg text-sm text-white
                                ${partner?.orderId !== order.id ? 'cursor-default bg-dark4' : 'bg-mainColor'} font-bold`}
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

OrderAcceptedList.defaultProps = {
  partner: null,
};

export default OrderAcceptedList;
