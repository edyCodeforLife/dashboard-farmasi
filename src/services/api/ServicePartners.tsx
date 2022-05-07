import { Api } from '../../helpers/axios';

const ServicePartners = () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const userService = `${process.env.REACT_APP_API_DATA_URL}`;
  const baseURL = `${url}${userService}`;

  const getPartners = () => new Promise((resolve: any, reject: any) => {
    Api.get(`${baseURL}/partners`).then((response) => {
      resolve(response?.data?.data);
    }).catch((error) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    getPartners,
  };
};

export default ServicePartners;
