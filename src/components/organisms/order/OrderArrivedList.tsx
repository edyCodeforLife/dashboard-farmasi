import React from 'react';
import Upload from '@molecules/modals/Upload';
import CardBody from '@molecules/common/CardBody';
import CardHeader from '@molecules/common/CardHeader';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import { ComboBox, Label, Button } from '@atoms/common';
import ModalHistory from '@molecules/modals/History';
import Loader from '@molecules/common/Loader';
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

interface Complaint {
  id: number;
  note: string;
  images: Array<{
    url: string;
    id: string;
  }>;
}

interface Props {
  onChangeCalendar: (value: any) => void;
  date: Array<any>;
  meta: Meta;
  partner: any;
  partners: any;
  isLoader: boolean;
  upload: boolean;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  historyOrder: (id: number) => void;
  orders: Array<Orders>;
  complaint: Complaint;
  cancelUpload: (value: boolean) => void;
  submitHandler: () => void;
  pagination: (meta: any) => void;
  inputHandler: (event: string) => void;
  fileHandler: (event: any) => void;
  complaintHandler: (id: number) => void;
  detailHandler: (id: number) => void;
}

const OrderArrivedList = (props: Props) => {
  const {
    meta,
    orders,
    upload,
    partner,
    partners,
    isLoader,
    complaint,
    pagination,
    fileHandler,
    cancelUpload,
    inputHandler,
    detailHandler,
    selectPartner,
    orderHistory,
    setOrderHistory,
    historyOrder,
    submitHandler,
    complaintHandler,
    date,
    onChangeCalendar,
  } = props;

  return (
    <div className="w-full h-full absolute flex flex-col p-3">
      {
        orderHistory && (
          <ModalHistory
            history={orderHistory}
            handler={() => setOrderHistory(null)}
          />
        )
      }
      {
        upload && (
          <Upload
            title="Upload Bukti Komplain"
            description="Jenis file dapat berupa .jpg dan .png"
            inputPlaceholder="Keluhannya"
            inputValue={complaint.note}
            images={complaint.images}
            fileHandler={(event) => fileHandler(event)}
            inputHandler={(event) => inputHandler(event.target.value)}
            cancelHandler={() => cancelUpload(!upload)}
            uploadHandler={submitHandler}
            withInput
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
                        />
                        <CardFooter
                          totalPrice={order.totalPrice}
                          showComplaintBtn
                          btnComplaintHandler={() => complaintHandler(order.id)}
                        />
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

export default OrderArrivedList;
