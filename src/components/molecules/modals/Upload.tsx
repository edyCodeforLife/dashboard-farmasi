import React from 'react';

import ModalTemplate from '@templates/Modal';
import Button from '@atoms/common/Button';
import Title from '@atoms/common/Title';
import Input from '@atoms/common/Input';

import { IconUpload } from '@assets/images';

interface Complaint {
  url: string;
  id: string;
}

interface Props {
  title?: string;
  images?: Array<Complaint>;
  description?: string;
  withInput?: boolean;
  cancelHandler?: () => void;
  inputPlaceholder?: string;
  inputValue?: string;
  inputHandler?: (event: any) => void;
  fileHandler?: (event: any) => void;
  uploadHandler?: () => void;
  disableSubmit?: boolean;
  disableUpload?: boolean;
  disableInput?: boolean;
  isHiddenUploadFile?: boolean;
}

const ModalUpload = (props: Props) => {
  const {
    title,
    images,
    withInput,
    description,
    inputValue,
    fileHandler,
    inputHandler,
    cancelHandler,
    uploadHandler,
    disableSubmit,
    disableUpload,
    disableInput,
    inputPlaceholder,
    isHiddenUploadFile,
  } = props;

  return (
    <ModalTemplate classes="items-start overflow-y-auto">
      <div className="w-1/3 py-10 px-6 my-20 bg-white rounded-lg">
        <Title text={title} classes="text-center text-xl mb-4" />
        <div className="w-full flex flex-wrap justify-center">
          {
            images?.length || 0 > 1 ? (
              images?.map((img, index) => (
                <div className="w-32 h-32 relative my-2 mx-2 hover:border border-solid border-gray-200 rounded overflow-hidden">
                  <img className="w-full h-full object-cover" src={img.url} alt={`uploaded ${index.toString()}`} />
                </div>
              ))
            ) : ''
          }
          {
            !disableUpload && !isHiddenUploadFile ? (
              <div className="w-32 h-32 relative my-2 mx-2">
                <input type="file" onChange={fileHandler} className="w-full h-full opacity-0 absolute z-20 inset-0" />
                <div className="w-full h-full absolute inset-0 z-10 bg-subtle rounded-lg flex justify-center items-center">
                  <img src={IconUpload} alt="Logo File Upload" />
                </div>
              </div>
            ) : ''
          }
        </div>
        <div className="px-16 mt-3">
          <Title text={description} classes="text-center text-lg text-dark3 mb-2" />
          {
            withInput && (
              <Input
                type="text"
                handler={inputHandler}
                value={inputValue}
                disabled={disableInput}
                classes="w-full py-2 border-b-2 border-black border-solid focus:outline-none"
                placeholder={inputPlaceholder}
              />
            )
          }
        </div>
        <div className="mt-8 flex justify-center">
          <Button text="Cancel" handler={cancelHandler} classes="bg-dark4 text-white py-2 w-32 rounded mr-2" />
          <Button
            text="Upload"
            handler={uploadHandler}
            disabled={disableSubmit}
            classes={`${disableSubmit ? 'cursor-default bg-dark4' : 'bg-mainColor'} text-white py-2 w-32 rounded ml-2`}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

ModalUpload.defaultProps = {
  title: '',
  description: '',
  withInput: false,
  inputValue: '',
  images: [],
  disableSubmit: false,
  disableUpload: false,
  disableInput: false,
  inputPlaceholder: '',
  fileHandler: () => { },
  inputHandler: () => { },
  cancelHandler: () => { },
  uploadHandler: () => { },
  isHiddenUploadFile: false,
};

export default ModalUpload;
