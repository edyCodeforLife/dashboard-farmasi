import React from 'react';
import Authentication from '@templates/authentication/Authentication';
import ChangePasswordForm from '@organisms/authentication/ChangePasswordForm';
import Service from './Service';

const ChangePassword = () => {
  const {
    modal,
    params,
    submit,
    disabled,
    modalClose,
    setUpCredential,
  } = Service();

  return (
    <Authentication>
      <ChangePasswordForm
        modal={modal}
        submit={submit}
        disabled={disabled}
        modalClose={modalClose}
        newPassword={params?.newPassword || ''}
        confirmPassword={params?.confirmPassword || ''}
        setUpCredential={(event: any, from: string) => setUpCredential(event, from)}
      />
    </Authentication>
  );
};

export default ChangePassword;
