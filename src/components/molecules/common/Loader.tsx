import React from 'react';
import { IconLoading } from '@assets/images';

interface Props {
  classes?: string;
}

const Loader = (props: Props) => {
  const { classes } = props;

  return (
    <div className={`w-full h-full flex flex-wrap items-center justify-center ${classes}`}>
      <img src={IconLoading} alt="Loading Icon" className="w-20" />
    </div>
  );
};

Loader.defaultProps = {
  classes: '',
};

export default Loader;
