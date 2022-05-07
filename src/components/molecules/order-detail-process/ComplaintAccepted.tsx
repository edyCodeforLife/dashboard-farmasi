import React from 'react';
import { ComboBox, Button } from '@atoms/common';

interface Props {
  complaint: any | null;
  handlerProcessComplaint: () => void;
  selectComplaint: (event: any) => void;
  complaints: Array<{ label: string, value: string }>;
}

const ComplaintAccepted = (props: Props) => {
  const {
    complaint,
    complaints,
    selectComplaint,
    handlerProcessComplaint,
  } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex justify-between items-center">
      <div className="w-60">
        <ComboBox
          direction="top"
          placeholder="Pilih Jenis Komplain"
          option={complaint}
          options={complaints}
          selectHandler={(event: any) => selectComplaint(event)}
        />
      </div>
      <div className="inline-block">
        <Button
          disabled={!complaint}
          handler={handlerProcessComplaint}
          text="Lanjutkan"
          classes={`w-full py-2 px-5 rounded-lg text-sm text-white
          ${!complaint ? 'cursor-default bg-dark4' : 'bg-mainColor'} font-bold`}
        />
      </div>
    </div>
  );
};

export default ComplaintAccepted;
