import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';

import searchKeyword from '@services/redux/order/action-creator';
import { GetStorage, SetStorage } from '@helpers/local-storage';
import applicationMenu from '@constants/sidebarMenu.json';
import SidebarMenu from '@molecules/common/SidebarMenu';
import applicationRole from '@constants/roles.json';
import { State } from '@services/redux/reducer';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Input from '@atoms/common/Input';

const Sidebar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Executor = bindActionCreators(searchKeyword, dispatch);
  const searchByKeyword = useSelector((state: State) => state.searchByKeyword);

  const [keyword, setKeyword] = useState('');

  const condition = (routes: string) => {
    const findByRoutes: any = applicationRole.find((row) => row.routes === routes);
    const findByRole: any = findByRoutes?.role?.find((row: string) => row === GetStorage('role'));
    if (!findByRole) { return false; }
    return true;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      Executor({ keyword, reset: false });
    }, 700);

    return () => clearTimeout(timeout);
  }, [keyword]);

  useEffect(() => () => {
    setKeyword('');
    Executor({ reset: true });
  }, []);

  const parentHandler = (url, slug) => {
    SetStorage('slug', slug);
    history.push(url);
  };

  return (
    <div className="side-bar h-full border-r border-solid border-gree-200 bg-white shadow relative" style={{ width: '15%' }}>
      <div className="flex flex-col absolute inset-0 w-full h-full">
        <div className="my-6 px-4">
          <Title text="Search Order ID" classes="text-sm mb-1" />
          <Input
            value={keyword}
            handler={(event: any) => setKeyword(event.target.value)}
            placeholder="Masukkan Order ID"
            classes="w-full text-xs rounded px-3 py-2 border-solid border border-gray-300"
          />
        </div>
        <div className="overflow-y-scroll scroll-green overflow-x-hidden flex-1">
          {
            applicationMenu.map((parent: any, id: number) => {
              if (parent.children.length > 0) {
                return (
                  <div key={parent.slug}>
                    <Button
                      text={parent.text}
                      icon={<i className="pr-5"><Icon>inventory2_icon</Icon></i>}
                      classesImage="mr-4"
                      handler={() => parentHandler(parent.route, parent.slug)}
                      classes={`w-full text-left px-6 py-3.5 ${GetStorage('slug') === parent.slug ? 'bg-darker' : 'bg-dark4'} text-white flex`}
                    />
                    <div className="px-4 h-full">
                      {
                        parent.children.map((children: any, idx: number) => (
                          <div key={children.slug}>
                            <SidebarMenu
                              isShow={condition(children.route)}
                              route={children.route}
                              text={children.text}
                              isLastRow={parent.children.length === (idx + 1)}
                              handler={() => SetStorage('slug', parent.slug)}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                );
              }

              return (
                <div key={parent.slug}>
                  <Button
                    text={parent.text}
                    icon={<i className="pr-5"><Icon>inventory2_icon</Icon></i>}
                    classesImage="mr-4"
                    handler={() => parentHandler(parent.route, parent.slug)}
                    classes={`w-full text-left px-6 py-3.5 mb-0.5 ${GetStorage('slug') === parent.slug ? 'bg-darker' : 'bg-dark4'} text-white flex`}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
