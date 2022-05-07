import React from 'react';
import Upload from '@molecules/modals/Upload';
import Dialog from '@molecules/modals/Dialog';
import CardHeader from '@molecules/common/CardHeader';
import CardBody from '@molecules/common/CardBody';
import CardFooter from '@molecules/common/CardFooter';
import Pagination from '@molecules/common/Pagination';
import OrderEmpty from '@molecules/common/OrderEmpty';
import { ComboBox, Label, Button } from '@atoms/common';
import ModalHistory from '@molecules/modals/History';
import Loader from '@molecules/common/Loader';
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

interface Confirm {
  text: string;
  handlerButtonLeft: () => void;
  handlerButtonRight: () => void;
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
  confirm: Confirm;
  complaint?: any;
  complaints: Array<Complaints>;
  partner: any;
  partners: any;
  isLoader: boolean;
  selectPartner: any;
  orderHistory: any;
  setOrderHistory: any;
  showComplaintImage: boolean;
  complaintData: ComplaintData | null;
  pagination: (meta: any) => void;
  historyOrder: (id: number) => void;
  detailHandler: (id: number) => void;
  imageComplaintHandler: (id: number) => void;
  setShowComplaintImage: (status: boolean) => void;
  complaintHandler: (event: any, id: number) => void;
}

const ComplaintAccepted = (props: Props) => {
  const {
    meta,
    confirm,
    partner,
    partners,
    isLoader,
    complaint,
    pagination,
    complaints,
    historyOrder,
    orderHistory,
    selectPartner,
    detailHandler,
    complaintData,
    setOrderHistory,
    complaintHandler,
    showComplaintImage,
    imageComplaintHandler,
    setShowComplaintImage,
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
        confirm.text !== '' && (
          <Dialog
            text={confirm.text}
            textButtonLeft="Cancel"
            textButtonRight="Process"
            handlerButtonLeft={confirm.handlerButtonLeft}
            handlerButtonRight={confirm.handlerButtonRight}
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
                        tagDate={(item.orderDate !== '-') ? 'Dibayar pada ' : 'Dibuat pada '}
                        orderDate={(item.orderDate !== '-') ? item?.orderDate : item?.createdAt}
                        showHistory
                        showComplaint
                        complaint={complaint}
                        historyHandler={() => historyOrder(item.id)}
                        complaintHandler={(event: any) => complaintHandler(event, item.id)}
                        orderCode={item.orderCode}
                        detailHandler={() => detailHandler(item.id)}
                      />
                      <CardBody
                        address={item.address}
                        receiverName={item.receiverName}
                        showTransactionCode
                        product={item.product}
                        code={item.transactionCode}
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

ComplaintAccepted.defaultProps = {
  complaint: null,
};

export default ComplaintAccepted;
