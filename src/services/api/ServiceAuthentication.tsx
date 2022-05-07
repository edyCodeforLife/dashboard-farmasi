import { Api } from '../../helpers/axios';

const ServiceAuthentication = () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const userService = `${process.env.REACT_APP_API_USER_URL}`;
  const baseURL = `${url}${userService}`;

  const SubmitLogin = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.post(`${baseURL}/auth/login`, {
      ...params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const SubmitForgotPassword = (email: string) => new Promise((resolve: any, reject: any) => {
    Api.post(`${baseURL}/password/forgot`, {
      email,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const SubmitVerifyCode = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.post(`${baseURL}/password/verify`, {
      ...params,
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const SubmitChangePassword = (params: any, accessToken: string) => (
    new Promise((resolve: any, reject: any) => {
      Api.post(`${baseURL}/password/change`, {
        ...params,
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error?.response || error || 'Something Wrong!');
      });
    })
  );

  return {
    SubmitLogin,
    SubmitVerifyCode,
    SubmitForgotPassword,
    SubmitChangePassword,
  };
};

export default ServiceAuthentication;
