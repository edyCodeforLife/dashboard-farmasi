import React from 'react';
import { Button, Title } from '@atoms/common';

interface Props {
  code: string;
  handlerProcessOrder: () => void;
}

const OrderPickupProcess = (props: Props) => {
  const { code, handlerProcessOrder } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex justify-between items-center">
      <div className="inline-block">
        <Title text="Kode Transaksi" classes="text-dark2 text-xs mb-2" />
        <Title text={code} classes="text-dark2 text-xs" />
      </div>
      <div className="inline-block">
        <Button
          text="Dikirim"
          handler={() => handlerProcessOrder()}
          classes="w-full py-2 px-5 rounded-lg text-sm text-white bg-mainColor font-bold"
        />
      </div>
    </div>
  );
};

export default OrderPickupProcess;
