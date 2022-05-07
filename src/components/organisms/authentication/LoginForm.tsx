import React from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import ModalAlert from '@molecules/modals/Alert';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Input from '@atoms/common/Input';

interface InputProps {
  role: any;
  modal: any;
  email: string;
  password: string;
  modalClose: any;
  disabled: boolean;
  submit: () => void;
  setUpCredential: any;
  setIsShowPassword: any;
  isShowPassword: boolean;
}

const LoginForm = (props: InputProps) => {
  const history = useHistory();

  const {
    modal,
    email,
    submit,
    role,
    disabled,
    password,
    modalClose,
    setUpCredential,
    isShowPassword,
    setIsShowPassword,
  } = props;

  return (
    <div className="flex-1 w-full">
      <div className="pt-12 pb-10">
        <Button
          text="kembali"
          icon={<i className="pt-2"><Icon>arrow_back_ios_icon</Icon></i>}
          classesImage="mr-4"
          handler={() => history.push('/')}
          classes="flex items-center text-lg text-darker font-bold mb-6"
        />
        <Title text="Anda Masuk Sebagai" classes="text-center text-darker mb-1" />
        <Title text={`(${role?.text})`} classes="text-center text-darker font-bold" />
      </div>
      <div className="my-2">
        <Input
          type="email"
          value={email}
          placeholder="Masukkan Email"
          testid="input-email"
          handler={(event: any) => setUpCredential(event, 'EMAIL')}
          classes="w-full border border-solid border-dark4 py-3 px-3 mt-2 rounded text-base"
        />
      </div>
      <div className="my-2 py-2">
        <Input
          type={isShowPassword ? 'text' : 'password'}
          value={password}
          icon={
            isShowPassword
              ? <i><Icon>visibility_icon</Icon></i>
              : <i><Icon>visibility_off_icon</Icon></i>
          }
          testid="input-password"
          placeholder="Masukkan password"
          handler={(event: any) => setUpCredential(event, 'PASSWORD')}
          imageClasses="absolute inset-y-0 my-auto mx-3 right-0"
          imageHandler={() => setIsShowPassword(!isShowPassword)}
          classes="w-full border border-solid border-dark4 py-3 px-3 rounded text-base"
        />
        <div className="text-right pt-4">
          <Button
            text="Lupa Password ?"
            classes="text-sm text-info1"
            handler={() => history.push('/forgot-password')}
          />
        </div>
      </div>
      <Button
        text="MASUK"
        disabled={disabled}
        handler={() => submit()}
        testid="btn-submit"
        classes={`lg:text-lg mb-20 text-base rounded w-full
        border border-solid py-2 px-3 bg-mainColor active:bg-dark4
        ${disabled && 'bg-dark4'} text-white text-center`}
      />
      {modal && <ModalAlert text={modal?.text} type={modal?.type} handler={() => modalClose()} />}
    </div>
  );
};

export default LoginForm;
