import React from 'react';

import {
  Title,
  Label,
  Button,
  ComboBox,
  Input,
} from '@atoms/common';

interface Props {
  totalPrice?: string;
  showOrderPhoto?: boolean;
  showComplaintBtn?: boolean;
  showComplaintPhoto?: boolean;
  btnComplaintHandler?: () => void;
  btnOrderPhotoHandler?: () => void;
  btnPhotoComplaintHandler?: () => void;
}

const CardFooter = (props: Props) => {
  const {
    btnPhotoComplaintHandler,
    btnOrderPhotoHandler,
    btnComplaintHandler,
    showComplaintPhoto,
    showComplaintBtn,
    showOrderPhoto,
    totalPrice,
  } = props;

  return (
    <div className="w-full mt-2 px-4 py-2 bg-light4 border-t border-solid border-light3 text-sm flex justify-between rounded-b-lg">
      <Label text="Total Pesanan" classes="text-darker" />
      {
        showOrderPhoto && (
          <Button
            text="Foto Barang Diterima"
            classes="text-sm font-bold text-mainColor"
            handler={btnOrderPhotoHandler}
          />
        )
      }
      {
        showComplaintPhoto && (
          <Button
            text="Lihat Foto Bukti Komplain"
            classes="text-sm font-bold text-error4"
            handler={btnPhotoComplaintHandler}
          />
        )
      }
      {
        showComplaintBtn && (
          <Button
            handler={btnComplaintHandler}
            text="Pesanan Dikomplain ?"
            classes="text-sm font-bold text-error4"
          />
        )
      }
      <Label text={totalPrice} classes="font-bold" />
    </div>
  );
};

CardFooter.defaultProps = {
  btnPhotoComplaintHandler: () => { },
  btnOrderPhotoHandler: () => { },
  btnComplaintHandler: () => { },
  showComplaintPhoto: false,
  showComplaintBtn: false,
  showOrderPhoto: false,
  totalPrice: '',
};

export default CardFooter;
