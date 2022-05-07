import React from 'react';

import ModalTemplate from '@templates/Modal';
import Title from '@atoms/common/Title';

import { IconLoading } from '@assets/images';

const WindowLoader = () => (
  <ModalTemplate>
    <div className="py-5 px-3 bg-white shadow rounded-lg flex flex-wrap justify-center">
      <img src={IconLoading} alt="Loading Process" className="w-28 mb-2" />
      <Title text="proccessing ..." classes="w-full text-center text-lg text-mainColor" />
    </div>
  </ModalTemplate>
);

export default WindowLoader;
