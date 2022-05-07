import { GetStorage } from '../../helpers/local-storage';

const Private = (to: any, from: any, next: any) => {
  try {
    const role = GetStorage('role');
    const token = GetStorage('access_token');
    const destinationURL = from?.match?.path || '/';

    const condition = (
      destinationURL === '/'
      || destinationURL === '/login'
      || destinationURL === '/forgot-password'
      || destinationURL === '/verify-code'
      || destinationURL === '/change-password'
    );

    if (!token && !condition) next.redirect('/');
    next();
  } catch (error) {
    next.redirect('/');
  }
};

export default Private;
