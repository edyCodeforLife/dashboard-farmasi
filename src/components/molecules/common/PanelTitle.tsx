import React from 'react';
import Icon from '@mui/material/Icon';

import Button from '@atoms/common/Button';
import Label from '@atoms/common/Label';

interface Props {
  text?: string;
  handler?: () => void;
}

const PanelTitle = (props: Props) => {
  const { text, handler } = props;

  return (
    <div className="py-3.5 px-6 bg-mainColor text-white font-bold rounded-t-lg flex justify-between items-center">
      <Label text={text} />
      {handler?.toString() !== '() => {}' && <Button icon={<i className="text-white"><Icon>close_icon</Icon></i>} handler={handler} />}
    </div>
  );
};

PanelTitle.defaultProps = {
  text: '',
  handler: () => { },
};

export default PanelTitle;
