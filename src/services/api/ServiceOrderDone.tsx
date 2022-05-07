import { Api } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceOrderDone = () => {
  const dashboardVersion = '/api/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_ECOMMERCE_DASHBOARD_SERVICE_URL}`;
  const urlService = `${url}${dashboardService}${dashboardVersion}`;

  const getOrderDone = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/order-done`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
      params: { ...params },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const uploadProof = (params: any, id: number) => new Promise((resolve: any, reject: any) => {
    Api.post(`${urlService}/order-done/upload/${id}`, params, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    uploadProof,
    getOrderDone,
  };
};

export default ServiceOrderDone;
