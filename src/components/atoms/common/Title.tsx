import React from 'react';

interface Props {
  text?: string;
  styles?: object;
  classes?: string;
}

const Title = (props: Props) => {
  const {
    text,
    styles,
    classes,
  } = props;

  return (
    <h1 style={styles || {}} className={classes}>{text}</h1>
  );
};

Title.defaultProps = {
  text: '',
  styles: null,
  classes: '',
};

export default Title;
