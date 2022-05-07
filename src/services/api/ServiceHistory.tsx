import { Api } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceHistory = () => {
  const dashboardVersion = '/api/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_ECOMMERCE_DASHBOARD_SERVICE_URL}`;
  const urlService = `${url}${dashboardService}${dashboardVersion}`;

  const getHistory = (id: any) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/order/history/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    getHistory,
  };
};

export default ServiceHistory;
