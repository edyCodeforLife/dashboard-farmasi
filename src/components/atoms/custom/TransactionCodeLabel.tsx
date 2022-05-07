import React from 'react';
import {
  Title,
  Label,
  Button,
  ComboBox,
  Input,
} from '../common';

interface TrxCode {
  label: string;
  placeholder: string;
}

interface Props {
  code?: string;
}

const TransactionCodeLabel = (props: Props) => {
  const { code } = props;

  return (
    <div className="w-7/12 pr-8">
      <Title text="Kode Transaksi" classes="text-dark2 text-xs mb-2" />
      <Title text={code} classes="text-dark2 text-xs mb-2" />
    </div>
  );
};

TransactionCodeLabel.defaultProps = {
  code: '',
};

export default TransactionCodeLabel;
