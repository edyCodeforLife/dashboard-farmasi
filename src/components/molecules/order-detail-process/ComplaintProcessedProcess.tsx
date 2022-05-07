import React from 'react';
import { Button } from '@atoms/common';

interface Props {
  handlerProcessOrder: () => void;
}

const ComplaintProcessedProcess = (props: Props) => {
  const { handlerProcessOrder } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex justify-end items-center">
      <div className="inline-block">
        <Button
          text="Komplain Selesai"
          handler={() => handlerProcessOrder()}
          classes="w-full py-2 px-5 rounded-lg text-sm text-white bg-mainColor font-bold"
        />
      </div>
    </div>
  );
};

export default ComplaintProcessedProcess;
