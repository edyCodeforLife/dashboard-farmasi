import React from 'react';
import SelectRoleMenu from '@organisms/authentication/SelectRoleMenu';
import Authentication from '@templates/authentication/Authentication';
import Service from './Service';

const Screen = () => {
  const { selectRole } = Service();

  return (
    <Authentication>
      <SelectRoleMenu selectRole={selectRole} />
    </Authentication>
  );
};

export default Screen;
