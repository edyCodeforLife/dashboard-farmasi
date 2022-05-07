import React from 'react';
import { ComboBox, Button } from '@atoms/common';

interface Props {
  partner: any;
  handlerProcessOrder: () => void;
  selectPartner: (id: number) => void;
  partners: Array<{ label: string, value: string }>;
}

const OrderAcceptedProcess = (props: Props) => {
  const {
    partner,
    partners,
    selectPartner,
    handlerProcessOrder,
  } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex justify-between items-center">
      <div className="w-60">
        <ComboBox
          placeholder="Pilih Rumah Sakit"
          option={partner}
          options={partners}
          selectHandler={(value: any) => selectPartner(value.value)}
        />
      </div>
      <div className="inline-block">
        <Button
          disabled={partner === null}
          handler={() => handlerProcessOrder()}
          text="Proses Pesanan"
          classes={`w-full py-2 px-5 rounded-lg text-sm text-white
          ${partner === null ? 'cursor-default bg-dark4' : 'bg-mainColor'} font-bold`}
        />
      </div>
    </div>
  );
};

export default OrderAcceptedProcess;
