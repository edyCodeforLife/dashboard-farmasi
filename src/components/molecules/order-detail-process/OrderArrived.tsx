import React from 'react';
import Button from '@atoms/common/Button';
import Upload from '../modals/Upload';

interface Complaint {
  id: number;
  note: string;
  images: Array<{
    url: string;
    id: string;
  }>;
}

interface Props {
  complaint: Complaint;
  complained: boolean;
  openComplained: () => void;
  handlerOrderComplained: () => void;
  cancelComplained: (status: boolean) => void;
  handlerComplaintFile: (event: any) => void;
  handlerComplaintNote: (event: string) => void;
}

const OrderArrived = (props: Props) => {
  const {
    complaint,
    complained,
    cancelComplained,
    openComplained,
    handlerComplaintFile,
    handlerComplaintNote,
    handlerOrderComplained,
  } = props;

  return (
    <div className="mt-4 py-4 border border-solid border-gray-300 shadow rounded-lg px-4 flex justify-end items-center">
      {
        complained && (
          <Upload
            title="Upload Bukti Komplain"
            description="Jenis file dapat berupa .jpg dan .png"
            inputPlaceholder="Keluhannya"
            inputValue={complaint.note}
            images={complaint.images}
            fileHandler={(event) => handlerComplaintFile(event)}
            inputHandler={(event) => handlerComplaintNote(event.target.value)}
            cancelHandler={() => cancelComplained(!complained)}
            uploadHandler={() => handlerOrderComplained()}
            withInput
          />
        )
      }
      <div className="inline-block">
        <Button
          text="Pesanan Dikomplain ?"
          handler={() => openComplained()}
          classes="w-full py-2 px-5 rounded-lg text-sm text-white bg-mainColor font-bold"
        />
      </div>
    </div>
  );
};

export default OrderArrived;
