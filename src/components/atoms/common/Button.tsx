import React, { ReactNode } from 'react';

interface Props {
  text?: string;
  image?: string;
  styles?: object;
  classes?: string;
  disabled?: boolean;
  handler?: () => void;
  classesImage?: string;
  icon?: ReactNode;
  testid?: string;
}

const Button = (props: Props) => {
  const {
    text,
    image,
    styles,
    handler,
    classes,
    disabled,
    classesImage,
    icon,
    testid,
  } = props;

  return (
    <button data-testid={testid} onClick={handler} className={classes} style={styles || {}} disabled={disabled} type="button">
      {
        image !== ''
          ? <img src={image} alt="button" className={classesImage} />
          : ''
      }
      {icon}
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: '',
  image: '',
  classes: '',
  styles: null,
  disabled: false,
  classesImage: '',
  handler: () => { },
  icon: <i />,
  testid: '',
};

export default Button;
