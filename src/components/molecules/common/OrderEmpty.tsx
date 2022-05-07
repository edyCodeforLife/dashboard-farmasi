import React from 'react';

import Title from '@atoms/common/Title';
import { BgEmpty } from '@assets/images';

interface Props {
  text: string;
}

const OrderEmpty = (props: Props) => {
  const { text } = props;

  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <div className="inline-block text-center">
        <img src={BgEmpty} alt="Product Info Empty" className="mx-auto" />
        <Title text={text} classes="text-xl text-dark4 text-center mt-4" />
      </div>
    </div>
  );
};

export default OrderEmpty;
