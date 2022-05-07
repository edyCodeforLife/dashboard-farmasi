import React, { useEffect } from 'react';
import Icon from '@mui/material/Icon';

import ComplaintCombobox from '@atoms/custom/ComplaintCombobox';
import ComboBox from '@atoms/common/ComboBox';
import Button from '@atoms/common/Button';

interface Props {
  tagDate?: string;
  orderDate?: string;
  orderCode?: string;
  detailHandler?: () => void;
  showComplaint?: boolean;
  showDocument?: boolean;
  showHistory?: boolean;
  historyHandler?: () => void;
  showPartner?: boolean;
  complaintHandler?: (event: any) => void;
  partnerHandler?: (id: string) => void;
  partners?: Array<{ label: string, value: string }>;
  partner?: { label: string, value: string, orderId: number };
  complaint?: { label: string, value: string };
}

const CardHeader = (props: Props) => {
  const {
    complaintHandler,
    partnerHandler,
    showComplaint,
    detailHandler,
    showDocument,
    showHistory,
    historyHandler,
    showPartner,
    complaint,
    orderCode,
    partners,
    partner,
    tagDate,
    orderDate,
  } = props;

  return (
    <div className="w-full px-4 flex justify-between items-center text-sm border-b border-solid border-gray-200 py-2 mb-2 rounded-t-lg">
      <div className="flex">
        <Button
          classes="text-mainColor mr-5"
          text={`Order ID : ${orderCode}`}
          handler={detailHandler}
        />
        <div className="text-gray-500">
          {tagDate && <span>{tagDate}</span>}
          {orderDate && <span className="font-bold">{orderDate}</span>}
        </div>
      </div>
      <div className="inline-block flex items-center">
        <div className="inline-block mr-6">
          <ComplaintCombobox
            complaint={complaint}
            showComplaint={showComplaint}
            complaintHandler={complaintHandler}
          />
        </div>
        <div className="inline-block flex items-center">
          {
            showPartner && (
              <ComboBox
                placeholder="Pilih Rumah Sakit"
                option={partner}
                options={partners}
                selectHandler={(value: any) => {
                  if (partnerHandler) partnerHandler(value.value);
                }}
              />
            )
          }
          {
            showHistory && (
              <Button
                icon={<i className="text-mainColor"><Icon>restore_icon</Icon></i>}
                handler={historyHandler}
                classes="ml-5"
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

CardHeader.defaultProps = {
  tagDate: '',
  orderDate: '',
  orderCode: '',
  detailHandler: () => { },
  showComplaint: false,
  showDocument: false,
  showHistory: false,
  historyHandler: () => { },
  showPartner: false,
  partner: null,
  complaint: null,
  partners: [],
  complaintHandler: () => { },
  partnerHandler: () => { },
};

export default CardHeader;
