import React from 'react';
import Upload from '@molecules/modals/Upload';
import { ComboBox, Label } from '@atoms/common';
import CardBody from '@molecules/common/CardBody';
import ModalHistory from '@molecules/modals/History';
import CardHeader from '@molecules/common/CardHeader';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
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
  hasUploadProof: boolean;
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

interface OrderImage {
  id: string;
  url: string;
}

interface PayloadImage {
  id: number;
  hasUploaded: boolean;
  images: Array<OrderImage>
}

interface Props {
  onChangeCalendar: (value: any) => void;
  date: Array<any>;
  meta: Meta;
  partner: any;
  partners: any;
  disabled: boolean;
  isLoader: boolean;
  openUpload: boolean;
  setOpenUpload: (status: boolean) => void;
  fileHandler: (event: any) => void;
  payloadImage: PayloadImage;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  orders: Array<Orders>;
  submitHandler: () => void;
  pagination: (meta: any) => void;
  historyOrder: (id: number) => void;
  detailHandler: (id: number) => void;
  uploadHandler: (id: number, uploaded: boolean) => void;
}

const OrderRefundList = (props: Props) => {
  const {
    meta,
    orders,
    partner,
    partners,
    disabled,
    isLoader,
    openUpload,
    pagination,
    fileHandler,
    payloadImage,
    historyOrder,
    orderHistory,
    selectPartner,
    detailHandler,
    setOpenUpload,
    uploadHandler,
    submitHandler,
    setOrderHistory,
    onChangeCalendar,
    date,
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
        openUpload && (
          <Upload
            images={payloadImage.images}
            isHiddenUploadFile={payloadImage.hasUploaded}
            disableSubmit={payloadImage.hasUploaded}
            title="Upload Bukti Barang Diterima"
            description="Jenis file dapat berupa .jpg dan .png"
            fileHandler={(event) => fileHandler(event)}
            cancelHandler={() => setOpenUpload(!openUpload)}
            uploadHandler={submitHandler}
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
        {
          !isLoader && orders.length > 0 && (
            <div className="w-full h-full px-3 py-2 absolute inset-0 overflow-y-auto">
              {
                orders.map((item) => (
                  <div key={item.id} className="pt-1 pb-4">
                    <div className="border border-solid border-gray-300 shadow rounded-lg">
                      <CardHeader
                        showHistory
                        tagDate={(item.orderDate !== '-') ? 'Dibayar pada ' : 'Dibuat pada '}
                        orderDate={(item.orderDate !== '-') ? item?.orderDate : item?.createdAt}
                        orderCode={item.orderCode}
                        historyHandler={() => historyOrder(item.id)}
                        detailHandler={() => detailHandler(item.id)}
                      />
                      <CardBody
                        showTransactionCode
                        product={item.product}
                        code={item.transactionCode}
                      />
                      <CardFooter
                        totalPrice={item.totalPrice}
                        showOrderPhoto
                        btnOrderPhotoHandler={() => uploadHandler(item.id, item.hasUploadProof)}
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
      <div className="py-4 px-8 flex justify-center items-center border-t border-gray-200 border-solid shadow bg-white">
        <Pagination
          active={meta?.page}
          disabled={disabled}
          total={meta?.totalPage}
          handler={(value: number) => pagination(value)}
        />
      </div>
    </div>
  );
};

export default OrderRefundList;
