import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import { GetStorage, RemoveStorage } from '@helpers/local-storage';
import Button from '@atoms/common/Button';

import { Logo } from '@assets/images';

const Navbar = () => {
  const history = useHistory();
  const [initial, setInitial] = useState(null);

  const logout = () => {
    RemoveStorage('access_token');
    RemoveStorage('refresh_token');
    RemoveStorage('email');
    RemoveStorage('role');
    history.push('/');
  };

  useEffect(() => {
    const name: string = (GetStorage('email') || GetStorage('role')) || '';
    if (name !== '') {
      const identity: any = name.split('@');
      const initialDefault: string[] = [];
      identity?.forEach((item: any) => {
        initialDefault.push(item?.charAt(0));
      });
      const initialName: any = initialDefault.join('');
      setInitial(initialName.toUpperCase());
    }
  }, []);

  return (
    <nav className="flex w-full items-center px-6 py-3 shadow border-b border-solid border-grey-300 h-auto bg-white">
      <Button
        image={Logo}
        classes="w-28 my-auto mr-auto"
        handler={() => history.push('/order-unpaid')}
      />
      <div className="flex items-center ml-auto">
        <div className="group inline-block relative cursor-pointer hover:bg-subtle p-1 rounded-full">
          <div className="inline w-6 h-6 flex items-center rounded-full text-white" style={{ backgroundColor: '#3E8CB9' }}>
            <span className="text-xs m-auto">{initial}</span>
          </div>
          <div className="absolute hidden group-hover:block left-0 z-30 -ml-32">
            <div className="border border-solid mt-2 text-sm w-40 py-2 bg-white shadow rounded-lg" style={{ color: '#2C528B' }}>
              <Button
                text="Logout"
                icon={<i><Icon fontSize="small">arrow_forward_ios_icon</Icon></i>}
                classesImage="inline"
                handler={() => logout()}
                classes="w-full pl-8 pr-5 py-2 hover:bg-gray-200 flex flex-row-reverse justify-between items-center font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
