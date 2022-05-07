import React, { ReactNode } from 'react';

import {
  TransactionCode as Code,
  TransactionCodeLabel as CodeLabel,
} from '@atoms/custom';

interface TransactionCode {
  label: string;
  placeholder: string;
}

interface Props {
  code: string;
  transactionCode: TransactionCode;
  inputHandler: (val: string) => void;
  anotherButton: ReactNode;
}

const OrderProcessedProcess = (props: Props) => {
  const {
    code,
    inputHandler,
    transactionCode,
    anotherButton,
  } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex items-center">
      <Code
        code={code}
        inputHandler={(val: string) => inputHandler(val)}
        transactionCode={transactionCode}
      />
      <div className="w-5/12 flex justify-end items-center">
        <div className="inline-block">
          {anotherButton}
        </div>
      </div>
    </div>
  );
};

export default OrderProcessedProcess;
