import { Api } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceComplaintProcessed = () => {
  const dashboardVersion = '/api/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_ECOMMERCE_DASHBOARD_SERVICE_URL}`;
  const urlService = `${url}${dashboardService}${dashboardVersion}`;

  const getComplaintProcessed = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-processed`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
      params: { ...params },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const completedComplaint = (id: number) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-processed/completed/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    completedComplaint,
    getComplaintProcessed,
  };
};

export default ServiceComplaintProcessed;
