import { ApiFile } from '../../helpers/axios';
import { GetStorage } from '../../helpers/local-storage';

const ServiceUpload = () => {
  const version = '/v1';
  const url = `${process.env.REACT_APP_API_BASE_URL}`;
  const dashboardService = `${process.env.REACT_APP_API_FILE_URL}`;
  const baseUrl = `${url}${dashboardService}${version}`;

  const uploader = (params: any) => new Promise((resolve: any, reject: any) => {
    ApiFile.post(`${baseUrl}/file/upload`, params, {
      headers: { Authorization: `Bearer ${GetStorage('access_token')}` },
    }).then((response: any) => {
      resolve(response?.data?.data);
    }).catch((error: any) => {
      reject(error?.response || error || 'Something Wrong!');
    });
  });

  return {
    uploader,
  };
};

export default ServiceUpload;
