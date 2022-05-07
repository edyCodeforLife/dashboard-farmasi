import { GetStorage } from '../../helpers/local-storage';
import applicationRole from '../../constants/roles.json';

const conditionPermission = (permission, role) => {
  const actionPermission = permission.actions.find((act) => act.role === role);
  return (
    permission.role.includes(role || '')
    && actionPermission?.action.includes('VIEW')
  );
};

const Roles = (to: any, from: any, next: any) => {
  try {
    let result;
    const role = GetStorage('role');
    const destinationURL = to?.match?.path || '/';

    const url = (
      destinationURL === '/'
      || destinationURL === '/login'
      || destinationURL === '/forgot-password'
      || destinationURL === '/verify-code'
      || destinationURL === '/change-password'
    );

    applicationRole.forEach((permission) => {
      if (permission.routes === destinationURL) {
        const condition = conditionPermission(permission, role);

        if (condition) result = true;
        else result = false;
      }
    });

    if (!url && !result) window?.history?.back();
    next();
  } catch (error) {
    next.redirect('/');
  }
};

export default Roles;
