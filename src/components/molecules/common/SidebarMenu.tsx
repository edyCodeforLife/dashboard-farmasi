import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '@atoms/common';
import { GetStorage } from '@helpers/local-storage';

interface Props {
  text: string;
  route: string;
  isShow: boolean;
  isLastRow: boolean;
  handler: () => void;
}

const SidebarMenu = (props: Props) => {
  const history = useHistory();
  const location = useLocation();
  const {
    text,
    route,
    isShow,
    handler,
    isLastRow,
  } = props;

  const currentUrl: string = GetStorage('currentUrl') || '/';

  const lineStyle = isLastRow
    ? 'w-3 h-3 mr-2 pt-3 pb-2 border-l-2 border-b-2 border-solid border-gray-200 self-start'
    : 'w-3 h-3 mr-1.5 pt-3 pb-2 border-b-2 border-solid border-gray-200 self-start';

  return (
    <div className={`flex items-center ${!isLastRow && 'border-l-2'} ${!isShow && 'hidden'}`}>
      <div className={lineStyle}>&nbsp;</div>
      <Button
        text={text}
        classes={`text-left text-sm pt-3 ${isLastRow ? 'pb-4' : 'pb-2'}
        ${route.includes(currentUrl) ? 'text-darker font-bold' : 'text-dark2'}`}
        handler={() => {
          handler();
          history.push(route);
        }}
      />
    </div>
  );
};

export default SidebarMenu;
