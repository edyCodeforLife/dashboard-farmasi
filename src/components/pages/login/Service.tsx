import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../services/redux/reducer';
import { SetStorage, GetStorage } from '../../../helpers/local-storage';
import ServiceAuthentication from '../../../services/api/ServiceAuthentication';
import errorCatcher from '../../../helpers/error-catcher';

const Service = () => {
  interface Modal {
    type: string;
    text: string;
  }

  const history = useHistory();
  const location = useLocation();
  const storageRole = GetStorage('role');
  const { SubmitLogin } = ServiceAuthentication();
  const fileLocation = 'components/pages/login/Service.tsx';
  const auth: any = useSelector((state: State) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [modal, setModal] = useState<Modal | null>(null);
  const [role, setRole] = useState({ slug: '', text: '' });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const text = {
    MIKA_PHARMACY: 'Mitra Keluarga Farmasi',
    ALTEA_PHARMACY: 'Alteacare Farmasi',
  };

  const modalClose = () => setModal(null);
  const setErrorMessage = (type, message) => setModal({ type, text: message });

  const validation = () => new Promise((resolve: any, reject: any) => {
    if (email === '' && password === '') reject(new Error('Email atau Password tidak boleh kosong!'));
    resolve(true);
  });

  const submit = async () => {
    try {
      await validation();
      const result: any = await SubmitLogin({ email, password, role: role?.slug });
      SetStorage('email', email);
      SetStorage('role', auth?.role);
      SetStorage('access_token', result?.data?.data?.access_token);
      SetStorage('refresh_token', result?.data?.data?.refresh_token);

      if (role?.slug === 'ALTEA_PHARMACY') history.push('/order-unpaid');
      else history.push('/order-processed');
    } catch (error: any) {
      errorCatcher({ error, file: fileLocation, func: 'submit' });
      setErrorMessage('warning', error?.data?.message || error?.message || 'Something Wrong!');
    }
  };

  const setUpCredential = (event: any, from: string) => {
    const key = event?.keyCode || event?.which;
    if (from === 'EMAIL') setEmail(event?.target?.value);
    if (from === 'PASSWORD') setPassword(event?.target?.value);
    if (email !== '' && password !== '' && key === 13) submit();
  };

  useEffect(() => setDisabled(email === '' || password === ''), [email, password]);
  useEffect(() => setRole({
    slug: auth?.role || storageRole,
    text: text[auth?.role || storageRole],
  }), [auth, storageRole]);

  useEffect(() => {
    if (location?.state?.isChangePassword) {
      setModal({ type: 'success', text: 'berhasil mengubah password' });
      history.replace('/login', null);
    }
  }, []);

  useEffect(() => () => {
    setEmail('');
    setModal(null);
    setPassword('');
    setDisabled(false);
    setIsShowPassword(false);
    setRole({ slug: '', text: '' });
  }, []);

  return {
    role,
    modal,
    submit,
    email,
    setEmail,
    password,
    disabled,
    modalClose,
    setPassword,
    isShowPassword,
    setUpCredential,
    setIsShowPassword,
  };
};

export default Service;
