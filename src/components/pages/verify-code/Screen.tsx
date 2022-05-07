import React from 'react';
import VerifyCodeForm from '@organisms/authentication/VerifyCodeForm';
import Authentication from '@templates/authentication/Authentication';
import Service from './Service';

const VerifyCode = () => {
  const {
    code,
    modal,
    submit,
    disabled,
    resendOtp,
    modalClose,
    setUpCredential,
  } = Service();

  return (
    <Authentication>
      <VerifyCodeForm
        code={code}
        modal={modal}
        submit={submit}
        disabled={disabled}
        resendOtp={() => resendOtp()}
        modalClose={modalClose}
        setUpCredential={(event: any, from: string) => setUpCredential(event, from)}
      />
    </Authentication>
  );
};

export default VerifyCode;
