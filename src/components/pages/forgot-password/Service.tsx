import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ServiceAuthentication from '@services/api/ServiceAuthentication';
import errorCatcher from '@helpers/error-catcher';

const Service = () => {
  interface Modal {
    type: string;
    text: string;
  }

  const history = useHistory();
  const { SubmitForgotPassword } = ServiceAuthentication();
  const fileLocation = 'components/pages/forgot-password/Service.tsx';

  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [modal, setModal] = useState<Modal | null>(null);

  const modalClose = () => setModal(null);
  const setErrorMessage = (type: string, message: string) => setModal({ type, text: message });

  const validation = () => new Promise((resolve: any, reject: any) => {
    if (email === '') reject(new Error('Email tidak boleh kosong!'));
    resolve(true);
  });

  const submit = async () => {
    try {
      await validation();
      const result: any = await SubmitForgotPassword(email);
      if (result?.data?.status) {
        history.push({
          pathname: '/verify-code',
          state: { email },
        });
      }
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submit' });
      setErrorMessage('warning', error?.data?.message || error?.message);
    }
  };

  const setUpCredential = (event: any, from: string) => {
    const key = event?.keyCode || event?.which;
    if (from === 'EMAIL') setEmail(event?.target?.value);
    if (email !== '' && key === 13) submit();
  };

  useEffect(() => setDisabled(email === ''), [email]);
  useEffect(() => () => {
    setEmail('');
    setDisabled(true);
    setModal(null);
  }, []);

  return {
    modal,
    email,
    submit,
    disabled,
    modalClose,
    setUpCredential,
  };
};

export default Service;
