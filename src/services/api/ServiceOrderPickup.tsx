import { Api } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceOrderPickup = () => {
  const dashboardVersion = '/api/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_ECOMMERCE_DASHBOARD_SERVICE_URL}`;
  const urlService = `${url}${dashboardService}${dashboardVersion}`;

  const getOrderPickup = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/order-pickup`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
      params: { ...params },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const sendOrder = (id: number) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/order-pickup/send/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    sendOrder,
    getOrderPickup,
  };
};

export default ServiceOrderPickup;
