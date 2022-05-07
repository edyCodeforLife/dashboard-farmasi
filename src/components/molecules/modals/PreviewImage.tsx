import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Icon from '@mui/material/Icon';

import ServicePreviewImage from '@helpers/preview-image';
import { State } from '@services/redux/reducer';
import ModalTemplate from '@templates/Modal';
import Button from '@atoms/common/Button';

interface Styles {
  width: string;
  maxWidth: string;
}

const PreviewImage = () => {
  const componentRef: any = useRef(null);
  const { ResetPreviewImage } = ServicePreviewImage();
  const previewImage: any = useSelector((state: State) => state.previewImage);

  const [image, setImage] = useState<string>('');
  const [isZoom, setIsZoom] = useState<boolean>(false);
  const [styles, setStyles] = useState<Styles>({ width: 'auto', maxWidth: '626px' });

  const handler = () => {
    setIsZoom(!isZoom);
    setStyles({
      ...styles,
      maxWidth: !isZoom ? 'unset' : '626px',
      width: !isZoom ? (
        `${parseInt(componentRef?.current?.offsetWidth, 10) + 300}px`
      ) : 'auto',
    });
  };

  useEffect(() => {
    setIsZoom(false);
    setStyles({ ...styles, maxWidth: '626px', width: 'auto' });
    setImage(previewImage?.image !== '' ? previewImage?.image : '');
  }, [previewImage?.image]);

  useEffect(() => () => {
    setImage('');
    setIsZoom(false);
    setStyles({ ...styles, maxWidth: '626px', width: 'auto' });
    ResetPreviewImage();
  }, []);

  return (
    <ModalTemplate classes={`overflow-auto ${image === '' && 'hidden'}`}>
      <Button
        handler={() => ResetPreviewImage()}
        icon={<i className="text-white"><Icon>close_icon</Icon></i>}
        classesImage="w-5"
        classes="z-10 fixed right-0 top-0 mt-5 mr-5"
      />
      <div className="w-full h-full relative flex justify-center">
        <button ref={componentRef} onClick={() => handler()} type="button">
          <img
            src={image}
            alt={image}
            style={styles}
            className={`my-auto ${isZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          />
        </button>
      </div>
    </ModalTemplate>
  );
};

export default PreviewImage;
