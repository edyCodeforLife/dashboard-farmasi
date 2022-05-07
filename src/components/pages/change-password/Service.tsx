import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ServiceAuthentication from '@services/api/ServiceAuthentication';
import errorCatcher from '@helpers/error-catcher';

const Service = () => {
  interface ChangePassword {
    newPassword: string,
    confirmPassword: string,
  }

  interface Modal {
    type: string;
    text: string;
  }

  const history = useHistory();
  const location = useLocation();
  const [disabled, setDisabled] = useState(true);
  const [modal, setModal] = useState<Modal | null>(null);
  const [params, setParams] = useState<ChangePassword | null>(null);

  const { SubmitChangePassword } = ServiceAuthentication();

  const modalClose = () => setModal(null);
  const setErrorMessage = (type: string, message: string) => setModal({ type, text: message });
  const fileLocation = 'components/pages/change-password/Service.tsx';

  const validation = () => new Promise((resolve: any, reject: any) => {
    if (params?.newPassword === '') reject(new Error('Password baru tidak boleh kosong!'));
    if (params?.confirmPassword === '') reject(new Error('Konfirmasi password tidak boleh kosong!'));
    resolve(true);
  });

  const submit = async () => {
    try {
      await validation();
      const result: any = await SubmitChangePassword({
        password: params?.newPassword,
        password_confirmation: params?.confirmPassword,
      }, location?.state?.accessToken);
      history.push({ pathname: '/login', state: { isChangePassword: true } });
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submit' });
      setErrorMessage('warning', error?.data?.message || error?.message);
    }
  };

  const setUpCredential = (event: any, from: string) => {
    const key = event.keyCode || event.which;
    const currentParams: any = { ...params };
    if (from === 'NEW_PASSWORD') currentParams.newPassword = event.target.value;
    if (from === 'CONFIRM_PASSWORD') currentParams.confirmPassword = event.target.value;
    setParams(currentParams);
    if (params?.newPassword !== '' && params?.newPassword !== '' && key === 13) submit();
  };

  useEffect(() => {
    setDisabled(!params || (params?.newPassword === '' && params?.confirmPassword === ''));
  }, [params]);

  useEffect(() => {
    if (!location?.state) history.push('/forgot-password');
  }, [location]);

  useEffect(() => () => {
    setParams(null);
  }, []);

  return {
    modal,
    params,
    submit,
    disabled,
    setParams,
    modalClose,
    setUpCredential,
  };
};

export default Service;
