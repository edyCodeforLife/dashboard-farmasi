import React from 'react';
import Notification from '@molecules/modals/Notification';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
  children: any,
}

const Template = (props: Props) => {
  const { children } = props;

  const headerLayout = {
    // backgroundImage: 'linear-gradient(#FFFFFF, #FFFFFF, #FFFFFF, #D6EDF6)',
    backgroundColor: '#f2f2f5',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-y-hidden" style={headerLayout}>
      <Navbar />
      <div className="flex-1 flex flex-wrap h-full">
        <Sidebar />
        <div className="content-application h-full relative" style={{ width: '85%' }}>
          {/* <Notification
            title="Pesanan Baru"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
            time="Hari ini, 07:08"
            openHandler={() => window.alert('you click this notification')}
            closeHandler={() => window.alert('you close this notification')}
          /> */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
