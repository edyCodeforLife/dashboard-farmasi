import React from 'react';

interface Props {
  text?: string;
  styles?: object;
  classes?: string;
  testid?: string;
}

const Label = (props: Props) => {
  const {
    text,
    styles,
    classes,
    testid,
  } = props;

  return (
    <span data-testid={testid} style={styles || {}} className={classes}>{text}</span>
  );
};

Label.defaultProps = {
  text: '',
  classes: '',
  testid: '',
  styles: null,
};

export default Label;
