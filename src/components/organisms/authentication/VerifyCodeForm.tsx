import React from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import ModalAlert from '@molecules/modals/Alert';
import Button from '@atoms/common/Button';
import Input from '@atoms/common/Input';
import Label from '@atoms/common/Label';

interface Props {
  modal: any;
  code: string;
  resendOtp: () => void;
  disabled: boolean;
  submit: () => void;
  setUpCredential: any;
  modalClose: () => void;
}

const VerifyCodeForm = (props: Props) => {
  const history = useHistory();

  const {
    code,
    modal,
    submit,
    disabled,
    resendOtp,
    modalClose,
    setUpCredential,
  } = props;

  return (
    <div className="flex-1 w-full">
      <div className="pt-12 pb-10">
        <Button
          text="kembali"
          classesImage="mr-4"
          icon={<i className="pt-2"><Icon>arrow_back_ios_icon</Icon></i>}
          handler={() => history.push('/forgot-password')}
          classes="flex items-center text-lg text-darker font-bold mb-6"
        />
        <p className="text-dark2 text-sm text-center">
          <Label text="Masukkan kode verifikasi yang sudah" />
          <br />
          <Label text="dikirimkan ke email Anda" />
        </p>
      </div>
      <div className="my-2 flex justify-center">
        <div className="w-3/5 inline-block">
          <Input
            value={code}
            type="text"
            placeholder="Tulis kode verifikasi"
            handler={(event: any) => setUpCredential(event, 'CODE')}
            classes="w-full border border-solid border-dark4 py-3 px-3 mt-2 rounded text-base"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Submit"
          disabled={disabled}
          handler={() => submit()}
          classes={`lg:text-lg mt-4 text-base
          rounded border border-solid py-2 px-5 bg-mainColor active:bg-dark4
          ${disabled && 'bg-dark4'} text-white text-center`}
        />
      </div>
      <div className="mt-5 mb-20 text-center">
        <Label text="Tidak Menerima Email ? " classes="text-sm" />
        <Button handler={() => resendOtp()} text="Kirim Ulang" classes="text-mainColor text-sm font-bold" />
      </div>
      {modal && <ModalAlert text={modal?.text} type={modal?.type} handler={() => modalClose()} />}
    </div>
  );
};

export default VerifyCodeForm;
