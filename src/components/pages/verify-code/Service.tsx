import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ServiceAuthentication from '@services/api/ServiceAuthentication';
import errorCatcher from '@helpers/error-catcher';

const Service = () => {
  interface Modal {
    type: string;
    text: string;
  }

  const history = useHistory();
  const location = useLocation();
  const fileLocation = 'components/pages/verify-code/Service.tsx';

  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [modal, setModal] = useState<Modal | null>(null);

  const { SubmitVerifyCode, SubmitForgotPassword } = ServiceAuthentication();

  const modalClose = () => setModal(null);
  const setModalMessage = (type: string, message: string) => setModal({ type, text: message });

  const validation = () => new Promise((resolve: any, reject: any) => {
    if (code === '') reject(new Error('Kode verifikasi tidak boleh kosong!'));
    resolve(true);
  });

  const submit = async () => {
    try {
      await validation();
      const result: any = await SubmitVerifyCode({ otp: code, email: location?.state?.email });
      history.push({
        pathname: '/change-password',
        state: {
          accessToken: result?.data?.data?.access_token || '',
        },
      });
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submit' });
      setModalMessage('warning', error?.data?.message || error?.message);
    }
  };

  const resendOtp = async () => {
    try {
      const result: any = await SubmitForgotPassword(location?.state?.email);
      if (result?.data?.status) {
        setModalMessage('success', 'Berhasil mengirim ulang email');
      }
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'resendOtp' });
      setModalMessage('warning', error?.data?.message || error?.message);
    }
  };

  const setUpCredential = (event: any, from: string) => {
    const key = event.keyCode || event.which;
    if (from === 'CODE') setCode(event.target.value);
    if (code !== '' && key === 13) submit();
  };

  useEffect(() => setDisabled(code === ''), [code]);
  useEffect(() => () => {
    setCode('');
    setDisabled(true);
    setModal(null);
  }, []);

  return {
    code,
    modal,
    submit,
    setCode,
    disabled,
    resendOtp,
    modalClose,
    setUpCredential,
  };
};

export default Service;
