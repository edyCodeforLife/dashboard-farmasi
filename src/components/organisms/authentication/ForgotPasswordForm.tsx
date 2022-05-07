import React from 'react';
import { useHistory } from 'react-router-dom';

import ModalAlert from '@molecules/modals/Alert';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Input from '@atoms/common/Input';
import Label from '@atoms/common/Label';

interface Props {
  modal: any;
  email: string;
  disabled: boolean;
  submit: () => void;
  setUpCredential: any;
  modalClose: () => void;
}

const ForgotPasswordForm = (props: Props) => {
  const history = useHistory();
  const {
    modal,
    email,
    submit,
    disabled,
    modalClose,
    setUpCredential,
  } = props;

  return (
    <div className="flex-1 w-full">
      <Title text="Lupa kata sandi" classes="text-center text-darker font-bold pt-12 pb-10" />
      <div className="mb-5">
        <p className="text-dark2 text-sm text-center">
          <Label text="Masukkan email akun Anda untuk" />
          <br />
          <Label text="mengatur ulang kata sandi" />
        </p>
      </div>
      <div className="my-2 flex justify-center">
        <div className="w-full inline-block">
          <Input
            value={email}
            type="email"
            placeholder="Tulis Email"
            handler={(event: any) => setUpCredential(event, 'EMAIL')}
            classes="w-full border border-solid border-dark4 py-3 px-3 mt-2 rounded text-base"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Batalkan"
          handler={() => history.push('/login')}
          classes="lg:text-lg mt-4 mr-2 mb-20 text-base rounded border border-solid border-error3 py-2 px-5 text-error3 text-center"
        />
        <Button
          text="Verifikasi"
          disabled={disabled}
          handler={() => submit()}
          classes={`lg:text-lg mt-4 ml-2 mb-20 text-base
          rounded border border-solid py-2 px-5 bg-mainColor active:bg-dark4
          ${disabled && 'bg-dark4'} text-white text-center`}
        />
      </div>
      {modal && <ModalAlert text={modal?.text} type={modal?.type} handler={() => modalClose()} />}
    </div>
  );
};

export default ForgotPasswordForm;
