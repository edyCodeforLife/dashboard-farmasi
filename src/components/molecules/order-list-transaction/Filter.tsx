import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import ComboBoxFilter from '@atoms/custom/ComboBoxFilter';
import DatePicker from '@atoms/common/DatePicker';
import Button from '@atoms/common/Button';
import Input from '@atoms/common/Input';
import moment from 'moment';

interface TransactionTime {
  startDate: string;
  endDate: string;
}

interface Props {
  loading: boolean;
  createdDate: TransactionTime;
  trxDate: TransactionTime;
  exportToExcel: () => void;
  orderId: string;
  setOrderId: (event: any) => void;
  shippingPrice: string;
  setShippingPrice: (event: any) => void;
  originPrice: string;
  setOriginPrice: (event: any) => void;
  salePrice: string;
  setSalePrice: (event: any) => void;
  discount: string;
  setDiscount: (event: any) => void;
  nettTrans: string;
  setNettTrans: (event: any) => void;
  username: string;
  setUsername: (event: any) => void;
  recipientName: string;
  setRecipientName: (event: any) => void;
  recipientAddress: string;
  setRecipientAddress: (event: any) => void;
  medicine: string;
  setMedicine: (event: any) => void;
  dataPartner: any;
  listDataPartners: Array<{ label: string, value: string }>;
  setPartner: (id: number) => void;
  dataStatus: any;
  listDataStatus: Array<{ label: string, value: string }>;
  setStatus: (id: number) => void;
  dataPaymentMethod: any;
  listDataPaymentMethod: Array<{ label: string, value: string }>;
  setDataPaymentMethod: (id: number) => void;
  setTrx: (val: any) => void;
  setCreated: (val: any) => void;
}

const FilterList = (props: Props) => {
  const {
    loading,
    orderId,
    setOrderId,
    dataStatus,
    listDataStatus,
    setStatus,
    dataPartner,
    listDataPartners,
    setPartner,
    exportToExcel,
    shippingPrice,
    setShippingPrice,
    originPrice,
    setOriginPrice,
    salePrice,
    setSalePrice,
    discount,
    setDiscount,
    username,
    setUsername,
    nettTrans,
    setNettTrans,
    recipientName,
    setRecipientName,
    recipientAddress,
    setRecipientAddress,
    medicine,
    setMedicine,
    trxDate,
    createdDate,
    setTrx,
    setCreated,
    dataPaymentMethod,
    listDataPaymentMethod,
    setDataPaymentMethod,
  } = props;

  const componentComboBox = (key: any, options: any, placeHolder: string, cb: any) => (
    <ComboBoxFilter
      placeholder={placeHolder}
      option={key}
      options={options}
      selectHandler={(value: any) => cb(value)}
    />
  );

  const searchingField = (key: string, placeHolder: string, cb: any, icon?: any, type?: string) => {
    if (icon) {
      return (
        <div className="relative inline-block m-1">
          <Input
            type={type || 'text'}
            value={key}
            icon={icon}
            placeholder={placeHolder}
            handler={(event: any) => cb(event.target.value)}
            imageClasses="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-2 left-3"
            classes={`${type === 'number' ? 'no-spin' : ''} w-full border border-solid border-mainColor py-2 font-thin focus:border-mainColor my-auto text-xs rounded-xl pl-9 pr-2`}
          />
        </div>
      );
    }
    return (
      <div className="relative inline-block m-1">
        <Input
          type={type || 'text'}
          value={key}
          handler={(e) => cb(e.target.value)}
          classes={`${type === 'number' ? 'no-spin' : ''} w-full border border-solid border-mainColor py-2 font-thin focus:border-mainColor my-auto text-xs rounded-xl px-2`}
          placeholder={placeHolder}
        />
      </div>
    );
  };

  return (
    <div className="w-full h-auto grid grid-cols-8 p-1">
      {setOrderId && (
        searchingField(
          orderId,
          'Order ID',
          setOrderId,
          <i className="text-mainColor"><Icon>search_icon</Icon></i>,
        )
      )}
      {setStatus && (
        componentComboBox(dataStatus, listDataStatus, 'Status Transaction', setStatus)
      )}
      <DatePicker classes="w-full text-center text-xs border border-solid flex border-mainColor p-2 font-thin focus:border-mainColor my-auto rounded-xl bg-white whitespace-nowrap overflow-hidden" value={[trxDate.startDate, trxDate.endDate]} showIcon={false} maxDate={moment().endOf('month').format('YYYY, MM, DD')} label="Transaction Time" onChangeCalendar={(val: any) => setTrx(val)} />
      <DatePicker classes="w-full text-center text-xs border border-solid flex border-mainColor p-2 font-thin focus:border-mainColor my-auto rounded-xl bg-white whitespace-nowrap overflow-hidden" value={[createdDate.startDate, createdDate.endDate]} showIcon={false} label="Created Time" onChangeCalendar={(val: any) => setCreated(val)} />
      {setDataPaymentMethod && (
        componentComboBox(dataPaymentMethod, listDataPaymentMethod, 'Payment', setDataPaymentMethod)
      )}
      {setShippingPrice && (
        searchingField(shippingPrice, 'Shipping Price', setShippingPrice, null, 'number')
      )}
      {setOriginPrice && (
        searchingField(originPrice, 'Original Price', setOriginPrice, null, 'number')
      )}
      {setSalePrice && (
        searchingField(salePrice, 'Sale Price', setSalePrice, null, 'number')
      )}
      {setDiscount && (
        searchingField(discount, 'Discount', setDiscount, null, 'number')
      )}
      {setNettTrans && (
        searchingField(nettTrans, 'Nett Transaction', setNettTrans, null, 'number')
      )}
      {setUsername && (
        searchingField(
          username,
          'User Name',
          setUsername,
          <i className="text-mainColor"><Icon>search_icon</Icon></i>,
        )
      )}
      {setRecipientName && (
        searchingField(
          recipientName,
          'Recipient`s Name',
          setRecipientName,
          <i className="text-mainColor"><Icon>search_icon</Icon></i>,
        )
      )}
      {setRecipientAddress && (
        searchingField(
          recipientAddress,
          'Recipient’s Address',
          setRecipientAddress,
          <i className="text-mainColor"><Icon>search_icon</Icon></i>,
        )
      )}
      {setPartner && (
        componentComboBox(dataPartner, listDataPartners, 'Hospital', setPartner)
      )}
      {setMedicine && (
        searchingField(
          medicine,
          'Medicine',
          setMedicine,
          <i className="text-mainColor"><Icon>search_icon</Icon></i>,
        )
      )}
      <div className="relative inline-block m-1">
        <Button
          text={loading ? 'Loading...' : 'Export'}
          handler={exportToExcel}
          disabled={loading}
          classes={`w-full border rounded-xl ${loading ? 'bg-dark4' : 'bg-mainColor'} text-white font-bold text-xs py-2`}
        />
      </div>
    </div>
  );
};

export default FilterList;
