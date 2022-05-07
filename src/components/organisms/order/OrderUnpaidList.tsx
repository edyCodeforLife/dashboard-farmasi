import React from 'react';

import PanelTitlePageList from '@molecules/common/PanelTitlePageList';
import CardHeader from '@molecules/common/CardHeader';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import ModalHistory from '@molecules/modals/History';
import CardBody from '@molecules/common/CardBody';
import Loader from '@molecules/common/Loader';

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
  meta: Meta;
  orders: Array<Orders>;
  isLoader: boolean;
  pagination: (meta: any) => void;
  detailHandler: (id: number) => void;
  orderHistory: any;
  setOrderHistory: any;
  historyOrder: (id: number) => void;
}

const OrderUnpaid = (props: Props) => {
  const {
    meta,
    orders,
    isLoader,
    pagination,
    detailHandler,
    orderHistory,
    setOrderHistory,
    historyOrder,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-3">
      { orderHistory && (
        <ModalHistory
          history={orderHistory}
          handler={() => setOrderHistory(null)}
        />
      )}
      <PanelTitlePageList text="Informasi Produk" />
      <div className="flex-1 max-h-full relative bg-white">
        {
          !isLoader && orders.length > 0 && (
            <div className="w-full h-fit px-3 py-2 absolute inset-0 overflow-y-auto">
              {
                orders.map((order) => (
                  <div key={order.id} className="pt-1 pb-4">
                    <div className="border border-solid border-gray-300 shadow rounded-lg">
                      <CardHeader
                        showHistory
                        tagDate="Dibuat pada "
                        orderDate={order.createdAt}
                        historyHandler={() => historyOrder(order.id)}
                        orderCode={order.orderCode}
                        detailHandler={() => detailHandler(order.id)}
                      />
                      <CardBody
                        receiverName={order.receiverName}
                        address={order.address}
                        showButtonDetail
                        detailHandler={() => detailHandler(order.id)}
                        product={order.product}
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

export default OrderUnpaid;
