import React from 'react';
import Icon from '@mui/material/Icon';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface Props {
  title?: string;
  description?: string;
  time?: string;
  closeHandler?: () => void;
  openHandler?: () => void;
}

const Notification = (props: Props) => {
  const {
    title,
    time,
    description,
    openHandler,
    closeHandler,
  } = props;

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={openHandler}
      onKeyPress={openHandler}
      className="absolute top-0 z-10 right-0 h-full w-96"
    >
      <div className="px-5 py-5 h-full w-full flex overflow-y-auto flex-wrap items-end">
        <div className="w-full shadow flex flex-row py-2 mb-2" style={{ backgroundColor: '#F0F6FF' }}>
          <div className="icon px-5 py-10">
            <i className="text-mainColor"><Icon>shopping_cart_icon</Icon></i>
          </div>
          <div className="content flex-1">
            <div className="text-sm pb-2 text-darker font-bold">{title}</div>
            <div className="text-sm">{description}</div>
            <div className="text-sm pt-3 pb-4">{time}</div>
          </div>
          <div
            role="button"
            tabIndex={-1}
            onClick={closeHandler}
            onKeyPress={closeHandler}
            className="close px-5 pt-5"
          >
            <i className="text-red-500"><Icon>close_icon</Icon></i>
          </div>
        </div>
      </div>
    </div>
  );
};

Notification.defaultProps = {
  title: '',
  description: '',
  time: '',
  openHandler: () => { },
  closeHandler: () => { },
};

export default Notification;
