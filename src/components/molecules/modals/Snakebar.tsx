import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import Button from '@atoms/common/Button';
import Label from '@atoms/common/Label';

interface Props {
  style?: any;
  type: string;
  message: string;
}

const Snakebar = (props: Props) => {
  const {
    style,
    type,
    message,
  } = props;

  const [closed, setClosed] = useState(false);

  const typeAlertClass = (
    ((type === 'info') && 'bg-error3 text-white')
    || ((type === 'success') && 'bg-successState text-white')
    || ((type === 'error') && 'bg-error3 text-white')
  );

  return (
    <div>
      {
        !closed
          ? (
            <div className={`text-white shadow-lg py-2 px-4 m-2 rounded-lg flex items-center ${typeAlertClass}`}>
              {type === 'info' && <i className="w-4"><Icon>report_icon</Icon></i>}
              {type === 'success' && <i className="w-4"><Icon>check_circle_icon</Icon></i>}
              {type === 'error' && <i className="w-4"><Icon>report_icon</Icon></i>}
              <Label text={message} classes="px-5" />
              <Button
                classesImage="w-3"
                handler={() => setClosed(true)}
                icon={<i><Icon>close_icon</Icon></i>}
              />
            </div>
          ) : <div />
      }
    </div>
  );
};

Snakebar.defaultProps = {
  style: {},
};

export default Snakebar;
