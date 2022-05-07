import React, { ReactNode } from 'react';

interface Props {
  type?: string,
  value?: string,
  image?: string,
  styles?: object,
  classes?: string,
  disabled?: boolean,
  placeholder?: string,
  handler?: (evt: any) => void,
  imageClasses?: string,
  imageHandler?: () => void,
  icon?: ReactNode;
  testid?: string;
}

const Input = (props: Props) => {
  const {
    icon,
    type,
    value,
    image,
    styles,
    handler,
    classes,
    disabled,
    placeholder,
    imageHandler,
    imageClasses,
    testid,
  } = props;

  return (
    <div className="relative w-full" style={styles || {}}>
      {
        image !== ''
          ? (
            <div tabIndex={0} role="button" onClick={imageHandler} onKeyPress={imageHandler}>
              <img src={image} alt={type} className={imageClasses} />
            </div>
          )
          : ''
      }
      {
        icon
          ? (
            <div
              tabIndex={0}
              className={imageClasses || 'absolute inset-y-0 my-auto mx-3 right-0 py-3'}
              role="button"
              onClick={imageHandler}
              onKeyPress={imageHandler}
            >
              {icon}
            </div>
          ) : ''
      }
      <input
        type={type}
        value={value}
        onPaste={handler}
        onChange={handler}
        disabled={disabled}
        className={classes}
        onKeyPress={handler}
        placeholder={placeholder}
        autoComplete="off"
        data-testid={testid}
      />
    </div>
  );
};

Input.defaultProps = {
  image: '',
  value: '',
  classes: '',
  type: 'text',
  styles: null,
  disabled: false,
  placeholder: '',
  imageClasses: '',
  handler: () => { },
  imageHandler: () => { },
  icon: <i />,
  testid: '',
};

export default Input;
