import React from 'react';
import {
  Title,
  Label,
  Button,
  Input,
  ComboBox,
} from '../common';

interface TrxCode {
  label: string;
  placeholder: string;
}

interface Props {
  transactionCode?: TrxCode;
  inputHandler?: (val: string) => void;
  code?: string;
}

const TransactionCode = (props: Props) => {
  const {
    code,
    inputHandler,
    transactionCode,
  } = props;

  return (
    <div className="w-7/12 pr-8">
      {transactionCode && (
        <>
          <Title text={transactionCode?.label} classes="text-dark2 text-xs mb-2" />
          <Input
            type="text"
            handler={(event) => {
              if (inputHandler) inputHandler(event.target.value);
            }}
            value={code}
            placeholder={transactionCode?.placeholder}
            classes="w-full text-xs border-b border-solid border-black py-1 focus:outline-none"
          />
        </>
      )}
    </div>
  );
};

TransactionCode.defaultProps = {
  code: '',
  inputHandler: () => { },
  transactionCode: null,
};

export default TransactionCode;
