import React from 'react';
import moment from 'moment-timezone';
import { DayFormat } from '@helpers/date';
import ModalTemplate from '@templates/Modal';
import PanelTitle from '@molecules/common/PanelTitle';
import Label from '@atoms/common/Label';
import Title from '@atoms/common/Title';
import HistoryType from '@constants/historyType.json';

interface Props {
  history: any;
  handler: () => void;
}

const setRole = (params: Array<any>) => {
  switch (params[0]) {
    case 'ALTEA_PHARMACY':
      return (
        <Label text="By Admin AlteaCare" classes="text-sm text-darker" />
      );
    case 'PATIENT':
      return (
        <Label text="By User" classes="text-sm" />
      );
    default:
      return (
        <Label text="By Admin AlteaCare" classes="text-sm text-darker" />
      );
  }
};
const ModalHistory = (props: Props) => {
  const { history, handler } = props;

  return (
    <ModalTemplate classes="items-start overflow-y-auto py-5">
      <div className="w-3/4 my-auto overflow-x-scroll scroll-green">
        <PanelTitle text="Riwayat Pesanan" handler={handler} />
        <div className="bg-white rounded-b-lg overflow-hidden">
          <div className="table w-full">
            <div className="table-header-group">
              <div className="table-cell py-3 pl-6">
                <Label text="Email" classes="font-bold text-sm" />
              </div>
              <div className="table-cell py-3 px-3">
                <Label text="Status" classes="font-bold text-sm" />
              </div>
              <div className="table-cell py-3 px-3">
                <Label text="Tanggal" classes="font-bold text-sm" />
              </div>
              <div className="table-cell py-3 pr-6">
                <Label text="Jam" classes="font-bold text-sm" />
              </div>
              <div className="table-cell py-3 pr-6">
                <Label text="Role" classes="font-bold text-sm" />
              </div>
            </div>
            {
              history && history.length > 0 ? (
                history.map((row: any, idx: number) => (
                  <div key={row?.id} className={`table-row-group ${row.action.role.includes('PATIENT') ? 'bg-white' : 'bg-subtle'}`}>
                    <div className="table-cell py-3 pl-6">
                      <Label text={row?.action?.email} classes="text-sm" />
                    </div>
                    <div className="table-cell py-3 px-3">
                      {HistoryType[row?.status?.previous] ? (
                        <div>
                          <Label text={`${HistoryType[row?.status?.previous]}`} classes="text-sm mr-2" />
                          &rarr;
                          <Label text={` ${HistoryType[row?.status?.previous]}`} classes="text-sm mr-2" />
                        </div>
                      ) : (
                        <Label text={`${HistoryType[row?.status?.current]}`} classes="text-sm ml-2" />
                      )}
                    </div>
                    <div className="table-cell py-3 px-3">
                      <Label text={`${DayFormat(moment(row?.date).day())}, ${moment(row?.date).format('DD-MM-YYYY')}`} classes="text-sm" />
                    </div>
                    <div className="table-cell py-3 pr-6">
                      <Label text={moment(row?.time).format('HH:mm:ss')} classes="text-sm" />
                    </div>
                    <div className="table-cell py-3 pr-6">
                      {setRole(row?.action?.role)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="table-header-group table-caption relative h-10">
                  <Title text="Tidak memiliki data history" classes="w-full bg-light3 absolute bottom-0 text-sm text-center py-3 mx-auto" />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ModalHistory;
