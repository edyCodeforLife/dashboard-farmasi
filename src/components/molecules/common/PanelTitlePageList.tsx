import React, { ReactNode, useState } from 'react';
import moment from 'moment';

import Label from '@atoms/common/Label';
import DatePicker from '@atoms/common/DatePicker';
import PermissionComponent from '@services/permission';

interface Props {
  comboBoxComponent?: ReactNode;
  text?: string;
  showDate?: boolean;
  date?: any;
  onChangeCalendar?: (event: any) => void;
}

const PanelTitlePageList = (props: Props) => {
  const { FilterPartner } = PermissionComponent();
  const isShowFilterPartner = FilterPartner();
  const {
    comboBoxComponent,
    text,
    date,
    onChangeCalendar,
    showDate,
  } = props;

  return (
    <div className="py-3.5 px-6 bg-mainColor rounded-t-lg flex justify-between items-center">
      <Label text={text} classes="text-white font-bold" />
      <div className="flex flex-row items-center">
        {showDate && (
          <div className="mr-5">
            <DatePicker
              value={date}
              onChangeCalendar={(event) => { if (onChangeCalendar) onChangeCalendar(event); }}
            />
          </div>
        )}
        {isShowFilterPartner && comboBoxComponent}
      </div>
    </div>
  );
};

PanelTitlePageList.defaultProps = {
  text: 'Informasi Produk',
  comboBoxComponent: <div />,
  showDate: false,
  date: [new Date(moment().format('YYYY, MM, DD')), new Date(moment().add(7, 'days').format('YYYY, MM, DD'))],
  onChangeCalendar: () => { },
};

export default PanelTitlePageList;
