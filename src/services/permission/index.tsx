import { useLocation } from 'react-router-dom';
import { GetStorage } from '../../helpers/local-storage';
import applicationRole from '../../constants/roles.json';

const PermissionComponent = () => {
  const location = useLocation();
  const FilterPartner = () => {
    const findByRoutes: any = applicationRole.find((row: any) => (
      row?.routes === location?.pathname
    ));
    const findByRole: any = findByRoutes?.actions?.find((row: any) => row?.role === GetStorage('role'));
    return findByRole?.action?.includes('FILTER_PARTNER');
  };

  return {
    FilterPartner,
  };
};

export default PermissionComponent;
