import React from 'react';
import Upload from '@molecules/modals/Upload';
import CardBody from '@molecules/common/CardBody';
import CardHeader from '@molecules/common/CardHeader';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import ModalHistory from '@molecules/modals/History';
import { ComboBox, Label, Button } from '@atoms/common';
import Loader from '@molecules/common/Loader';
import WindowLoader from '@molecules/modals/WindowLoader';
import PanelTitlePageList from '@molecules/common/PanelTitlePageList';

interface Complaints {
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

interface ComplaintData {
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
  complaints: Array<Complaints>;
  partner: any;
  partners: any;
  disabled: boolean;
  isLoader: boolean;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  complaintData: ComplaintData | null;
  showComplaintImage: boolean;
  pagination: (meta: any) => void;
  historyOrder: (id: number) => void;
  detailHandler: (id: number) => void;
  complaintDoneHandler: (id: number) => void;
  imageComplaintHandler: (id: number) => void;
  setShowComplaintImage: (status: boolean) => void;
}

const ComplaintProcessedList = (props: Props) => {
  const {
    meta,
    partner,
    partners,
    disabled,
    isLoader,
    pagination,
    complaints,
    historyOrder,
    orderHistory,
    complaintData,
    selectPartner,
    detailHandler,
    setOrderHistory,
    showComplaintImage,
    complaintDoneHandler,
    imageComplaintHandler,
    setShowComplaintImage,
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
      {
        showComplaintImage && (
          <Upload
            withInput
            disableInput
            disableSubmit
            disableUpload
            inputPlaceholder="Keluhannya"
            title="Upload Bukti Komplain"
            images={complaintData?.images}
            inputValue={complaintData?.note}
            description="Jenis file dapat berupa .jpg dan .png"
            cancelHandler={() => setShowComplaintImage(!showComplaintImage)}
          />
        )
      }
      <PanelTitlePageList
        showDate
        date={date}
        onChangeCalendar={(event) => onChangeCalendar(event)}
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
          !isLoader && complaints.length > 0 && (
            <div className="w-full h-full px-3 py-2 absolute inset-0 overflow-y-auto">
              {
                complaints.map((item) => (
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
                        receiverName={item.receiverName}
                        address={item.address}
                        showTransactionCode
                        product={item.product}
                        code={item.transactionCode}
                        anotherButton={(
                          <Button
                            text="Komplain Selesai"
                            handler={() => complaintDoneHandler(item.id)}
                            classes="w-full py-2 rounded-lg text-sm text-white bg-mainColor font-bold"
                          />
                        )}
                      />
                      <CardFooter
                        totalPrice={item.totalPrice}
                        btnPhotoComplaintHandler={() => imageComplaintHandler(item.id)}
                        showComplaintPhoto
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }
        {!isLoader && complaints.length < 1 && <OrderEmpty text="Belum ada pesanan yang masuk" />}
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

export default ComplaintProcessedList;
