import React from 'react';
import ModalTemplate from '@templates/Modal';
import { Title, Button } from '@atoms/common';

interface Props {
  text: string;
  textButtonLeft: string,
  textButtonRight: string,
  handlerButtonLeft?: () => void;
  handlerButtonRight?: () => void;
}

const ModalDialog = (props: Props) => {
  const {
    text,
    textButtonLeft,
    textButtonRight,
    handlerButtonLeft,
    handlerButtonRight,
  } = props;

  return (
    <ModalTemplate>
      <div className="lg:w-2/5 md:w-3/5 w-2/5 py-10 bg-white rounded-lg flex flex-wrap justify-center items-center inline-block">
        <Title text={text} classes="text-center text-xl lg:px-24 md:px-20 px-16" />
        <div className="w-full mt-8 flex justify-center">
          <Button handler={handlerButtonLeft} text={textButtonLeft} classes="bg-dark4 text-white py-2 w-32 rounded mr-2" />
          <Button handler={handlerButtonRight} text={textButtonRight} classes="bg-mainColor text-white py-2 w-32 rounded ml-2" />
        </div>
      </div>
    </ModalTemplate>
  );
};

ModalDialog.defaultProps = {
  handlerButtonLeft: () => { },
  handlerButtonRight: () => { },
};

export default ModalDialog;
