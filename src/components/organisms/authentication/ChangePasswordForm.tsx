import React from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import ModalAlert from '@molecules/modals/Alert';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Input from '@atoms/common/Input';
import Label from '@atoms/common/Label';

interface InputProps {
  modal: any;
  newPassword: string;
  confirmPassword: string;
  modalClose: any;
  disabled: boolean;
  submit: () => void;
  setUpCredential: any;
}

const ChangePasswordForm = (props: InputProps) => {
  const history = useHistory();

  const {
    modal,
    newPassword,
    submit,
    disabled,
    confirmPassword,
    modalClose,
    setUpCredential,
  } = props;

  return (
    <div className="flex-1 w-full">
      <div className="pt-12 pb-5">
        <Button
          text="kembali"
          icon={<i className="pt-2"><Icon>arrow_back_ios_icon</Icon></i>}
          classesImage="mr-4"
          handler={() => history.push('/verify-code')}
          classes="flex items-center text-lg text-darker font-bold mb-6"
        />
        <Title text="Ubah kata sandi" classes="text-center text-darker font-bold pt-4 pb-3" />
        <div className="mb-0">
          <p className="text-dark2 text-sm text-center">
            <Label text="Masukkan Password baru dan Konfirmasi password" />
            <br />
            <Label text="untuk bisa login kembali" />
          </p>
        </div>
      </div>
      <div className="my-2">
        <Input
          type="password"
          value={newPassword}
          placeholder="Masukkan password baru"
          handler={(event: any) => setUpCredential(event, 'NEW_PASSWORD')}
          classes="w-full border border-solid border-dark4 py-3 px-3 mt-2 rounded text-base"
        />
      </div>
      <div className="my-2 py-2">
        <Input
          type="password"
          value={confirmPassword}
          placeholder="Masukkan konfirmasi password"
          handler={(event: any) => setUpCredential(event, 'CONFIRM_PASSWORD')}
          imageClasses="absolute inset-y-0 my-auto mx-3 right-0"
          classes="w-full border border-solid border-dark4 py-3 px-3 rounded text-base"
        />
      </div>
      <Button
        text="Submit"
        disabled={disabled}
        handler={() => submit()}
        classes={`w-full lg:text-lg mt-4 text-base
        rounded border border-solid py-2 px-5 bg-mainColor active:bg-dark4
        ${disabled && 'bg-dark4'} text-white text-center`}
      />
      {modal && (
        <ModalAlert
          text={modal?.text}
          type={modal?.type}
          handler={() => modalClose()}
        />
      )}
    </div>
  );
};

export default ChangePasswordForm;
