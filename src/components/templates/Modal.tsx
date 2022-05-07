import React from 'react';

interface Props {
  children: any;
  classes?: string;
}

const ModalTemplate = (props: Props) => {
  const { children, classes } = props;

  return (
    <div className={`w-full h-full fixed inset-0 flex justify-center z-50 ${classes}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      {children}
    </div>
  );
};

ModalTemplate.defaultProps = {
  classes: 'items-center',
};

export default ModalTemplate;
