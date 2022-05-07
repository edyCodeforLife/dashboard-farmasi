import React, { useState } from 'react';
import { ComboBox } from '../common';

interface Complaint {
  label: string;
  value: string;
}

interface Props {
  complaint?: Complaint;
  showComplaint?: boolean;
  complaintHandler?: (evt: any) => void;
}

const ComplaintCombobox = (props: Props) => {
  const {
    complaint,
    showComplaint,
    complaintHandler,
  } = props;

  const [options] = useState([
    { value: 'PROCESS_COMPLAINT', label: 'Diterima' },
    { value: 'REJECT_COMPLAINT', label: 'Ditolak' },
    { value: 'REFUND', label: 'Direfund' },
  ]);

  return (
    <div>
      {
        showComplaint && (
          <ComboBox
            selectHandler={(event) => {
              if (complaintHandler) {
                complaintHandler(event);
              }
            }}
            placeholder="Proses Komplain"
            option={complaint}
            options={options}
          />
        )
      }
    </div>
  );
};

ComplaintCombobox.defaultProps = {
  complaint: null,
  showComplaint: false,
  complaintHandler: () => { },
};

export default ComplaintCombobox;
