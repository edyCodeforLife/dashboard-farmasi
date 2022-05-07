import React from 'react';
import Logo from '@assets/images/logo.png';
import { BgLogin } from '@assets/images';

interface Props {
  children: any;
}

const Authentication = (props: Props) => {
  const { children } = props;

  return (
    <div
      className="fixed w-full h-full flex flex-wrap overflow-auto"
      style={{
        backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF, #FFFFFF, #D6EDF6)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="w-full absolute z-10 flex flex-wrap justify-center">
          <div className="w-full text-center">
            <img src={Logo} alt="Logo" className="mb-5 mx-auto" />
          </div>
          <div
            style={{ minHeight: '475px' }}
            className="flex items-center w-1/3 xl:w-1/3 lg:w-1/2 sm:w-3/4 xl:px-14 px-10 mx-auto
            bg-white rounded-lg shadow-lg border border-solid border-grey-200 relative"
          >
            {children}
          </div>
        </div>
        <img src={BgLogin} alt="Background Login" className="absolute bottom-0 -inset-x-0 mx-auto" />
      </div>
    </div>
  );
};

export default Authentication;
