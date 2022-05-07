import React from 'react';
import Icon from '@mui/material/Icon';

import Button from '@atoms/common/Button';
import Label from '@atoms/common/Label';

interface Props {
  text: string;
  type?: string;
  handler: () => void;
}

const ModalAlert = (props: Props) => {
  const { text, type, handler } = props;
  const typeAlert = (
    ((type === 'warning') && 'bg-error3 text-white')
    || ((type === 'success') && 'bg-successState text-white')
  );
  const parentClass = `absolute z-10 bottom-0 inset-x-0
   px-6 py-3 shadow rounded-b-lg flex justify-between items-center ${typeAlert}`;

  return (
    <div role="alert" className={parentClass}>
      <div className="flex items-center">
        {type === 'warning' && <i className="h-5 mr-4"><Icon>report_icon</Icon></i>}
        {type === 'success' && <i className="h-5 mr-4"><Icon>check_circle_icon</Icon></i>}
        <Label text={text} />
      </div>
      <Button handler={handler} icon={<i><Icon>close_icon</Icon></i>} />
    </div>
  );
};

ModalAlert.defaultProps = {
  type: '',
};

export default ModalAlert;
