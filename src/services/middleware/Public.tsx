import { GetStorage } from '../../helpers/local-storage';

const Public = (to: any, from: any, next: any) => {
  try {
    const role = GetStorage('role');
    const token = GetStorage('access_token');
    const destinationURL = to?.match?.path || '/';
    const condition = (
      destinationURL === '/'
      || destinationURL === '/login'
      || destinationURL === '/forgot-password'
      || destinationURL === '/verify-code'
      || destinationURL === '/change-password'
    );

    if (token && condition) {
      if (role === 'ALTEA_PHARMACY') next.redirect('/order-unpaid');
      else next.redirect('/order-processed');
    }
    next();
  } catch (error) {
    next.redirect('/');
  }
};

export default Public;
