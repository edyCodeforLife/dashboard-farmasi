import React, { ReactNode } from 'react';
import ServicePreviewImage from '@helpers/preview-image';

import {
  TransactionCode as Code,
  TransactionCodeLabel as CodeLabel,
} from '@atoms/custom';

import {
  Title,
  Label,
  Button,
  ComboBox,
  Input,
} from '@atoms/common';

interface Product {
  id: string;
  name: string;
  actualPrice: string;
  price: string;
  total: number;
  images: string;
}

interface TransactionCode {
  label: string;
  placeholder: string;
}

interface Props {
  receiverName?: string;
  address?: string;
  product?: Product;
  totalPrice?: string;
  transactionCode?: TransactionCode;
  inputHandler?: (val: string) => void;
  showButtonDetail?: boolean;
  showTransactionCode?: boolean;
  detailHandler?: () => void;
  anotherButton?: ReactNode;
  code?: string;
}

const CardBody = (props: Props) => {
  const { HandlerPreviewImage } = ServicePreviewImage();
  const {
    code,
    product,
    totalPrice,
    inputHandler,
    anotherButton,
    detailHandler,
    transactionCode,
    showButtonDetail,
    showTransactionCode,
    address,
    receiverName,
  } = props;

  return (
    <div className="w-full px-4 flex py-2">
      <div className="w-4/6 flex justify-start items-start">
        <div className="w-2/5 flex flex-row items-start">
          <Button
            classes="w-20 h-20"
            image={product?.images}
            classesImage="w-full h-full object-cover"
            handler={() => HandlerPreviewImage(product?.images || '')}
          />
          <div className="flex-1 pl-4 pr-3">
            <Title text={product?.name} classes="text-dark1 mb-2" />
            <Title text={product?.total !== 1 ? `1 produk dan ${(product?.total || 0) - 1 || 0} produk lainnya` : '1 produk'} classes="text-dark3 text-xs mb-2" />
            {/* <Title text={totalPrice} classes="text-dark3 text-xs mt-2" /> */}
          </div>
        </div>
        <div className="w-3/5 px-3 flex flex-wrap content-start">
          <div className="w-full">
            <Title text={receiverName || '-'} classes="text-dark1 mb-2 capitalize" />
          </div>
          <div className="w-full">
            <Title text={address || '-'} classes="text-dark3 text-xs mb-2" />
          </div>
          {/* <div className="w-full">
            <Title text="Harga Detail AlteaCare" classes="text-info1 mb-2" />
          </div>
          <div className="pr-2">
            <Title text="Harga Coret (Termasuk PPN)" classes="text-dark3 text-xs mb-1" />
            <Title text={product?.actualPrice} classes="text-dark3 text-xs" />
          </div>
          <div className="pl-2">
            <Title text="Harga Jual AlteaCare (Termasuk PPN)" classes="text-dark3 text-xs mb-1" />
            <Title text={product?.price} classes="text-dark3 text-xs" />
          </div> */}
        </div>
      </div>
      <div className="w-2/6 flex items-center">
        <div className="w-full flex justify-end items-end">
          {showTransactionCode && <CodeLabel code={code} />}
          {
            transactionCode && (
              <Code
                code={code}
                inputHandler={inputHandler}
                transactionCode={transactionCode}
              />
            )
          }
          <div className="w-5/12">
            {
              showButtonDetail && (
                <Button
                  text="Order Detail"
                  handler={() => {
                    if (detailHandler) detailHandler();
                  }}
                  classes="w-full py-2 rounded-lg text-sm text-white bg-darker font-bold"
                />
              )
            }
            {anotherButton}
          </div>
        </div>
      </div>
    </div>
  );
};

CardBody.defaultProps = {
  receiverName: null,
  address: null,
  product: null,
  totalPrice: '',
  transactionCode: null,
  showButtonDetail: false,
  showTransactionCode: false,
  inputHandler: () => { },
  detailHandler: () => { },
  anotherButton: <div />,
  code: '',
};

export default CardBody;
