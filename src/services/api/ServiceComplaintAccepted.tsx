import { Api } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceComplaintAccepted = () => {
  const dashboardVersion = '/api/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_ECOMMERCE_DASHBOARD_SERVICE_URL}`;
  const urlService = `${url}${dashboardService}${dashboardVersion}`;

  const getComplaintAccepted = (params: any) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-accepted`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
      params: { ...params },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const processComplaint = (id: number) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-accepted/process/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const rejectComplaint = (id: number) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-accepted/reject/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  const refundComplaint = (id: number) => new Promise((resolve: any, reject: any) => {
    Api.get(`${urlService}/complaint-accepted/refund/${id}`, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    rejectComplaint,
    refundComplaint,
    processComplaint,
    getComplaintAccepted,
  };
};

export default ServiceComplaintAccepted;
